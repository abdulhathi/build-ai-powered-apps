import { PrismaClient, type Review } from '../generated/prisma'

export const reviewRepository = {
  async getReviewsByProductId(productId: number): Promise<Review[]> {
    const prisma = new PrismaClient()

    return prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    })
  },

  async getReviewsForSummary(
    productId: number,
    count: number
  ): Promise<Review[]> {
    const prisma = new PrismaClient()

    const reviews = await prisma.review.findMany({
      where: { productId },
      take: count,
      orderBy: { createdAt: 'desc' },
    })
    return reviews
  },
}
