'use client'

import { cn } from '@/lib/utils'
import { forwardRef, KeyboardEventHandler } from 'react'
import { useFormStatus } from 'react-dom'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { FormErrors } from './form-errors'

interface FormTextAreaProps {
  id: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  onBlur?: () => void
  onClick?: () => void
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
      onKeyDown,
      defaultValue,
    },
    ref
  ) => {
    const { pending } = useFormStatus()
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
          <Textarea
            onKeyDown={onKeyDown}
            onClick={onClick}
            onBlur={onBlur}
            ref={ref}
            placeholder={placeholder}
            required={required}
            name={id}
            id={id}
            disabled={pending || disabled}
            className={cn(
              'resize-none ring-0 focus:ring-0 focus-visible:ring-0 outline-none shadow-sm focus-visible:ring-offset-0',
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
        </div>
        <FormErrors id="id" errors={errors} />
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'
