import { Plus, X } from 'lucide-react'
import ListWrapper from './list-wrapper'
import { ElementRef, useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { FormInput } from '@/components/form/form-input'
import { useParams, useRouter } from 'next/navigation'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { createList } from '@/actions/create-list'
import { toast } from 'sonner'
import { error } from 'console'

const ListForm = () => {
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const params = useParams()
  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List"${data.title}" created`)
      disableEditing()
      router.refresh()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string
    execute({ title, boardId })
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          action={onSubmit}
          className=" w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className=" text-sm hover:bsorder-input focus:border-input transition px-2 py-1 font-medium border-transparent"
            placeholder="Enter list title"
          />
          <input hidden value={params.boardId} name="boardId" id="" />
          <div className=" flex items-center gap-x-1">
            <FormSubmit>Add List</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className=" h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className=" w-full rounded-md bg-white/80 hover:bg-white/50 transition
      p-3 flex items-center font-medium text-sm"
      >
        <Plus className=" h-4 mr-2 w-4" />
        Add a list
      </button>
    </ListWrapper>
  )
}

export default ListForm
