'use server'

import { revalidatePath } from 'next/cache'

import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { createSafeAction } from '@/lib/create-safe-action'
import { createAuditLog } from '@/lib/create-audit-logs'
import { incrementAvailableCount, hasAvailableCount } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'unauthorized',
    }
  }
  const canCreate = await hasAvailableCount()
  const isPro = checkSubscription()

  if (!canCreate && !isPro) {
    return {
      error:
        'You have reached your limit of free boards, please upgrade to create more',
    }
  }

  const { title, image } = data

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|')

  console.log({
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName,
  })

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: 'Missing Fields. Failedt to create board',
    }
  }

  let board
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
    })

    if (!isPro) {
      await incrementAvailableCount()
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
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
