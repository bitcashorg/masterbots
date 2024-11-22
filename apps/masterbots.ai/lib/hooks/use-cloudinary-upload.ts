import { useState } from 'react'
import { appConfig } from 'mb-env'
import toast from 'react-hot-toast'
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
        toast.error('Please upload only image files')
      }

      // 10MB limit for example
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size too large. Please upload a file less than 10MB')
      }
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'doc_codepen_example')
      formData.append('folder', 'mastertbots/user_profile_img_uploads')
     
      const response = await fetch(appConfig.cloudinary.url, {
        method: 'POST',
        body: formData,
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
      const error = err instanceof Error ? err : new Error('Unknown error occurred')
      setError(error)
      console.error('Error uploading files to Cloudinary:', error)
      toast.error('Error uploading files to Cloudinary')
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