import { Button } from '@/components/ui/button'
import { LucideCheck, LucideLoader2, LucideX, Share2 } from 'lucide-react'
import toast from 'react-hot-toast'
import ShareLink from '../thread/thread-user-actions'
import { generateShortLink } from '@/actions'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

interface ShareButtonProps {
  url: string
}

export function ShareButton({  url }: ShareButtonProps) {
  const [status, setStatus] = useState<
  'default' | 'loading' | 'copied' | 'error'
>('default')

  const copyToClipboard = async () => {
    setStatus('loading')
    try {
      let content;
      const { data, error } = await generateShortLink(url)
      if(data !== null){
        content = data.shortLink
      }else{
        content = process.env.NEXT_PUBLIC_BASE_URL + url
      }
       await navigator.clipboard.writeText(content)

      setStatus('copied')
      const timer = setTimeout(() => setStatus('default'), 5000)
      return () => clearTimeout(timer)
      
    } catch (error) {
      console.error('Failed to copy share link:', error)
      setStatus('error')
      const timer = setTimeout(() => setStatus('default'), 5000)
      return () => clearTimeout(timer)
    }
  }



  const iconsMap = {
    loading: (
      <LucideLoader2
        className="w-4 h-4 animate-spin stroke-accent-secondary"
      />
    ),
    copied: <LucideCheck  className="w-4 h-4 stroke-success" />,
    error: <LucideX  className=" w-4 h-4 stroke-destructive" />,
    default: <Share2 className="w-4 h-4" />

  }

  return (
    <Button
      type="button"
      variant={'ghost'}
      size={'sm'}
      className="flex justify-between w-full"
      onClick={e => {
        e.stopPropagation()
        copyToClipboard()
      }}
    >
      <AnimatePresence>{iconsMap[status]}</AnimatePresence>
      <span>Share</span>
    </Button>
  )
}
