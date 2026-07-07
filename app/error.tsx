'use client'

import { useEffect } from 'react'
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorMessage 
        message="Failed to load movies. Please try again." 
        onRetry={reset}
      />
    </div>
  )
}