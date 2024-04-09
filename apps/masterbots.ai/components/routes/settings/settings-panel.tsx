import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { Card } from '@/components/ui/card'

export function SettingsPanel() {
  return (
    <div>
      <div className="space-y-0.5 mb-10">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      {Object.entries(formData).map(([key, field]) => (
        <SettingSection field={field} key={key} />
      ))}
    </div>
  )
}

// Recursive function to render form fields
function SettingSection({ field, ...props }: { field: FormField }) {
  return (
    <div {...props} className="my-5">
      <h2 className="text-l font-semibold">{field.label}</h2>
      <p className="text-sm text-gray-400">{field.description}</p>
      <Input className="mt-2 border-none" placeholder={field.placeholder} />
      <p className="text-sm text-gray-400 mt-1">
        Please use {field.label === 'username' ? '48' : '32'} characters at
        maximum.
      </p>
      <Button className="mt-4">Save</Button>
    </div>
  )
}

// Define a type for form fields
interface FormField {
  label: string
  description: string
  placeholder: string
}

// Define a type for form data
interface FormData {
  [key: string]: FormField
}

// Sample form data
const formData: FormData = {
  displayName: {
    label: 'Display Name',
    description:
      'Please enter your full name, or a display name you are comfortable with.',
    placeholder: 'Gabo Esquivel'
  },
  email: {
    label: 'Email',
    description:
      'Please enter the email address you want to use to log in with Vercel.',
    placeholder: 'contact@gaboesquivel.com'
  },
  username: {
    label: 'Username',
    description: 'This is your URL namespace within Vercel.',
    placeholder: 'gabo-esquivel'
  }
}
