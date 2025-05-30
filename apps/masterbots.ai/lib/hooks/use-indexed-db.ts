import { getUserThreadsMetadata, updateThreadMetadata } from '@/app/actions'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { useUploadImagesCloudinary } from '@/lib/hooks/use-cloudinary-upload'
import { logErrorToSentry } from '@/lib/sentry'
import { Attachment } from 'ai'
import { isEqual, uniqBy } from 'lodash'
import { message } from 'mb-drizzle'
import { appConfig } from 'mb-env'
import { useEffect, useRef, useState } from 'react'

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
				resolve(attachments)

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
					return
				}

				for (const attachment of attachments as FileAttachment[]) {
					for (const messageId of attachment.messageIds as string[]) {
						const thread = await getUserThreadsMetadata(messageId)

						if (!thread) {
							if (appConfig.features.devMode) {
								console.warn(
									`No thread found for messageId: ${messageId}, skipping attachment update`,
									attachment,
								)
							}
							continue
						}

						const doesThreadMetadataExist = (
							thread?.metadata as ThreadMetadata
						)?.attachments?.some((att) => att.id === attachment.id)
						if (doesThreadMetadataExist) {
							if (appConfig.features.devMode) {
								console.info(
									'Attachment already exists in thread metadata, skipping update',
									attachment,
								)
							}
							continue
						}

						const newAttachments =
							(thread.metadata as ThreadMetadata)?.attachments || []
						const base64Hash = (attachment.content as string).split(',')[1]
						const attachmentContentBlob =
							typeof attachment.content === 'string'
								? atob(base64Hash)
								: new Uint8Array(attachment.content as ArrayBuffer).reduce(
										(data, byte) => data + String.fromCharCode(byte),
										'',
									)
						const attachmentConfig = {
							type: attachment.contentType,
						}
						const attachmentContentArray = new Uint8Array(
							attachmentContentBlob.length,
						)

						// Convert the string content to a Uint8Array
						for (let i = 0; i < attachmentContentBlob.length; i++) {
							attachmentContentArray[i] = attachmentContentBlob.charCodeAt(i)
						}
						const attachmentBlob = new Blob(
							[attachmentContentArray],
							attachmentConfig,
						)
						const attachmentFile = new File(
							[attachmentBlob],
							attachment.name,
							attachmentConfig,
						)
						const uploadResults = await uploadFilesCloudinary(attachmentFile, {
							transformation: 'c_scale,w_1280,h_1280',
							uploadPreset: 'ml_default',
							folder: `masterbots/${thread.slug}`,
						})

						if (!uploadResults.success || !uploadResults.data) {
							console.error(
								'Failed to upload file to Cloudinary',
								attachment,
								uploadResults.error,
							)
							logErrorToSentry(
								(uploadResults.error as Error)?.message ||
									'Failed to upload file to Cloudinary',
								{
									error: uploadResults.error,
									message: 'Failed to complete chat.',
									level: 'error',
									extra: {
										attachmentName: attachment.name,
										attachmentContentType: attachment.contentType,
										attachmentMessageIds: attachment.messageIds,
										threadSlug: thread.slug,
									},
								},
							)
						} else {
							attachment.url = uploadResults.data.secure_url
						}

						newAttachments.push(attachment)
						await updateThreadMetadata(thread.threadId, {
							attachments: uniqBy(newAttachments, 'id'),
						})
						setRemoteThreadMetadata(newAttachments)
					}
				}
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
