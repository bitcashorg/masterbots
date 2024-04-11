import { z, ZodSchema } from 'zod'
import { generateRandomNumber } from './number'

// Zod schema for validating usernames
export const UsernameSchema: ZodSchema<string> = z.string()
  .min(11, { message: "Username must be at least 11 characters long." })
  .max(20, { message: "Username must not exceed 20 characters." })
  .regex(/^[a-z0-9_]*$/, { message: "Username must contain only lowercase letters, numbers, and underscores." })

// Function to generate a username from an OAuth profile name
export const generateUsername = (name: string): string => {
  if (!name) return `user_${generateRandomNumber(6)}`

  let username = name.toLowerCase().replace(/[^a-z0-9]/g, '_')

  if (username.length < 10) {
    username += `_${generateRandomNumber(7)}`
  } else if (username.length > 20) {
    username = username.substring(0, 20)
  }

  return UsernameSchema.parse(username) 
}

