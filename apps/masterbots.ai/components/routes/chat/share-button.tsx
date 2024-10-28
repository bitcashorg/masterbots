import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface ShareButtonProps {
  title: string
  text: string
  url: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        console.log('Content shared successfully')
      } catch (error) {
        console.log('Error sharing content:', error)
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard')
    }
  }

  return (
    <Button
      type="button"
      variant={'ghost'}
      size={'sm'}
      className="flex justify-between w-full"
      onClick={e => {
        e.stopPropagation()
        handleShare()
      }}
    >
      <Share2 className="w-4 h-4" />
      <span>Share</span>
    </Button>
  )
}
