import type { Request, Response } from 'express'
import { reviewService } from '../services/review.service'
import { productService } from '../services/product.service'

export const reviewsController = {
  async getReviewsByProductId(req: Request, res: Response) {
    const productId = Number(req.params.id)
    if (isNaN(productId))
      res.status(400).json({ message: 'Invalid product id.' })

    const product = await productService.getProduct(productId)

    if (!product) res.status(404).json({ message: 'Product does not exist' })

    const reviews = await reviewService.getReviewsByProductId(productId)

    res.json(reviews)
  },

  async getSummaryForReviews(req: Request, res: Response) {
    const productId = Number(req.params.id)
    const count = Number(req.params.count)
    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid product id.' })
      return
    }

    const product = await productService.getProduct(productId)
    if (!product) {
      res.status(404).json({ error: 'Product does not exist' })
      return
    }

    const reviews = await reviewService.getReviewsByProductId(productId)
    if (!reviews.length) {
      res.status(404).json({ error: 'Reviews do not exist for this product' })
      return
    }

    const summary = await reviewService.getReviewsForSummary(productId, count)

    res.send(summary)
  },
}
