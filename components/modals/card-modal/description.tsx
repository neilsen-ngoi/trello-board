'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import { off } from 'process'
import { ElementRef, KeyboardEvent, useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface DescriptionProps {
  data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {
  //functionality for adding and editing description
  const [isEditing, setIsEditing] = useState(false)
  const textareaRef = useRef<ElementRef<'textarea'>>(null)
  const formRef = useRef<ElementRef<'form'>>(null)
  const queryClient = useQueryClient()
  const params = useParams()
  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  return (
    <div className=" flex items-start gap-x-3 w-full">
      <AlignLeft className=" h-5 w-5 mt-0.5 text-neutral-700" />
      <div className=" w-full">
        <p className=" font-semibold text-neutral-700 mb-2">Description</p>
      </div>
      <div
        role="button"
        className=" min-h-[78px] px-3.5 bg-neutral-200 text-sm font-medium py-3  rounded-md"
      >
        {data.description || 'add a more detailed description'}
      </div>
      {data.description}
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className=" flex item-start gap-x-3 w-full">
      <Skeleton className=" h-6 w-6 bg-neutral-200" />
      <div className=" w-full">
        <Skeleton className=" mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  )
}
