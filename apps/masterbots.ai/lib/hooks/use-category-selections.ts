import { useLocalStorage } from './use-local-storage'

const CATEGORY_SELECTIONS_KEY = 'category-selections'

export const useCategorySelections = () => {
	const [selectedCategories, setSelectedCategories] = useLocalStorage<number[]>(
		CATEGORY_SELECTIONS_KEY,
		[],
	)

	const addCategory = (categoryId: number) => {
		setSelectedCategories((prev) =>
			prev.includes(categoryId) ? prev : [...prev, categoryId],
		)
	}

	const removeCategory = (categoryId: number) => {
		setSelectedCategories((prev) => prev.filter((id) => id !== categoryId))
	}

	const toggleCategory = (categoryId: number) => {
		setSelectedCategories((prev) =>
			prev.includes(categoryId)
				? prev.filter((id) => id !== categoryId)
				: [...prev, categoryId],
		)
	}

	const clearAll = () => {
		setSelectedCategories([])
	}

	const setCategories = (
		categoryIds: number[] | ((prev: number[]) => number[]),
	) => {
		setSelectedCategories(categoryIds)
	}

	return {
		selectedCategories,
		addCategory,
		removeCategory,
		toggleCategory,
		clearAll,
		setCategories,
	}
}
