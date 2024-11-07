import type React from 'react'
import {
  calculatePasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthLabel
} from '@/lib/password'

interface PasswordStrengthMeterProps {
  password: string
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const strength = calculatePasswordStrength(password)
  const color = getPasswordStrengthColor(strength)
  const label = getPasswordStrengthLabel(strength)

  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-300 rounded-full">
        <div
          role="progressbar"
          className="h-full transition-all duration-300 ease-in-out rounded-full"
          style={{
            width: `${(strength / 6) * 100}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
      <p role="presentation" className="mt-1 text-sm text-neutral-400">
        Password Strength: <span className="font-medium">{label}</span>
      </p>
    </div>
  )
}
