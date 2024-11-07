import type React from 'react'

export function calculatePasswordStrength(password: string): number {
  let strength = 0
  if (password.length > 7) strength += 1
  if (password.length > 10) strength += 1
  if (/[A-Z]/.test(password)) strength += 1
  if (/[a-z]/.test(password)) strength += 1
  if (/[0-9]/.test(password)) strength += 1
  if (/[^A-Za-z0-9]/.test(password)) strength += 1
  return strength
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

export function getPasswordStrengthLabel(strength: number): string {
  switch (strength) {
    case 0:
    case 1:
      return 'Weak'
    case 2:
    case 3:
      return 'Fair'
    case 4:
    case 5:
      return 'Strong'
    default:
      return 'Very Strong'
  }
}

export function isPasswordStrong(password: string): boolean {
  const strength = calculatePasswordStrength(password)
  return strength >= 4 // Require at least a "Strong" password
}

export function validatePassword(e: React.FocusEvent<HTMLInputElement>): void {
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
