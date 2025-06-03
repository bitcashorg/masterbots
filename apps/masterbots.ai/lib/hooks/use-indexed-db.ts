import {
	getUserThreadsMetadata,
	updateThreadMetadata,
	uploadAttachmentToBucket,
} from '@/app/actions'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useUploadImagesCloudinary } from '@/lib/hooks/use-cloudinary-upload'
import { logErrorToSentry } from '@/lib/sentry'
import { Attachment } from 'ai'
import { isEqual, uniqBy } from 'lodash'
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
	const { uploadFilesCloudinary } = useUploadImagesCloudinary()
	const db = dbRef.current

	const onMountSuccess = (event: Event) => {
		if (appConfig.features.devMode) {
			console.info('IndexedDB opened successfully')
		}
		dbRef.current = (event.target as IDBOpenDBRequest).result
		setMounted(true)

		// check if we have records in the store to update user threads metadata
		getAllItems()
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
		if (!db) return
		const transaction = db.transaction(storeName, 'readwrite')
		const store = transaction.objectStore(storeName)
		store.add(item)
	}

	const getItem = (id: IDBValidKey): Promise<IndexedDBItem> => {
		return new Promise((resolve, reject) => {
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
			if (!db) return reject('Database not initialized')
			const transaction = db.transaction(storeName, 'readonly')

			const store = transaction.objectStore(storeName)
			const request = store.getAll()

			request.onsuccess = async () => {
				const attachments = request.result as IndexedDBItem[]

				if (appConfig.features.devMode) {
					console.info('IndexedDB records:', attachments)
				}

				if (isEqual(remoteThreadMetadata, attachments)) {
					if (appConfig.features.devMode) {
						console.info(
							'No changes in IndexedDB records, skipping remote thread metadata update',
							remoteThreadMetadata,
						)
					}
					return resolve(attachments)
				}

				let newAttachments: IndexedDBItem[] = attachments

				for (const attachment of attachments as FileAttachment[]) {
					const thread = await getUserThreadsMetadata(attachment.messageIds)

					if (!thread) {
						if (appConfig.features.devMode) {
							console.warn(
								`No thread found for messageId: ${attachment.messageIds}, skipping attachment update`,
								attachment,
							)
						}
						continue
					}

					const doesThreadMetadataExist = (
						thread?.metadata as ThreadMetadata
					)?.attachments?.some((att) => att.id === attachment.id)

					// If the attachment already exists in the thread metadata, skip updating it
					if (doesThreadMetadataExist) {
						if (appConfig.features.devMode) {
							console.info(
								'Attachment already exists in thread metadata, skipping update',
								attachment,
							)
						}
						continue
					}

					// Ensuring remote would have the latest attachments related messageIds
					newAttachments = (
						(thread.metadata as ThreadMetadata)?.attachments || []
					).map((att) => {
						if (att.id === attachment.id) {
							att.messageIds = attachment.messageIds
						}
						return att
					})

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

					newAttachments.push(attachment)
					await updateThreadMetadata(thread.threadId, {
						attachments: uniqBy(newAttachments, 'id'),
					})
				}

				setRemoteThreadMetadata(newAttachments)
				resolve(newAttachments)
			}

			request.onerror = () => {
				reject(request.error)
			}
		})
	}

	const updateItem = (id: string, updatedItem: IndexedDBItem) => {
		if (!db) return
		const transaction = db.transaction(storeName, 'readwrite')
		const store = transaction.objectStore(storeName)
		const itemToUpdate = { ...updatedItem, id }
		store.put(itemToUpdate)
	}

	const deleteItem = (id: number) => {
		if (!db) return
		const transaction = db.transaction(storeName, 'readwrite')
		const store = transaction.objectStore(storeName)
		store.delete(id)
	}

	return { mounted, addItem, getItem, getAllItems, updateItem, deleteItem }
}

export type IndexedDBItem = FileAttachment | Record<string, unknown>
export type ThreadMetadata = Record<string, IndexedDBItem[]>
