import { drizzle } from 'drizzle-orm/node-postgres'
import { appConfig } from 'mb-env'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
	connectionString: appConfig.database.url,
})

export const db = drizzle(pool, { schema })

export * from './schema'
