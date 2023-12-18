'use client'

import { toast } from 'sonner'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'

import { FormInput } from './form-input'
import { FormSubmit } from './form-submit'
import { Popover, PopoverClose, PopoverContent } from '../ui/popover'
import { Button } from '../ui/button'
import { FormPicker } from './form-picker'

import { PopoverTrigger } from '@radix-ui/react-popover'
import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'

interface FormPopoverProps {
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export const FormPopover = ({
  children,
  side = 'bottom',
  sideOffset = 0,
  align,
}: FormPopoverProps) => {
  const proModal = useProModal()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const router = useRouter()

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success('board created!')
      closeRef.current?.click()
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      toast.error(error)
      proModal.onOpen()
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string
    execute({ title, image })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className=" w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className=" text-sm font-medium text-center to-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            variant="ghost"
            className=" h-auto w-auto absolute top-2 right-2 to-neutral-600"
          >
            <X className=" h-4 w-4 " />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className=" space-y-4">
          <div className=" space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              errors={fieldErrors}
              id="title"
              label="Board Title"
              type="text"
            />
          </div>
          <FormSubmit className=" w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
