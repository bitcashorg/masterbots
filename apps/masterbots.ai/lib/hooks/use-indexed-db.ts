import {
	getAllUserThreadMetadata,
	getUserThreadsMetadata,
	updateThreadMetadata,
	uploadAttachmentToBucket,
} from '@/app/actions'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useUploadImagesCloudinary } from '@/lib/hooks/use-cloudinary-upload'
import { logErrorToSentry } from '@/lib/sentry'
import { prepareThreadAttachmentCheck } from '@/lib/threads'
import { Attachment } from 'ai'
import { isEqual, merge, pick, uniqBy } from 'lodash'
import { message } from 'mb-drizzle'
import { appConfig } from 'mb-env'
import { Thread } from 'mb-genql'
import { fetchJson } from 'mb-lib'
import { useEffect, useRef, useState } from 'react'
import { thread } from '../../../../packages/mb-drizzle/src/drizzle/schema'

const DEFAULT_DB_NAME = 'masterbots_attachments_indexed_db'
const DEFAULT_STORE_NAME = 'masterbots_attachments_store'

export function useIndexedDB({
	dbName = DEFAULT_DB_NAME,
	storeName = DEFAULT_STORE_NAME,
}) {
	const dbRef = useRef<IDBDatabase | null>(null)
	const [mounted, setMounted] = useState(false)
	const [remoteThreadMetadata, setRemoteThreadMetadata] = useState<
		IndexedDBItem[]
	>([])

	const onMountSuccess = (event: Event) => {
		if (appConfig.features.devMode) {
			console.info('IndexedDB opened successfully')
		}
		dbRef.current = (event.target as IDBOpenDBRequest).result
		setMounted(true)

		// check if we have records in the store to update user threads metadata
		// getAllItems()
	}

	const onUpgradeNeeded = (event: IDBVersionChangeEvent) => {
		const db = (event.target as IDBOpenDBRequest).result
		if (!db.objectStoreNames.contains(storeName)) {
			db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
		}
	}

	const onError = (event: Event) => {
		console.error('IndexedDB error:', (event.target as IDBOpenDBRequest).error)
	}

	const resetState = () => {
		const db = dbRef.current
		setMounted(false)
		if (db) {
			db.close()
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const openRequest = indexedDB.open(dbName, 1)

		openRequest.onupgradeneeded = onUpgradeNeeded

		openRequest.onsuccess = onMountSuccess

		openRequest.onerror = onError

		return () => {
			resetState()
		}
	}, [dbName, storeName])

	const addItem = (item: IndexedDBItem) => {
		const db = dbRef.current
		if (!db) return
		const transaction = db.transaction(storeName, 'readwrite')
		const store = transaction.objectStore(storeName)
		store.add(item)
	}

	const getItem = (id: IDBValidKey): Promise<IndexedDBItem> => {
		return new Promise((resolve, reject) => {
			const db = dbRef.current
			if (!db) return reject('Database not initialized')
			const transaction = db.transaction(storeName, 'readonly')
			const store = transaction.objectStore(storeName)
			const request = store.get(id)

			request.onsuccess = () => {
				resolve(request.result)
			}

			request.onerror = () => {
				reject(request.error)
			}
		})
	}

	const getAllItems = async (): Promise<IndexedDBItem[]> => {
		return await new Promise((resolve, reject) => {
			const db = dbRef.current
			if (!db) return reject('Database not initialized')
			const transaction = db.transaction(storeName, 'readonly')

			const store = transaction.objectStore(storeName)
			const request = store.getAll()

			request.onsuccess = async () => {
				const attachments = request.result as IndexedDBItem[]

				if (appConfig.features.devMode) {
					console.info('IndexedDB records:', attachments)
				}

				let newAttachments: FileAttachment[] = attachments as FileAttachment[]
				const currentUserMetadata = await getAllUserThreadMetadata()
				const newAttachmentCheck = prepareThreadAttachmentCheck(newAttachments)
				const currentAttachmentCheck =
					prepareThreadAttachmentCheck(currentUserMetadata)
				// console.log('currentAttachmentCheck', currentAttachmentCheck)
				// console.log('newAttachmentCheck', newAttachmentCheck)
				// console.log('isEqual(newAttachmentCheck, currentAttachmentCheck)', isEqual(newAttachmentCheck, currentAttachmentCheck))
				if (isEqual(newAttachmentCheck, currentAttachmentCheck)) {
					if (appConfig.features.devMode) {
						console.warn('No update required. Local is sync with remote')
					}
					setRemoteThreadMetadata(newAttachments)
					return resolve(newAttachments)
				}

				for (const attachment of newAttachments as FileAttachment[]) {
					const thread = await getUserThreadsMetadata(attachment.messageIds)

					if (!thread) {
						if (appConfig.features.devMode) {
							console.warn(
								`No thread found for messageId: ${attachment.messageIds}, skipping attachment update`,
								attachment.id,
								attachment.name,
							)
						}
						continue
					}

					const remoteMetadataAttachments = (thread?.metadata as ThreadMetadata)
						?.attachments
					const doesThreadMetadataExist = remoteMetadataAttachments?.some(
						(att) =>
							att.id === attachment.id &&
							att.messageIds.length === attachment.messageIds.length,
					)

					// If the attachment already exists in the thread metadata, skip updating it
					if (doesThreadMetadataExist) {
						if (appConfig.features.devMode) {
							console.warn(
								'Attachment already exists in thread metadata, skipping update',
								attachment.id,
								attachment.name,
							)
						}
						continue
					}

					// Ensuring remote would have the latest attachments related messageIds
					newAttachments = uniqBy(
						[
							...((thread.metadata as ThreadMetadata | null)?.attachments ||
								[]),
							...newAttachments,
						],
						'id',
					).map((att) => {
						if (att.id === attachment.id) {
							return {
								...att,
								messageIds: attachment.messageIds,
							}
						}
						return att
					})

					try {
						const { data: uploadAttachmentData } = await fetchJson<{
							data: FileAttachment | null
							error: string | null
						}>('/api/attachments/upload', {
							method: 'POST',
							body: JSON.stringify({
								attachment,
								thread,
							}),
							headers: {
								'Content-Type': 'application/json',
							},
						})

						if (uploadAttachmentData) {
							attachment.url = uploadAttachmentData.url
							attachment.size = uploadAttachmentData.size
							attachment.contentType = uploadAttachmentData.contentType
							attachment.name = uploadAttachmentData.name
						}
					} catch (error) {
						console.error(
							'Failed to upload the attachment to the bucket: ',
							error,
						)
					}

					newAttachments.push(attachment)
					newAttachments = uniqBy(newAttachments, 'id')
				}

				const messagesIds = newAttachments.flatMap(
					(att) => (att as FileAttachment).messageIds,
				)
				const metadataUpdateResults = await updateThreadMetadata(messagesIds, {
					attachments: newAttachments,
				})
				console.log('metadataUpdateResults', metadataUpdateResults)
				setRemoteThreadMetadata(newAttachments)

				// If new attachments are not equal from remote/local
				if (!isEqual(attachments, newAttachments)) {
					console.log(
						'Detected attachments not equal with new attachments hence, either the new attachments or local has to be updates',
						{
							newAttachments: {
								length: newAttachments.length,
								msgIds: newAttachments.map(
									(att) => (att.messageIds as string[]).length,
								),
							},
							attachments: {
								length: attachments.length,
								msgIds: attachments.map(
									(att) => (att.messageIds as string[]).length,
								),
							},
						},
					)
				}

				return resolve(newAttachments)
			}

			request.onerror = () => {
				reject(request.error)
			}
		})
	}

	const updateItem = (id: string, updatedItem: IndexedDBItem) => {
		const db = dbRef.current
		if (!db) return
		const transaction = db.transaction(storeName, 'readwrite')
		const store = transaction.objectStore(storeName)
		const itemToUpdate = { ...updatedItem, id }
		store.put(itemToUpdate)
	}

	const deleteItem = (id: number) => {
		const db = dbRef.current
		if (!db) return
		const transaction = db.transaction(storeName, 'readwrite')
		const store = transaction.objectStore(storeName)
		store.delete(id)
	}

	return { mounted, addItem, getItem, getAllItems, updateItem, deleteItem }
}

export type IndexedDBItem = FileAttachment | Record<string, unknown>
export type ThreadMetadata = Record<string, FileAttachment[]>
