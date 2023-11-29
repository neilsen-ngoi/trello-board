'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './types'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/create-safe-action'
import { CreateBoard } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId,orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'unauthorized',
    }
  }
  const { title,image } = data

  const [
    imageId,
    imageThumbUrlm,
    imageFullUrl,
    imgaeLinkHtml,
    imageUserName
  ] =image.split("|")

  let board
  try {
    board = await db.board.create({
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to create',
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}
export const createBoard = createSafeAction(CreateBoard, handler)
