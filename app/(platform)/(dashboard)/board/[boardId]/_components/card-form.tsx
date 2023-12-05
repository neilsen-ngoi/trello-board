'use client'

import { ElementRef, forwardRef, KeyboardEvent, KeyboardEventHandler, useRef } from 'react'
import { Plus, X } from 'lucide-react'

import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useAction } from '@/hooks/use-action'
import { createCard } from '@/actions/create-card'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface CardFormProps {
  listId: string
  enableEditing: () => void
  disableEditing: () => void
  isEditing: boolean
}
const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, disableEditing, enableEditing, isEditing }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null)
    const { execute, fieldErrors } = useAction(createCard)
    
    const onKeyDown = (e:KeyboardEvent) => {
      if(e.key === "Escape") {
        disableEditing()
      }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener("keydown", onKeyDown)
    const onTextareakeyDown: KeyboardEventHandler<HTMLAreaElement> = (e) => {
      if(e.key)
    }

    if (isEditing) {
      return (
        <form className=" m-1 py-0.5 space-y-4">
          <FormTextarea
            id="title"
            onKeyDown={() => {}}
            ref={ref}
            placeholder="Enter a title for this card"
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className=" flex items-center gap-x-1">
            <FormSubmit>Add Card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className=" pt-2 px-2">
        <Button
          onClick={enableEditing}
          size="sm"
          variant="ghost"
          className=" text-sm h-auto px-2 py-1.5 w-full justify-start text-muted-foreground"
        >
          <Plus className=" h-4 w-4 mr-2" />
          Add a Card
        </Button>
      </div>
    )
  }
)

CardForm.displayName = 'CardForm'
export default CardForm
