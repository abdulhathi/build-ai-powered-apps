import { PrismaClient } from '../generated/prisma'

export const productRepository = {
  async getProduct(productId: number) {
    const prisma = new PrismaClient()
    return prisma.product.findFirst({
      where: { id: productId },
    })
  },
}
