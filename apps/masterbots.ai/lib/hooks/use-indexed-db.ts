import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
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
	const db = dbRef.current

	const onMountSuccess = (event: Event) => {
		if (appConfig.features.devMode) {
			console.info('IndexedDB opened successfully')
		}
		dbRef.current = (event.target as IDBOpenDBRequest).result
		setMounted(true)
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

	const getAllItems = (): Promise<IndexedDBItem[]> => {
		return new Promise((resolve, reject) => {
			if (!db) return reject('Database not initialized')
			const transaction = db.transaction(storeName, 'readonly')

			const store = transaction.objectStore(storeName)
			const request = store.getAll()

			request.onsuccess = () => {
				resolve(request.result)
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
