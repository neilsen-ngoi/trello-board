'use client'

import { forwardRef, KeyboardEventHandler } from 'react'
import { Label } from '../ui/label'

interface FormTextAreaProps {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  onBlur?: () => void
  onClick: () => void
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
  defaultValue?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      onBlur,
      onClick,
      defaultValue,
    },
    ref
  ) => {
    return (
      <div className=" space-y-2 w-full">
        <div className=" space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className=" text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
        </div>
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'
