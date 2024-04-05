'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { z } from 'zod'
import { Input } from '../ui/input'

const schema = z.object({
  otherText: z.string().min(1).optional(),
  other: z.boolean().optional()
})

export async function WorkEarlyAccessForm() {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })
  const [interests, setInterests] = useState([
    { name: 'research', label: 'Research', checked: false },
    { name: 'operations', label: 'Operations', checked: false },
    { name: 'product', label: 'Product', checked: false },
    { name: 'marketing', label: 'Marketing', checked: false },
    { name: 'design', label: 'Design', checked: false },
    { name: 'coding', label: 'Coding', checked: false },
    { name: 'finance', label: 'Finance', checked: false },
    { name: 'trading', label: 'Trading', checked: false },
    { name: 'other', label: 'Other', checked: false }
  ])

  const handleCheckboxChange = () => {
    const selectedInterests = interests
      .filter(interest => interest.checked)
      .map(interest => interest.name)
    const otherInterestIndex = interests.findIndex(
      interest => interest.name === 'other'
    )
    if (otherInterestIndex !== -1) {
      setInterests(prevInterests => {
        return [
          ...prevInterests.slice(0, otherInterestIndex),
          {
            ...prevInterests[otherInterestIndex],
            checked: selectedInterests.includes('other')
          },
          ...prevInterests.slice(otherInterestIndex + 1)
        ]
      })
    }
  }

  const onSubmit = (data: any) => {
    // Implement your submission logic here
    console.log('Submitted:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {interests.map((interest, index) => (
          <div key={index}>
            <Checkbox
              id={interest.name}
              name={interest.name}
              // ref={register}
              onChange={handleCheckboxChange}
              checked={interest.checked}
            />
            <label
              htmlFor={interest.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {interest.label}
            </label>
            <br />
          </div>
        ))}
        {watch('other') && (
          <Input
            type="text"
            name="otherText"
            // ref={register({ required: true })}
            placeholder="Please specify"
          />
        )}
      </div>
      {formState.errors.otherText && <p>Please specify other interest</p>}
      {formState.isSubmitted && formState.errors && !formState.isValid && (
        <p>Please select at least one option</p>
      )}
      <div className="flex justify-center pt-10">
        <Button type="submit">Get early access</Button>
      </div>
    </form>
  )
}
