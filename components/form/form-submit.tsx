'use client'
import { Button } from '../ui/button'
import { FormStatus, useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary'
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus()
  return (
    <div>
      <Button
        disabled={pending || disabled}
        type="submit"
        variant={variant}
        size="sm"
        className={cn(className)}
      >
        {children}
      </Button>
    </div>
  )
}
