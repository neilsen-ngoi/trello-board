import z from 'zod'

export const CopyCard = z.object({
  id: z.string(),
  boardId: z.string(),
  listId: z.string(),
  description: z.string(),
})
