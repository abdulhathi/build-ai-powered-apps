import express from 'express'
import type { Request, Response } from 'express'
import { chatController } from './controllers/chat.controller'
import { reviewsController } from './controllers/review.controller'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Hi Hello')
})

router.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hi Hello' })
})

router.post('/api/chat', chatController.sendMessage)

router.get('/api/products/:id/reviews', reviewsController.getReviewsByProductId)

router.get(
  '/api/products/:id/:count/reviews/summarize',
  reviewsController.getSummaryForReviews
)

export default router
