import { contracts } from './contracts.env'

export type MasterbotsEnv = 'prod' | 'test' | 'local'

export type MasterbotsContracts = typeof contracts.prod
