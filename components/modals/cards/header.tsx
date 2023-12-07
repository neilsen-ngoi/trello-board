'use client'

import { CardWithList } from '@/types'
import { Layout } from 'lucide-react'
import { FormInput } from '@/components/form/form-input'
import { useState } from 'react'

interface HeaderProps {
  data?: CardWithList
}
const Header = ({ data }: HeaderProps) => {
  const [title, setTitle] = useState(data?.title)
  return (
    <div className=" flex item-start gap-x-3 mb-6 w-full">
      <Layout className=" m-5 h-5 w-5 mt-1 text-neutral-700" />
      <div className=" w-full">
        <form>
          <FormInput
            id="title"
            defaultValue={title}
            className=" font-semibold text-xl px1 to-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
      </div>
    </div>
  )
}

export default Header
