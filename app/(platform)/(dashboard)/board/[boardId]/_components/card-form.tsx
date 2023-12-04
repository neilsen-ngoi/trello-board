'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { forwardRef } from 'react'

interface CardFormProps {
  listId: string
  enableEditing: () => void
  disableEditing: () => void
  isEditing: boolean
}
const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, disableEditing, enableEditing, isEditing }, ref) => {
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
