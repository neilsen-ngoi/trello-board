'use client'

import { Card } from '@prisma/client'

interface CardItemProps {
  index: number
  data: Card
}
const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <div className=" truncate border-2 border-transparent hover:border-black py-2 px-3 bg-white rounded-md shadow-sm">
      CardItem
    </div>
  )
}

export default CardItem
