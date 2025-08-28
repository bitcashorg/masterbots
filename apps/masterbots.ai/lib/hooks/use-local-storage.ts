'use client'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') {
			return initialValue
		}
		try {
			const item = window.localStorage.getItem(key)
			return item ? (JSON.parse(item) as T) : initialValue
		} catch (error) {
			console.error(`Error reading localStorage key “${key}”:`, error)
			return initialValue
		}
	})

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(storedValue))
		} catch (error) {
			console.error(`Error setting localStorage key “${key}”:`, error)
		}
	}, [key, storedValue])

	return [storedValue, setStoredValue]
}
