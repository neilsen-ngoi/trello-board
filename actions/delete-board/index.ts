'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { DeleteBoard } from './schema'
import { InputType, ReturnType } from './types'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { ENTITY_TYPE, ACTION } from '@prisma/client'
import { createSafeAction } from '@/lib/create-safe-action'
import { createAuditLog } from '@/lib/create-audit-logs'
import { decreaseAvailableCount } from '@/lib/org-limit'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }
  const { id } = data
  let board
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    })

    await decreaseAvailableCount()

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: 'failed to delete',
    }
  }
  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)
}
export const deleteBoard = createSafeAction(DeleteBoard, handler)
