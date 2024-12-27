import { SuccessIcon, InfoIcon, ErrorIcon, CloseIcon } from '@/components/icons'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export type customSonnerProps = {
  type?: 'success' | 'error' | 'info'
  text?: string | null
}

export function useSonner() {
  const customSonner = ({ type = 'success', text }: customSonnerProps) => {
    const toastConfigs = {
      success: {
        title: 'Success',
        text: text ?? 'Changes and been applied successfully',
        button: <CloseIcon className="dark:icon-sonner-dark" />,
        icon: <SuccessIcon />
      },
      error: {
        title: 'Error',
        text: text ?? 'Failed to update the information. Please try again',
        button: 'Retry',
        icon: <ErrorIcon />
      },
      info: {
        title: 'Changes applied',
        text: text ?? 'Your changes has been applied 5 minutes ago.',
        button: 'Undo',
        icon: <InfoIcon />
      }
    }

    return toast.custom(t => {
      const config = toastConfigs[type]
      return (
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
              type="button"
              onClick={() => toast.dismiss(t)}
            >
              {config.button}
            </button>
          </div>
        </div>
      )
    })
  }

  return { customSonner }
}
const styles = {
  success: 'border-[#83E56A]',
  error: 'border-[#F93333]',
  info: 'border-[#388DE2]'
}
