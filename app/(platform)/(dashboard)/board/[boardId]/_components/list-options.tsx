'use client'

import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { List } from '@prisma/client'
import { MoreHorizontal, X } from 'lucide-react'

interface ListOptionsProps {
  data: List
  onAddCard: () => void
}
const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className=" h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className=" h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" px-0 pt-3 pb-3" side="bottom" align="start">
        <div className=" font-medium text-sm text-center to-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute h-auto w-auto p-2 top-2 right-2 to-neutral-600"
            variant="ghost"
          >
            <X className=" h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className=" rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card
        </Button>
        <form>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className=" rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy List
          </FormSubmit>
        </form>
        <Separator />
        <form>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className=" rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete List
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default ListOptions
