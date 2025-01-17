import { cn } from '@/lib/utils'
import { Check, Info, AlertTriangle, X } from 'lucide-react'
import { toast } from 'sonner'

export type customSonnerProps = {
  type?: 'success' | 'error' | 'info'
  text?: string | null
}

/**
 * Custom hook that provides a function to display custom toast notifications.
 *
 * @returns {Object} An object containing the `customSonner` function.
 *
 * @function customSonner
 * @param {Object} params - The parameters for the custom toast notification.
 * @param {string} [params.type='success'] - The type of the toast notification. Can be 'success', 'error', or 'info'.
 * @param {string} params.text - The text to display in the toast notification.
 *
 * @typedef {Object} customSonnerProps
 * @property {string} [type='success'] - The type of the toast notification. Can be 'success', 'error', or 'info'.
 * @property {string} text - The text to display in the toast notification.
 */

/**
 * Creates a custom notification based on the provided configuration.
 *
 * @param {customSonnerProps} options - Configuration for the notification.
 * @returns {void}
 *
 * @example
 * // Import the hook and use the customSonner function
 * import { useSonner } from './path/to/useSonner';
 *
 * const { customSonner } = useSonner();
 *
 * // Trigger a success notification
 * customSonner({ type: 'success', text: 'Operation completed successfully!' });
 *
 * // Trigger an error notification
 * customSonner({ type: 'error', text: 'Something went wrong. Please try again.' });
 *
 * // Trigger an info notification
 * customSonner({ type: 'info', text: 'Your data was last updated 5 minutes ago.' });
 *
 * // Trigger a default notification
 * customSonner();
 * // This will create a "success" notification with the default text:
 * // "Changes have been applied successfully."
 *
 * // Trigger an error notification with default text
 * customSonner({ type: 'error' });
 * // This will create an "error" notification with the default text:
 * // "Failed to update the information. Please try again."
 *
 * // Trigger an info notification with default text
 * customSonner({ type: 'info' });
 *
 * // This will create an "info" notification with the default text:
 * // "Your changes were applied 5 minutes ago."
 */

export function useSonner() {
  const customSonner = ({ type = 'success', text }: customSonnerProps) => {
    const toastConfigs = {
      success: {
        title: 'Success',
        text: text ?? 'Changes and been applied successfully',
        button: <X />,
        icon: <Check color="#83E56A" size={18} />
      },
      error: {
        title: 'Error',
        text: text ?? 'Failed to update the information. Please try again',
        button: 'Retry',
        icon: <AlertTriangle color="#F93333" size={18} />
      },
      info: {
        title: 'Changes applied',
        text: text ?? 'Your changes has been applied 5 minutes ago.',
        button: 'Undo',
        icon: <Info color="#388DE2" size={18} />
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
