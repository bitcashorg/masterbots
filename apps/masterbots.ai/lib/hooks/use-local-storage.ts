import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

export const useLocalStorage = <T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
	const [storedValue, setStoredValue] = useState(initialValue)

	useEffect(() => {
		// Retrieve from localStorage
		if (typeof window !== 'undefined') {
			const item = window.localStorage.getItem(key)
			if (item) {
				try {
					setStoredValue(JSON.parse(item))
				} catch (error) {
					console.warn('Failed to parse localStorage item:', error)
				}
			}
		}
	}, [key])

	const setValue: Dispatch<SetStateAction<T>> = (
		value: T | ((prevValue: T) => T),
	) => {
		// Save state
		const newValue =
			typeof value === 'function'
				? (value as (prevValue: T) => T)(storedValue)
				: value
		setStoredValue(newValue)
		// Save to localStorage
		if (typeof window !== 'undefined') {
			try {
				window.localStorage.setItem(key, JSON.stringify(newValue))
			} catch (error) {
				console.warn('Failed to save to localStorage:', error)
			}
		}
	}
	return [storedValue, setValue]
}
