import { type IndexedDBItem, useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useModel } from '@/lib/hooks/use-model'
import { useThread } from '@/lib/hooks/use-thread'
import { useSonner } from '@/lib/hooks/useSonner'
import type * as OpenAi from 'ai'
import { uniqBy } from 'lodash'
import { appConfig } from 'mb-env'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useRef } from 'react'
import { useAsync, useSetState } from 'react-use'
import slugify from 'slugify'

export type FileAttachment = {
	id: string
	name: string
	size: number
	contentType: string
	messageIds: string[]
	// The raw content of the attachment. It can either be a string or an ArrayBuffer.
	content: string | ArrayBuffer
	// The URL of the attachment. It can either be a URL to a hosted file or a Data URL.
	url: string
	expires: string
	isSelected?: boolean
}

export function getUserIndexedDBKeys(userId?: string) {
	return {
		dbName: `${userId || 'nosession'}_masterbots_attachments_indexed_db`,
		storeName: `${userId || 'nosession'}_masterbots_attachments_store`,
	}
}

export function useFileAttachments(
	formRef?: React.RefObject<HTMLFormElement | null>,
): [
	{
		isDragging: boolean
		attachments: FileAttachment[]
		userData: {
			userAttachments: IndexedDBItem[] | undefined
			loading: boolean
			error: Error | undefined
		}
	},
	{
		addAttachment: (file: DataTransferItem | File) => void
		addAttachmentObject: (attachment: FileAttachment) => void
		updateAttachment: (id: string, updatedData: Partial<FileAttachment>) => void
		handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
		removeAttachment: (id: string) => void
		clearAttachments: () => void
		attachFilesToMessage: (
			message: OpenAi.AssistantMessage,
		) => OpenAi.AssistantMessage
		toggleAttachmentSelection: (id: string) => void
		onDragOver: (event: React.DragEvent<HTMLFormElement>) => void
		onDragLeave: (event: React.DragEvent<HTMLFormElement>) => void
		onDrop: (event: React.DragEvent<HTMLFormElement>) => void
	},
] {
	const { data: session } = useSession()
	const { activeThread, isNewResponse, loadingState } = useThread()
	const dbKeys = getUserIndexedDBKeys(session?.user?.id)
	const { mounted, ...indexedDBActions } = useIndexedDB(dbKeys)
	const [state, setState] = useSetState<{
		isDragging: boolean
		attachments: FileAttachment[]
	}>({
		isDragging: false,
		attachments: [],
	})
	const currentRequestId = useRef<string | null>(null)
	const {
		value: userAttachments,
		loading,
		error,
	} = useAsync(async () => {
		if (
			!mounted ||
			!session?.user ||
			isNewResponse ||
			(loadingState && loadingState !== 'finished')
		) {
			return (activeThread?.metadata?.attachments || []) as IndexedDBItem[]
		}

		// Check if this request is still current
		if (!currentRequestId.current) {
			currentRequestId.current = nanoid(8)
		} else {
			if (appConfig.features.devMode) {
				console.info(
					`Request ${currentRequestId.current} was superseded, ignoring results`,
				)
			}
			return (activeThread?.metadata?.attachments || []) as IndexedDBItem[]
		}

		if (appConfig.features.devMode) {
			console.info(
				`Starting user attachments request: ${currentRequestId.current}`,
			)
		}

		const indexedDBAttachments = await indexedDBActions.getAllItems()

		if (appConfig.features.devMode) {
			console.info(
				`IndexedDB attachments retrieved successfully for request: ${currentRequestId.current}`,
				indexedDBAttachments,
			)
		}

		currentRequestId.current = null
		return indexedDBAttachments
	}, [session?.user, mounted, isNewResponse, activeThread])

	const { customSonner } = useSonner()
	const { selectedModel } = useModel()

	const addAttachmentObject = (attachment: FileAttachment) => {
		setState((prevState) => ({
			attachments: uniqBy([...prevState.attachments, attachment], 'id'),
		}))
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: We only required to update this fn every time we receive a new state of attachments
	const addAttachment = useCallback(
		(file: DataTransferItem | File) => {
			const reader = new FileReader()
			let processedFile: File | null = null

			processedFile = file instanceof DataTransferItem ? file.getAsFile() : file

			if (!processedFile) {
				console.error('File is not valid or could not be retrieved')
				return
			}

			if (
				appConfig.features.maxAttachments &&
				state.attachments.length >= appConfig.features.maxAttachments
			) {
				console.error(
					`Cannot add more than ${appConfig.features.maxAttachments} attachments.`,
				)
				customSonner({
					type: 'error',
					text: `Cannot add more than ${appConfig.features.maxAttachments} attachments.`,
				})
				return
			}

			if (
				appConfig.features.maxFileSize &&
				processedFile.size > appConfig.features.maxFileSize // processedFile is guaranteed non-null here
			) {
				console.error('File size exceeds the limit')
				customSonner({
					type: 'error',
					text: 'File size exceeds the limit of 10MB',
				})
				return
			}

			reader.onload = async (readerEvent) => {
				const event = readerEvent.target || reader

				// processedFile is captured from the outer scope. It's already confirmed to be a File
				// by the checks before reader.readAsDataURL(processedFile) was called.
				if (!event || !event.result) {
					console.error('File reading failed or no result found')
					return
				}

				// Creating an base64 string from the file content
				const attachmentUrl =
					typeof event.result === 'string'
						? event.result
						: Buffer.from(event.result as ArrayBuffer).toString('base64')
				const newAttachment: FileAttachment = {
					id: nanoid(16),
					name: processedFile.name || '', // Use processedFile
					size: processedFile.size || 0, // Use processedFile
					contentType: processedFile.type || '', // Use processedFile
					// * Raw content can be a string or an ArrayBuffer
					content: event.result,
					// * Compressed URL to the attachment
					url: attachmentUrl,
					isSelected: true,
					messageIds: [],
					expires: new Date().toISOString(),
				}

				return setState((prevState) => ({
					attachments: [...prevState.attachments, newAttachment],
				}))
			}

			reader.onerror = () => {
				console.error('FileReader error:', reader.error)
				customSonner({
					type: 'error',
					text: 'Error reading file.',
				})
			}

			if (appConfig.features.devMode) {
				console.info('Final processedFile --> ', processedFile)
			}
			reader.readAsDataURL(processedFile)
		},
		[state.attachments],
	)

	// biome-ignore lint/correctness/useExhaustiveDependencies: We only required to update this fn every time we receive a new state of attachments
	const updateAttachment = useCallback(
		(id: string, updatedData: Partial<FileAttachment>) => {
			setState((prev) => ({
				attachments: prev.attachments.map((attachment) =>
					attachment.id === id ? { ...attachment, ...updatedData } : attachment,
				),
			}))
		},
		[state.attachments],
	)

	const removeAttachment = (id: string) =>
		setState((prev) => ({
			attachments: prev.attachments.filter(
				(attachment) => attachment.id !== id,
			),
		}))

	const clearAttachments = () => setState({ attachments: [] })

	// biome-ignore lint/correctness/useExhaustiveDependencies: We only required to know when the attachments has changed
	const attachFilesToMessage = useCallback(
		(message: OpenAi.AssistantMessage) => {
			const updatedAttachments = state.attachments.map((attachment) => ({
				...attachment,
				messageIds: [...attachment.messageIds, message.id],
			}))

			setState({ attachments: updatedAttachments })
			return {
				...message,
				attachments: updatedAttachments,
			}
		},
		[state.attachments],
	)

	const handleValidFiles = (files: DataTransferItemList | FileList) => {
		let validAttachments: DataTransferItemList | FileList | null =
			files as DataTransferItemList
		if (files instanceof FileList) {
			const dataTransfer = new DataTransfer()

			for (const file of files) {
				dataTransfer.items.add(file)
			}

			validAttachments = dataTransfer.items
		}

		const validFiles = Array.from(validAttachments).filter((file) => {
			if (selectedModel.match(/(DeepSeekR1|GroqDeepSeek)/)) {
				return file.type.startsWith('text/')
			}
			return file.type.startsWith('image/') || file.type.startsWith('text/')
		})
		console.log('Files to process (the validFiles) --> ', validFiles)
		for (const file of validFiles) {
			addAttachment(file)
		}
	}

	const validateTextContent = ({
		fileString,
		wordsLength = 49,
		charactersLength = 320,
	}: {
		fileString: string
		wordsLength?: number
		charactersLength?: number
	}) => {
		// Remove empty new lines and roughly check if the string has more than 49 words
		// This is a very basic check, we might want to improve it
		const slugifyWords = slugify(fileString, {
			lower: true,
			trim: true,
			remove: /[^\w\s]/g,
		})
		const stringWordLength = slugifyWords.split('-').length

		return (
			stringWordLength >= wordsLength || slugifyWords.length >= charactersLength
		)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleFilePaste = useCallback(
		(event: ClipboardEvent) => {
			const { items } = event.clipboardData as DataTransfer
			const isImageValidItem = Array.from(items).some(
				(item) => item.kind !== 'string',
			)

			// * We check if there are any valid items in the pasted data that is a file or an image (not a string)
			// * If we don't have any valid items, we will then check if the items are strings
			// * and if so, we will create a text file with the content of the string and add it as an attachment
			// ? If there are no valid items, we will log an error and return
			if (!isImageValidItem) {
				const fileString = event.clipboardData?.getData('text/plain')

				if (!fileString) {
					console.warn('No valid files or text found in the pasted data')
					return
				}

				const isValidTextLength = validateTextContent({
					fileString,
				})

				if (!isValidTextLength) {
					return
				}

				event.preventDefault()
				event.stopPropagation()

				const pastedContextFileName = state.attachments.some((attch) =>
					attch.name.includes('Pasted Context'),
				)
					? `Pasted Context (${
							state.attachments.filter((attch) =>
								attch.name.includes('Pasted Context'),
							).length
						}).txt`
					: 'Pasted Context.txt'
				const pastedContextContent = `data:text/plain;base64,${Buffer.from(fileString.normalize('NFD'), 'utf8').toString('base64')}`
				// Check if the file already exists in the attachments, so we can update it instead of adding a new one (FUTURE)
				const _pasteContextMatch = state.attachments.find(
					(attch) => attch.name === pastedContextFileName,
				)
				const pasteFile = {
					id: nanoid(16),
					name: pastedContextFileName,
					url: pastedContextContent,
					contentType: 'text/plain',
					content: pastedContextContent,
					messageIds: [],
					expires: new Date().toISOString(),
					size: new Blob([fileString]).size,
				}
				addAttachmentObject(pasteFile)

				return
			}

			event.preventDefault()
			event.stopPropagation()

			const newItems = Array.from(items).map((item) => {
				return {
					...item,
					getAsFile: () => {
						const currentFile = item.getAsFile()
						if (!currentFile) {
							console.warn('No file found in the pasted item')
							return null
						}
						const fileName = currentFile.name.split('.')[0]
						const fileExtension = currentFile.name.split('.').pop() || 'txt'
						return new File(
							[currentFile],
							`${fileName}-${nanoid(8)}.${fileExtension}`,
							{ type: currentFile.type },
						)
					},
				}
			})
			const dataTransfer = new DataTransfer()

			for (const item of newItems) {
				const file = item.getAsFile()
				if (file) {
					dataTransfer.items.add(file)
				}
			}

			handleValidFiles(dataTransfer.items)
		},
		[state],
	)

	const handleDragOver = (event: React.DragEvent<HTMLFormElement>) => {
		event.preventDefault()

		event.dataTransfer.effectAllowed = 'all'
		event.dataTransfer.dropEffect = 'move'

		setState({ isDragging: true })
	}

	const handleDragLeave = (event: React.DragEvent<HTMLFormElement>) => {
		event.preventDefault()
		setState({ isDragging: false })
	}

	const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
		event.preventDefault()
		const files = event.dataTransfer?.files

		if (!files) return

		handleValidFiles(files)

		setState({ isDragging: false })
	}

	// Function to handle files selected from the file dialog
	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target

		if (!files) return

		if (appConfig.features.maxFileSize) {
			if (
				files.length > appConfig.features.maxAttachments ||
				state.attachments.length + files.length >
					appConfig.features.maxAttachments
			) {
				console.error(
					`Cannot add more than ${appConfig.features.maxAttachments} attachments.`,
				)
				customSonner({
					type: 'error',
					text: `Cannot add more than ${appConfig.features.maxAttachments} attachments.`,
				})
				return
			}

			for (const file of files) {
				if (file.size > appConfig.features.maxFileSize) {
					console.error('File size exceeds the limit')
					customSonner({
						type: 'error',
						text: 'File size exceeds the limit of 10MB',
					})
					return
				}
			}
		}

		handleValidFiles(files)

		setState({ isDragging: false })
	}

	const toggleAttachmentSelection = (id: string) => {
		const newAttachments = state.attachments.map((attachment) => {
			if (attachment.id === id) {
				return {
					...attachment,
					isSelected: !attachment.isSelected,
				}
			}
			return attachment
		})

		const userAttachment = userAttachments?.find(
			(attachment) => attachment.id === id,
		) as FileAttachment
		if (
			userAttachment &&
			!newAttachments.some((attachment) => attachment.id === id)
		) {
			newAttachments.push({
				...userAttachment,
				isSelected: true,
			})
		}

		setState({
			attachments: newAttachments.filter((attachment) => attachment.isSelected),
		})
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: We only required to update this effect when the formRef and the state changes
	useEffect(() => {
		const form = formRef?.current

		if (!form) return

		const formId = form.id.split('-').pop()
		const formTextarea = form.querySelector(
			`textarea[id=prompt-textarea-${formId}]`,
		)

		if (formTextarea) {
			formTextarea.addEventListener('paste', handleFilePaste as EventListener)
		}

		return () => {
			if (!form) return

			const formId = form.id.split('-').pop()
			const formTextarea = form.querySelector(
				`textarea[id=prompt-textarea-${formId}]`,
			)

			if (formTextarea) {
				formTextarea.removeEventListener(
					'paste',
					handleFilePaste as EventListener,
				)
			}
		}
	}, [formRef?.current, state])

	// [state, actions]
	return [
		{
			...state,
			userData: {
				userAttachments,
				loading,
				error,
			},
		},
		{
			addAttachment,
			updateAttachment,
			handleFileSelect,
			removeAttachment,
			clearAttachments,
			addAttachmentObject,
			attachFilesToMessage,
			toggleAttachmentSelection,
			onDragOver: handleDragOver,
			onDragLeave: handleDragLeave,
			onDrop: handleDrop,
		},
	]
}
