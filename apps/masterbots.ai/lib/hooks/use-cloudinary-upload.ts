import { appConfig } from 'mb-env'
import { useState } from 'react'
interface CloudinaryResponse {
  secure_url: string
  public_id: string
  format: string
}

interface UploadResult {
  success: boolean
  data?: CloudinaryResponse
  error?: unknown
}

export function useUploadImagesCloudinary() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const uploadFilesCloudinary = async (file: File): Promise<UploadResult> => {
    try {
      setLoading(true)
      setError(null)

      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload only image files')
      }

      // 10MB limit for example
      if (file.size > 10 * 1024 * 1024) {
        throw new Error(
          'File size too large. Please upload a file less than 10MB'
        )
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', appConfig.cloudinary.upload_preset)
      formData.append('folder', 'masterbots/user_profile_img_uploads')

      if (appConfig.cloudinary.transformation) {
        formData.append('transformation', appConfig.cloudinary.transformation)
      }

      const response = await fetch(appConfig.cloudinary.url, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()

      return {
        success: true,
        data: result
      }
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Unknown error occurred')
      setError(error)
      console.error('Error uploading files to Cloudinary:', error)

      return {
        success: false,
        error
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    uploadFilesCloudinary,
    loading,
    error
  }
}
