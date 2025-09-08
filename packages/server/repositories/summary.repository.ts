import dayjs from 'dayjs'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()
export const summaryRepository = {
  async upsertSummary(productId: number, content: string) {
    const now = new Date()
    const expiresAt = dayjs().add(7, 'day').toDate()
    const summary = { content, expiresAt, generatedAt: now, productId }

    await prisma.summary.upsert({
      where: { productId },
      create: summary,
      update: summary,
    })
  },

  async getSummary(productId: number): Promise<string | null> {
    const summary = await prisma.summary.findFirst({
      where: {
        AND: [{ productId }, { expiresAt: { gt: new Date() } }],
      },
    })
    return summary ? summary.content : null
  },
}
