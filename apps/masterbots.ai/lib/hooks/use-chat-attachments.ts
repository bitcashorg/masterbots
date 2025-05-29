import { MAX_HEIGHT, MAX_WIDTH } from '@/lib/constants/hasura'
import { type IndexedDBItem, useIndexedDB } from '@/lib/hooks/use-indexed-db'
import { useModel } from '@/lib/hooks/use-model'
import { useThread } from '@/lib/hooks/use-thread'
import { useSonner } from '@/lib/hooks/useSonner'
import type * as OpenAi from 'ai'
import { appConfig } from 'mb-env'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect } from 'react'
import { useAsync, useSetState } from 'react-use'

export type FileAttachment = {
	id: string
	name: string
	size: number
	contentType: string
	messageIds: string[]
	// The raw content of the attachment. It can either be a string or an ArrayBuffer.
	content: string | ArrayBuffer | null
	// The URL of the attachment. It can either be a URL to a hosted file or a Data URL.
	url: string
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
	const { activeThread } = useThread()
	const dbKeys = getUserIndexedDBKeys(session?.user?.id)
	const { mounted, ...indexedDBActions } = useIndexedDB(dbKeys)
	const {
		value: userAttachments,
		loading,
		error,
	} = useAsync(async () => {
		if (!mounted) return
		return await indexedDBActions.getAllItems()
	}, [session?.user, mounted, activeThread])

	const [state, setState] = useSetState<{
		isDragging: boolean
		attachments: FileAttachment[]
	}>({
		isDragging: false,
		attachments: [],
	})
	const { customSonner } = useSonner()
	const { selectedModel } = useModel()

	// biome-ignore lint/correctness/useExhaustiveDependencies: We only required to update this fn every time we receive a new state of attachments
	const addAttachment = useCallback(
		(file: DataTransferItem | File) => {
			const reader = new FileReader()
			let attachmentFile: File | null = file as File

			if (file instanceof DataTransferItem) {
				attachmentFile = file.getAsFile()
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
				attachmentFile?.size &&
				attachmentFile.size > appConfig.features.maxFileSize
			) {
				console.error('File size exceeds the limit')
				customSonner({
					type: 'error',
					text: 'File size exceeds the limit of 10MB',
				})
				return
			}

			reader.onload = (readerEvent) => {
				const event = readerEvent.target || reader
				// Creating an base64 string from the file content
				const attachmentUrl =
					typeof event.result === 'string'
						? event.result
						: Buffer.from(event.result as ArrayBuffer).toString('base64')
				const newAttachment: FileAttachment = {
					id: nanoid(16),
					name: attachmentFile?.name || '',
					size: attachmentFile?.size || 0,
					contentType: attachmentFile?.type || '',
					// * Raw content can be a string or an ArrayBuffer
					content: event.result,
					// * Compressed URL to the attachment
					url: attachmentUrl,
					isSelected: true,
					messageIds: [],
				}

				// ? We pass the new attachment as prop to ensure the latest attachment is always added
				const updateAttachments = (updateNewAttachment: FileAttachment) => {
					const updatedAttachments = [...state.attachments, updateNewAttachment]

					setState({ attachments: updatedAttachments })
				}

				if (newAttachment.contentType.startsWith('image/')) {
					const img = new Image()
					img.src = attachmentUrl
					img.onload = () => {
						const canvas = document.createElement('canvas')
						const ctx = canvas.getContext('2d')

						if (!ctx) {
							console.error('Failed to get canvas context')
							updateAttachments(newAttachment)
							return
						}

						let width = img.width
						let height = img.height
						// Calculate the new dimensions while maintaining aspect ratio
						if (width > height) {
							if (width > MAX_WIDTH) {
								height *= MAX_WIDTH / width
								width = MAX_WIDTH
							}
						} else {
							if (height > MAX_HEIGHT) {
								width *= MAX_HEIGHT / height
								height = MAX_HEIGHT
							}
						}
						canvas.width = width
						canvas.height = height
						// Draw the image on the canvas
						ctx.drawImage(img, 0, 0, width, height)
						// Compress the image and convert to JPEG format
						canvas.toBlob(
							(blob) => {
								if (!blob) {
									console.error('Failed to compress image')
									updateAttachments(newAttachment)
									return
								}
								// Update the attachment URL with the compressed image
								newAttachment.url = URL.createObjectURL(blob)
							},
							'image/jpeg',
							0.9,
						) // 0.9 is the quality parameter (0 to 1)

						updateAttachments(newAttachment)
					}
				} else {
					updateAttachments(newAttachment)
				}
			}

			if (appConfig.features.devMode) {
				console.info('Final attachmentFile --> ', attachmentFile)
			}

			if (!attachmentFile) return

			reader.readAsDataURL(attachmentFile)
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

	// ? When pasting files into the form works... but only for text base files, for images it has hard times to paste them... depends on the browser and OS
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const handleFilePaste = useCallback((event: ClipboardEvent) => {
		const { items } = event.clipboardData as DataTransfer
		const isValidItems = Array.from(items).some(
			(item) => item.kind !== 'string',
		)

		if (isValidItems) {
			event.stopPropagation()
			event.preventDefault()

			handleValidFiles(items)
		}
	}, [])

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

	// biome-ignore lint/correctness/useExhaustiveDependencies: We only required to run this effect once
	useEffect(() => {
		const form = formRef?.current

		if (form) {
			const formId = form.id.split('-').pop()
			const formTextarea = form.querySelector(
				`textarea[id=prompt-textarea-${formId}]`,
			)

			if (formTextarea) {
				formTextarea.addEventListener('paste', handleFilePaste as EventListener)
			}
		}
		return () => {
			if (form) {
				const formId = form.id.split('-').pop()
				const formTextarea = form.querySelector(
					`textarea[id=prompt-textarea-${formId}]`,
				)

				if (formTextarea) {
					formTextarea.addEventListener(
						'paste',
						handleFilePaste as EventListener,
					)
				}
			}
		}
	}, [formRef?.current])

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
			handleFileSelect,
			removeAttachment,
			clearAttachments,
			attachFilesToMessage,
			toggleAttachmentSelection,
			onDragOver: handleDragOver,
			onDragLeave: handleDragLeave,
			onDrop: handleDrop,
		},
	]
}
