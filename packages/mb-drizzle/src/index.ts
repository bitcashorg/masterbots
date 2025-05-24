import { drizzle } from 'drizzle-orm/node-postgres'
import { appConfig } from 'mb-env'
import { Pool } from 'pg'
import * as schema from './drizzle/schema'

const pool = new Pool({
	connectionString: appConfig.database.url,
})

export const db = drizzle(pool, { schema })

export * from './drizzle/schema'
export * from './drizzle/relations'
