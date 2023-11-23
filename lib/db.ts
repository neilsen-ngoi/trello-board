import { PrismaClient } from '@prisma/client'

//hotreload does not affect global as it is exclueded
declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
