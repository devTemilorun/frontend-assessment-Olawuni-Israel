'use client'

import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage'

export default function MovieDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorMessage 
        message="Failed to load movie details. Please try again." 
        onRetry={reset}
      />
    </div>
  )
}