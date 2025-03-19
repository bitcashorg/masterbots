import type { JWTPayload } from 'jose'
import type { HasuraClaims } from './hasura.type'

export interface JwtUser {
	role: string
	account: string
	sessionId: string
}

export interface JwtData extends JWTPayload {
	user: JwtUser
	'https://hasura.io/jwt/claims': HasuraClaims
}
