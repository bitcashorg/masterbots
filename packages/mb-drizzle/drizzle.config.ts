import type { Config } from 'drizzle-kit'
import { appConfig } from 'mb-env'

export default {
	// schema: './src/schema/*',
	out: './src/drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: appConfig.database.url,
	},
	verbose: true,
	strict: true,
} satisfies Config
