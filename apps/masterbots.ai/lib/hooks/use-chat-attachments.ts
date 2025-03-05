import type * as OpenAi from 'ai'
import { nanoid } from 'nanoid'
import { useCallback, useEffect } from 'react'
import { useSetState } from 'react-use'

export type FileAttachment = {
  id: string
  name: string
  size: number
  type: string
  content: string | ArrayBuffer | null
  // The URL of the attachment. It can either be a URL to a hosted file or a Data URL.
  url?: string
}

export function useFileAttachments(formRef: React.RefObject<HTMLFormElement>): [
  {
    isDragging: boolean
    attachments: FileAttachment[]
  },
  {
    addAttachment: (file: DataTransferItem | File) => void
    handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
    removeAttachment: (id: string) => void
    clearAttachments: () => void
    attachFilesToMessage: (message: OpenAi.AssistantMessage) => OpenAi.AssistantMessage
    onDragOver: (event: React.DragEvent<HTMLFormElement>) => void
    onDragLeave: (event: React.DragEvent<HTMLFormElement>) => void
    onDrop: (event: React.DragEvent<HTMLFormElement>) => void
  },
] {
  const [state, setState] = useSetState<{
    isDragging: boolean
    attachments: FileAttachment[]
  }>({
    isDragging: false,
    attachments: [],
  })

  const addAttachment = (file: DataTransferItem | File) => {
    const reader = new FileReader()
    let attachmentFile: File | null = file as File

    if (file instanceof DataTransferItem) {
      attachmentFile = file.getAsFile()
    }

    reader.onload = () => {
      // Creating an base64 string from the file content
      const attachmentUrl =
        typeof reader.result === 'string'
          ? reader.result
          : Buffer.from(reader.result as ArrayBuffer).toString('base64')
      const newAttachment: FileAttachment = {
        id: nanoid(),
        name: attachmentFile?.name || '',
        size: attachmentFile?.size || 0,
        type: attachmentFile?.type || '',
        content: reader.result,
        url: attachmentUrl,
      }
      setState((prev) => ({ attachments: [...prev.attachments, newAttachment] }))
    }

    console.log('Final attachmentFile --> ', attachmentFile)

    if (!attachmentFile) return

    reader.readAsDataURL(attachmentFile)
  }

  const removeAttachment = (id: string) =>
    setState((prev) => ({
      attachments: prev.attachments.filter((attachment) => attachment.id !== id),
    }))

  const clearAttachments = () => setState({ attachments: [] })

  const attachFilesToMessage = useCallback(
    (message: OpenAi.AssistantMessage) => {
      return {
        ...message,
        attachments: state.attachments,
      }
    },
    [state.attachments],
  )

  const handleValidFiles = (files: DataTransferItemList | FileList) => {
    let validAttachments: DataTransferItemList | FileList | null = files as DataTransferItemList
    if (files instanceof FileList) {
      const dataTransfer = new DataTransfer()
      
      for (const file of files) {
        dataTransfer.items.add(file)
      }
      
      validAttachments = dataTransfer.items
    }
    
    const validFiles = Array.from(validAttachments).filter((file) => file.type.startsWith('image/') || file.type.startsWith('text/'))
    console.log('Files to process (the validFiles) --> ', validFiles)
    for (const file of validFiles) {
      addAttachment(file)
    }
  }

  const handleFilePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items
    if (items) {
      handleValidFiles(items)
    }
  }

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
    const files = event.target.files

    if (!files) return

    handleValidFiles(files)

    setState({ isDragging: false })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: We only required to run this effect once
  useEffect(() => {
    const form = formRef?.current
    
    if (form) {
      const formId = form.id.split('-').pop()
      const formTextarea = form.querySelector(`input[id=prompt-textarea-${formId}]`)
      
      if (formTextarea) {
        formTextarea.addEventListener('paste', handleFilePaste as EventListener)
      }
    }
    return () => {
      if (form) {
        const formId = form.id.split('-').pop()
        const formTextarea = form.querySelector(`input[id=prompt-textarea-${formId}]`)

        if (formTextarea) {
          formTextarea.addEventListener('paste', handleFilePaste as EventListener)
        }
      }
    }
  }, [formRef?.current])

  // [state, actions]
  return [
    state,
    {
      addAttachment,
      handleFileSelect,
      removeAttachment,
      clearAttachments,
      attachFilesToMessage,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  ]
}
