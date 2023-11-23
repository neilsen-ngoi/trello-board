'use client'

import { Input } from '@/components/ui/input'
import { useFormStatus } from 'react-dom'

interface FormInputProps {
  errors?: Record<string, any>
  title?: string[]
}

export const FormInput = ({ errors, title }: FormInputProps) => {
  const { pending } = useFormStatus()
  return (
    <div>
      <Input
        type="text"
        id="title"
        name="title"
        required
        placeholder="Enter board title"
      />
      {errors?.title ? (
        <div>
          {errors.title?.map((error: string) => (
            <p key={error} className=" text-rose-500">
              {error}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  )
}
