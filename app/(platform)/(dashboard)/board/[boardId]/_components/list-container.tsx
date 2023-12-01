'use client'
import { ListWithCards } from '@/types'
import ListForm from './list-form'
import { useEffect, useState } from 'react'
import ListItem from './list-item'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)
  // source of truth to modify in the front before sending to the db

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  return (
    <ol className=" flex gap-x-3 h-full">
      {orderedData.map((data, index) => {
        return <ListItem key={data.id} index={index} data={data} />
      })}
      <ListForm />
      <div className=" flex-shrink-0 w-1" />
    </ol>
  )
}

export default ListContainer
