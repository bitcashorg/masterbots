// ? General configuration for the apps
export const appConfig = {
	features: {
		devMode: process.env.NEXT_PUBLIC_DEV_MODE === 'true',
		experimentalAiConfig:
			process.env.NEXT_PUBLIC_FEATURE_EXPERIMENTAL_AI_CONFIG === 'true',
		experimentalStreamDelayMs: Number.parseInt(
			process.env.NEXT_PUBLIC_EXPERIMENTAL_STREAM_DELAY_MS || '10',
			10,
		),
		multiModel: process.env.NEXT_PUBLIC_FEATURE_MULTI_MODEL_SELECTOR === 'true',
		webSearch: process.env.NEXT_PUBLIC_FEATURE_WEB_SEARCH === 'true',
		maxAttachments: Number.parseInt(
			process.env.NEXT_PUBLIC_MAX_ATTACHMENTS || '10',
			10,
		),
		maxFileSize: Number.parseInt(
			process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760',
			10,
		),
		topLoader: process.env.NEXT_PUBLIC_FEATURE_TOP_LOADER === 'true',
		enableVerificationEmail:
			process.env.NEXT_PUBLIC_ENABLE_VERIFICATION_EMAIL === 'true',
		ProfileNBotPageHasPopup:
			process.env.NEXT_PUBLIC_PROFILE_N_BOT_PAGE_HAS_POPUP === 'true',
	},
	enableAuth: {
		google: process.env.NEXT_PUBLIC_GOOGLE_AUTH === 'true',
	},
	cloudinary: {
		url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
		upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
		transformation: process.env.NEXT_PUBLIC_CLOUDINARY_TRANSFORMATION || '',
	},
	database: {
		url: process.env.DATABASE_URL || '',
	},
}
