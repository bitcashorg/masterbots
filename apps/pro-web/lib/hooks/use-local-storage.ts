import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

export const useLocalStorage = <T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] => {
	//? Initialize state with a function to avoid unnecessary re-renders
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window !== 'undefined') {
			const item = window.localStorage.getItem(key)
			if (item) {
				try {
					const parsed = JSON.parse(item)
					console.log(
						`[useLocalStorage] Loaded from localStorage for key "${key}":`,
						parsed,
					)
					return parsed
				} catch (error) {
					console.warn('Failed to parse localStorage item:', error)
				}
			}
		}
		console.log(
			`[useLocalStorage] Using initial value for key "${key}":`,
			initialValue,
		)
		return initialValue
	})

	const [isLoaded, setIsLoaded] = useState(() => typeof window !== 'undefined')

	useEffect(() => {
		//? Only run this effect if we're on the client and haven't loaded yet
		if (typeof window !== 'undefined' && !isLoaded) {
			const item = window.localStorage.getItem(key)
			if (item) {
				try {
					const parsed = JSON.parse(item)
					console.log(
						`[useLocalStorage] Effect loaded from localStorage for key "${key}":`,
						parsed,
					)
					setStoredValue(parsed)
				} catch (error) {
					console.warn('Failed to parse localStorage item:', error)
				}
			}
			setIsLoaded(true)
		}
	}, [key, isLoaded])

	const setValue: Dispatch<SetStateAction<T>> = (
		value: T | ((prevValue: T) => T),
	) => {
		//? Save state
		const newValue =
			typeof value === 'function'
				? (value as (prevValue: T) => T)(storedValue)
				: value
		console.log(`[useLocalStorage] Setting value for key "${key}":`, newValue)
		setStoredValue(newValue)
		//? Save to localStorage
		if (typeof window !== 'undefined') {
			try {
				window.localStorage.setItem(key, JSON.stringify(newValue))
				console.log(
					`[useLocalStorage] Saved to localStorage for key "${key}":`,
					newValue,
				)
			} catch (error) {
				console.warn('Failed to save to localStorage:', error)
			}
		}
	}
	return [storedValue, setValue, isLoaded]
}
