import { MessageSquareX, UserRoundX } from 'lucide-react'

export const preferences = [
	{
		title: 'General',
		items: [
			{
				title: 'Preferred Language',
				description: 'Receive emails about new products, features, and more.',
				type: 'switch',
			},
			{
				title: 'Masterbots Theme',
				description: 'Change the default theme for the Masterbots site.',
				type: 'switch',
			},
			{
				title: 'Default Font Size',
				description:
					'Change overall font-size website (does not change your browser font-size).',
				type: 'toggleGroup',
			},
		],
	},
	{
		title: 'Thread Preferences',
		items: [
			{
				title: 'Always Web Search',
				description:
					'Enable web search on every new thread created and on every request by default.',
				type: 'switch',
			},
			{
				title: 'Always Pro Mode',
				description:
					'Enable pro mode on every new thread created and on every request by default.',
				type: 'switch',
			},
		],
	},
	{
		title: 'Email Notifications',
		items: [
			{
				title: 'Marketing emails',
				description: 'Receive emails about new products, features, and more.',
				type: 'switch',
			},
			{
				title: 'Security emails',
				description: 'Receive emails about your account security.',
				type: 'switch',
				defaultChecked: true,
			},
		],
	},
	{
		title: 'Advance Configuration',
		items: [
			{
				title: 'Configure My Threads',
				description:
					'Enable to give a unique touch to all your chatbots on any domain category!',
				type: 'switch',
				defaultChecked: true,
			},
			{
				title: 'Set new configuration',
				description:
					'Create a new configuration for tone, style, length and complexity.',
				type: 'button',
			},
			{
				title: 'Configure My Chatbots',
				description:
					'Enable to narrow the configuration for your chatbots to give your unique touch.',
				type: 'switch',
				defaultChecked: true,
			},
			{
				title: 'Set new configuration',
				description:
					'Create a new configuration for tone, style, length and complexity.',
				type: 'button',
			},
		],
	},
	{
		title: 'Danger Zone',
		items: [
			{
				title: 'Delete Your Account',
				description:
					'Removes all your personal data and all your conversations and threads.',
				type: 'dangerButton',
				icon: UserRoundX,
				buttonText: 'Delete Account',
			},
			{
				title: 'Delete All My Public Threads',
				description:
					'Removes all your published threads and all your related content of your public threads.',
				type: 'dangerButton',
				icon: MessageSquareX,
				buttonText: 'Delete Threads',
			},
		],
	},
]
