import type React from 'react'

// * Valid password strength scores
export type PasswordStrength = 0 | 1 | 2 | 3 | 4 | 5 | 6

//* Mapping of strength scores to labels
export const strengthLabels: Record<PasswordStrength, string> = {
  0: 'Very Weak',
  1: 'Weak',
  2: 'Fair',
  3: 'Moderate',
  4: 'Good',
  5: 'Strong',
  6: 'Very Strong'
} as const

/**
 * Calculates password strength based on various criteria including Unicode characters.
 * Returns a score from 0 (weakest) to 6 (strongest).
 * @param password The password to evaluate
 */
export function calculatePasswordStrength(password: string): PasswordStrength {
  // Early return for empty or very short passwords
  if (!password || password.length < 4) return 0

  let strength = 0

  // Length checks
  if (password.length > 7) strength += 1
  if (password.length > 10) strength += 1

  // Unicode-aware regex patterns
  const patterns = {
    // Matches any uppercase letter, including non-ASCII uppercase
    uppercase: /\p{Lu}/u,

    // Matches any lowercase letter, including non-ASCII lowercase
    lowercase: /\p{Ll}/u,

    // Matches any decimal number
    numbers: /\p{Nd}/u,

    // Matches symbols, punctuation, and other non-alphanumeric characters
    special: /[^\p{L}\p{Nd}]/u
  }

  // Test each criteria
  if (patterns.uppercase.test(password)) strength += 1
  if (patterns.lowercase.test(password)) strength += 1
  if (patterns.numbers.test(password)) strength += 1
  if (patterns.special.test(password)) strength += 1

  // Ensure return value is within valid range
  return Math.min(strength, 6) as PasswordStrength
}

/**
 * Helper function to get a descriptive strength label
 * @returns Descriptive label for the password strength
 */
export function getPasswordStrengthLabel(strength: number): string {
  // Ensure strength is within valid range
  const validStrength = Math.min(
    Math.max(Math.floor(strength), 0),
    6
  ) as PasswordStrength
  return strengthLabels[validStrength]
}

export function getPasswordStrengthColor(strength: number): string {
  switch (strength) {
    case 0:
    case 1:
      return '#EF4444' // red-500
    case 2:
    case 3:
      return '#F59E0B' // yellow-500
    case 4:
    case 5:
      return '#10B981' // green-500
    default:
      return '#047857' // green-700
  }
}

export function isPasswordStrong(password: string): boolean {
  const strength = calculatePasswordStrength(password)
  return strength >= 4 // Require at least a "Strong" password
}

export function validatePassword(e: React.FocusEvent<HTMLInputElement>,
  t: (key: string) => string): void {

  const password = e.target.value
  if (password.length < 8) {
    e.target.setCustomValidity('Password must be at least 8 characters long')
    e.target.reportValidity()
  } else {
    e.target.setCustomValidity('')
  }
}

export function verifyPassword(e: React.FocusEvent<HTMLInputElement>): void {
  const form = new FormData(e.currentTarget.form as HTMLFormElement)
  const password = form.get('password') as string
  const passwordVerify = e.target.value

  if (passwordVerify && password !== passwordVerify) {
    e.target.setCustomValidity('Passwords do not match')
  } else {
    e.target.setCustomValidity('')
  }

  e.target.reportValidity()
}
