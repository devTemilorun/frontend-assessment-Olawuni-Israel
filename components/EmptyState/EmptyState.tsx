import { Search } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  message?: string
}

export function EmptyState({
  title = 'No results found',
  message = 'Try adjusting your search or filter to find what you\'re looking for.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Search className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" strokeWidth={1.5} />
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{message}</p>
    </div>
  )
}