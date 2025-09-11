import type { PreferenceItemType } from '@/types/types'
import {
	LetterText,
	MessageSquareX,
	Moon,
	Save,
	Sun,
	UserRoundX,
} from 'lucide-react'

export const preferences = [
	{
		title: 'General',
		items: [
			{
				title: 'Email',
				description: 'Change your email address to receive notifications.',
				type: 'input',
				props: {
					inputId: 'email',
					inputName: 'Email',
					inputPlaceholder: 'Enter your email address',
					defaultValue: '',
					inputReadOnly: true,
				},
			},
			{
				title: 'Email not verified',
				description:
					'Your email is not verified. Please check your inbox for the verification email.',
				type: 'emailVerification',
				props: {
					buttonText: 'Re-send Email Verification',
					buttonId: 'resend_verification_email',
					buttonDisabled: false,
				},
			},
			{
				title: 'Username',
				description: 'Change your username to something unique.',
				type: 'input',
				props: {
					inputId: 'username',
					inputName: 'Username',
					inputPlaceholder: 'Enter your username',
					defaultValue: '',
					asInlineButton: true,
					buttonText: 'Save',
					icon: Save,
				},
			},
			{
				title: 'Preferred Language',
				description:
					'Choose your language of preference in the thread conversations and content',
				type: 'translation',
			},
			{
				title: 'Masterbots Theme',
				description: 'Change the default theme for the Masterbots site.',
				type: 'dropdown',
				props: {
					switchId: 'theme',
					switchName: 'theme',
					items: [
						{
							value: 'dark',
							label: 'Dark',
							icon: Moon,
						},
						{
							value: 'light',
							label: 'Light',
							icon: Sun,
						},
					],
				},
			},
			{
				title: 'Default Font Size',
				description:
					'Change overall font-size website (does not change your browser font-size).',
				type: 'dropdown',
				props: {
					switchId: 'font-size',
					switchName: 'font-size',
					items: [
						{
							value: 'small',
							label: 'Small',
							icon: LetterText,
						},
						{
							value: 'medium',
							label: 'Medium',
							icon: LetterText,
						},
						{
							value: 'large',
							label: 'large',
							icon: LetterText,
						},
						// x-large option removed for simplicity
						{
							value: 'x-large',
							label: 'X-Large',
							icon: LetterText,
						},
					],
				},
			},
		] as PreferenceItemType[],
	},
	{
		title: 'Thread Preferences',
		items: [
			{
				title: 'Always Web Search',
				description:
					'Enable web search on every new thread created and on every request by default.',
				type: 'switch',
				props: {
					switchId: 'web-search',
					switchName: 'web-search',
				},
			},
			{
				title: 'Always Pro Mode',
				description:
					'Enable pro mode on every new thread created and on every request by default.',
				type: 'switch',
				props: {
					switchId: 'deep-expertise',
					switchName: 'deep-expertise',
				},
			},
		] as PreferenceItemType[],
	},
	// {
	// 	title: 'Email Notifications',
	// 	items: [
	// 		{
	// 			title: 'Marketing emails',
	// 			description: 'Receive emails about new products, features, and more.',
	// 			type: 'switch',
	// 		},
	// 		{
	// 			title: 'Security emails',
	// 			description: 'Receive emails about your account security.',
	// 			type: 'switch',
	// 			defaultChecked: true,
	// 		},
	// 	] as PreferenceItemType[],
	// },
	// {
	// 	title: 'Advance Configuration',
	// 	items: [
	// 		{
	// 			title: 'Configure My Threads',
	// 			description:
	// 				'Enable to give a unique touch to all your chatbots on any domain category!',
	// 			type: 'switch',
	// 			defaultChecked: true,
	// 		},
	// 		{
	// 			title: 'Set new configuration',
	// 			description:
	// 				'Create a new configuration for tone, style, length and complexity.',
	// 			type: 'button',
	// 		},
	// 		{
	// 			title: 'Configure My Chatbots',
	// 			description:
	// 				'Enable to narrow the configuration for your chatbots to give your unique touch.',
	// 			type: 'switch',
	// 			defaultChecked: true,
	// 		},
	// 		{
	// 			title: 'Set new configuration',
	// 			description:
	// 				'Create a new configuration for tone, style, length and complexity.',
	// 			type: 'button',
	// 		},
	// 	] as PreferenceItemType[],
	// },
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
				buttonId: 'delete_account',
			},
			{
				title: 'Delete All My Public Threads',
				description:
					'Removes all your published threads and all your related content of your public threads.',
				type: 'dangerButton',
				icon: MessageSquareX,
				buttonText: 'Delete Threads',
				buttonId: 'delete_threads',
			},
		] as PreferenceItemType[],
	},
] as const

export const languageOptions = [
	{ value: 'en', label: 'English', flag: '🇺🇸' },
	{ value: 'es', label: 'Spanish', flag: '🇪🇸' },
	{ value: 'pt', label: 'Portuguese', flag: '🇧🇷' },
	{ value: 'fr', label: 'French', flag: '🇫🇷' },
	{ value: 'zh', label: 'Chinese', flag: '🇨🇳' },
	{ value: 'ko', label: 'Korean', flag: '🇰🇷' },
	{ value: 'de', label: 'German', flag: '🇩🇪' },
	{ value: 'it', label: 'Italian', flag: '🇮🇹' },
	{ value: 'ru', label: 'Russian', flag: '🇷🇺' },
	{ value: 'ja', label: 'Japanese', flag: '🇯🇵' },
	{ value: 'ar', label: 'Arabic', flag: '🇸🇦' },
]
