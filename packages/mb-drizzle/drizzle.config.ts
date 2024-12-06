import type { Config } from 'drizzle-kit';
import { appConfig } from 'mb-env';

export default {
  schema: './src/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: appConfig.database.url,
  },
  verbose: true,
  strict: true,
} satisfies Config;