import { z } from 'zod'
const createBoard = z.object({
  title: z
    .string({
      required_error: 'title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, {
      message: 'title is too short',
    }),
})
