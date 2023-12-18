'use server'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { DeleteList } from './schema'
import { InputType, ReturnType } from './types'
import { ENTITY_TYPE, ACTION } from '@prisma/client'
import { createAuditLog } from '@/lib/create-audit-log'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }
  const { id, boardId } = data
  let list

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    })

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: 'failed to delete',
    }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: list }
}
export const deleteList = createSafeAction(DeleteList, handler)
