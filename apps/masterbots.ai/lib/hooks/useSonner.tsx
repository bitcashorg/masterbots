import { cn } from '@/lib/utils'
import { AlertTriangle, Check, Info, X } from 'lucide-react'
import { appConfig } from 'mb-env'
import { toast } from 'sonner'

export type CustomSonnerProps = {
	type?: 'success' | 'error' | 'info'
	text?: string | null
}

/**
 * Custom hook for displaying toast notifications with predefined styles.
 *
 * @returns {Object} An object containing the `customSonner` function for displaying notifications.
 * @returns {function} customSonner - Function to display styled toast notifications.
 */

/**
 * Creates a custom notification based on the provided configuration.
 *
 * @param {CustomSonnerProps} options - Configuration for the notification.
 * @returns {import('sonner').ToastT} The created toast instance.
 *
 * @example
 * // Import the hook
 * import { useSonner } from '@/lib/hooks/useSonner';
import { appConfig } from '../../../../packages/mb-env/src/config.env';
 *
 * const { customSonner } = useSonner();
 *
 * // Trigger a success notification
 * customSonner({ type: 'success', text: 'Operation completed successfully!' });
 *
 * // Default texts for each type:
 * // Success: "Changes and been applied successfully"
 * // Error: "Failed to update the information. Please try again"
 * // Info: "Your changes has been applied 5 minutes ago."
 */

export function useSonner() {
	const customSonner = ({ type = 'success', text }: CustomSonnerProps) => {
		const toastConfigs = {
			success: {
				title: 'Success',
				text: text ?? 'Changes and been applied successfully',
				button: <X className="size-3" />,
				icon: <Check color="#83E56A" size={18} />,
			},
			error: {
				title: 'Error',
				text: text ?? 'Failed to update the information. Please try again',
				// TODO: When the button is clicked and there is a retry action, the toast should be dismissed and the action should be triggered.
				button: <X className="size-3" />,
				icon: <AlertTriangle color="#F93333" size={18} />,
			},
			info: {
				title: 'Info',
				text: text ?? 'Your changes has been applied 5 minutes ago.',
				// TODO: When the button is clicked and there is a undo action, the toast should be dismissed and the action should be triggered.
				button: <X className="size-3" />,
				icon: <Info color="#388DE2" size={18} />,
			},
		}

		return toast.custom(
			(t) => {
				const config = toastConfigs[type]
				return (
					<div
						className={cn(
							'md:w-[23.125rem] w-full border rounded-lg p-3 relative dark:bg-[#09090B] bg-[#ffff]',
							styles[type],
						)}
					>
						<div className="flex items-center gap-2">
							{config.icon}
							<h2 className="font-medium text-lg dark:text-[#FAFAFA] text-[#09090B]">
								{config.title}
							</h2>
						</div>
						<p className="text-sm dark:text-[#A1A1AA] text-[#71717A] pr-16 whitespace-pre-line">
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
			},
			{
				duration: appConfig.features.devMode ? 30000 : 8000,
			},
		)
	}

	return { customSonner }
}
const styles = {
	success: 'border-[#83E56A]',
	error: 'border-[#F93333]',
	info: 'border-[#388DE2]',
}
