import { useLocalStorage } from './use-local-storage'

const CATEGORY_SELECTIONS_KEY = 'category-selections'

export const useCategorySelections = () => {
	const [selectedCategories, setSelectedCategories, isLoaded] = useLocalStorage<
		number[]
	>(CATEGORY_SELECTIONS_KEY, [])

	const addCategory = (categoryId: number) => {
		if (!isLoaded) {
			console.log(
				'[useCategorySelections] Skipping addCategory - not loaded yet',
			)
			return
		}
		console.log('[useCategorySelections] Adding category:', categoryId)
		setSelectedCategories((prev) =>
			prev.includes(categoryId) ? prev : [...prev, categoryId],
		)
	}

	const removeCategory = (categoryId: number) => {
		if (!isLoaded) {
			console.log(
				'[useCategorySelections] Skipping removeCategory - not loaded yet',
			)
			return
		}
		console.log('[useCategorySelections] Removing category:', categoryId)
		setSelectedCategories((prev) => prev.filter((id) => id !== categoryId))
	}

	const toggleCategory = (categoryId: number) => {
		if (!isLoaded) {
			console.log(
				'[useCategorySelections] Skipping toggleCategory - not loaded yet',
			)
			return
		}
		console.log('[useCategorySelections] Toggling category:', categoryId)
		setSelectedCategories((prev) =>
			prev.includes(categoryId)
				? prev.filter((id) => id !== categoryId)
				: [...prev, categoryId],
		)
	}

	const clearAll = () => {
		if (!isLoaded) {
			console.log('[useCategorySelections] Skipping clearAll - not loaded yet')
			return
		}
		console.log('[useCategorySelections] Clearing all categories')
		setSelectedCategories([])
	}

	const setCategories = (
		categoryIds: number[] | ((prev: number[]) => number[]),
	) => {
		if (!isLoaded) {
			console.log(
				'[useCategorySelections] Skipping setCategories - not loaded yet',
			)
			return
		}
		console.log('[useCategorySelections] Setting categories:', categoryIds)
		setSelectedCategories(categoryIds)
	}

	return {
		selectedCategories,
		isLoaded,
		addCategory,
		removeCategory,
		toggleCategory,
		clearAll,
		setCategories,
	}
}
