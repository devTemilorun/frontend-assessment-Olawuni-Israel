import { Review } from '@/types/movie'
import { Star } from 'lucide-react'

export function Reviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.slice(0, 5).map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 dark:text-white text-sm">
                {review.author}
              </span>
              {review.author_details.rating && (
                <span className="flex items-center gap-1 text-sm text-yellow-500">
                  <Star size={14} fill="currentColor" /> {review.author_details.rating}/10
                </span>
              )}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
              {review.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}