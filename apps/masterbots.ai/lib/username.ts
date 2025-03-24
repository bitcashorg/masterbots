import { type ZodSchema, z } from 'zod'

export const UsernameSchema: ZodSchema<string> = z
	.string()
	.min(10, { message: 'Username must be at least 10 characters long.' })
	.max(20, { message: 'Username must not exceed 20 characters.' })
	.regex(/^[a-z0-9_]*$/, {
		message:
			'Username must contain only lowercase letters, numbers, and underscores.',
	})

// Function to generate a random number as a string
export const generateRandomNumber = (length: number): string => {
	const randomNumber = Math.floor(Math.random() * 10 ** length)
	return randomNumber.toString().padStart(length, '0')
}

// Zod schema for validating usernames

// Function to generate a username from an OAuth profile name
export const generateUsername = (name: string): string => {
	if (!name) return `user_${generateRandomNumber(6)}`

	let username = name.toLowerCase().replace(/([^a-z0-9]|\+)/g, '_')

	if (username.length < 10) {
		username += `_${generateRandomNumber(7)}`
	}
	// * After generating a username, we validate it using the UsernameSchema if the other case happens and it is very long.
	if (username.length > 20) {
		username = username.substring(0, 20)
	}

	return UsernameSchema.parse(username)
}
