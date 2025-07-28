import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

export const useLocalStorage = <T>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
	const [storedValue, setStoredValue] = useState(initialValue)

	useEffect(() => {
		// Retrieve from localStorage
		const item = window.localStorage.getItem(key)
		if (item) {
			setStoredValue(JSON.parse(item))
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
		window.localStorage.setItem(key, JSON.stringify(newValue))
	}
	return [storedValue, setValue]
}
