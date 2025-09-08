import { LLMClient } from '../client/llmclient'
import type { Review, Summary } from '../generated/prisma'
import { reviewRepository } from '../repositories/review.repository'
import reviewPromptTemplate from '../prompt/reviewSummarizer.txt'
import { summaryRepository } from '../repositories/summary.repository'

export const reviewService = {
  async getReviewsByProductId(productId: number): Promise<Review[]> {
    return await reviewRepository.getReviewsByProductId(productId)
  },

  async getReviewsForSummary(
    productId: number,
    count: number
  ): Promise<string> {
    const summary = await summaryRepository.getSummary(productId)
    if (summary) return summary

    const reivews = await reviewRepository.getReviewsForSummary(
      productId,
      count
    )
    const combinedReview = reivews
      .map((review) => review.content)
      .join('\n\n')
      .toString()

    const prompt = reviewPromptTemplate.replace(
      '{{combinedReview}}',
      combinedReview
    )

    // const response = await LLMClient.generateLLMResponse({
    //   prompt,
    // })

    const message = await LLMClient.generateOllamaText(prompt)

    await summaryRepository.upsertSummary(productId, message)

    return message
  },
}
