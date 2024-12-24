import { SuccessIcon, InfoIcon, ErrorIcon, CloseIcon } from '@/components/icons'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export type customSonnerProps = {
  type?: 'success' | 'error' | 'info'
  text?: string | null
}

export function useSonner() {
  let config: {
    title: string
    text: string
    button: React.ReactNode | string
    icon: React.ReactNode | any
  } = {
    title: '',
    text: '',
    button: '',
    icon: null
  }

  const customSonner = ({ type = 'success', text }: customSonnerProps) => {
    switch (type) {
      case 'error':
        {
          config.title = 'Error'
          config.text =
            text ?? 'Failed to update the information. Please try again'
          config.button = 'Retry'
          config.icon = <ErrorIcon />
        }
        break
      case 'info':
        {
          config.title = 'Changes applied'
          config.text = text ?? 'Your changes has been applied 5 minutes ago.'
          config.button = 'Undo'
          config.icon = <InfoIcon />
        }
        break
      default: {
        config.title = 'Success'
        config.text = text ?? 'Changes and been applied successfully'
        config.button = <CloseIcon className="dark:icon-sonner-dark" />
        config.icon = <SuccessIcon />
      }
    }
    return toast.custom(t => (
      <div
        className={cn(
          'md:w-[23.125rem] w-full border rounded-lg p-3 relative dark:bg-[#09090B] bg-[#ffff]',
          styles[type]
        )}
      >
        <div className="flex items-center gap-2">
          {config.icon}
          <h2 className="font-medium text-lg dark:text-[#FAFAFA] text-[#09090B]">
            {config.title}
          </h2>
        </div>
        <p className="text-sm dark:text-[#A1A1AA] text-[#71717A] pr-16">
          {config.text}
        </p>

        <div className="absolute inset-y-0 right-3 flex items-center">
          <button
            className="border dark:border-[#27272A] border-[#E4E4E7] rounded-md py-1.5 px-2 text-sm dark:text-[#fafafa] text-[#09090B]"
            onClick={() => toast.dismiss(t)}
          >
            {config.button}
          </button>
        </div>
      </div>
    ))
  }

  return { customSonner }
}
const styles = {
  success: 'border-[#83E56A]',
  error: 'border-[#F93333]',
  info: 'border-[#388DE2]'
}
