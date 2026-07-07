'use client'

import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-red-900/20 rounded-lg p-8 max-w-md w-full border border-red-800/30">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" strokeWidth={1.5} />
        <h3 className="text-lg font-semibold text-white mb-2">Error</h3>
        <p className="text-gray-400 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}