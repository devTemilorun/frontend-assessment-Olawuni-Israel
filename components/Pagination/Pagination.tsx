'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreHorizontal 
} from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`${window.location.pathname}?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  const pages = []
  const maxVisible = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let endPage = Math.min(totalPages, startPage + maxVisible - 1)

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <nav className="flex justify-center items-center gap-1.5 mt-8" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 
                   hover:bg-gray-100 dark:hover:bg-gray-800 
                   disabled:opacity-40 disabled:cursor-not-allowed 
                   transition-all duration-200 hover:scale-105
                   text-gray-600 dark:text-gray-400"
        aria-label="First page"
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 
                   hover:bg-gray-100 dark:hover:bg-gray-800 
                   disabled:opacity-40 disabled:cursor-not-allowed 
                   transition-all duration-200 hover:scale-105
                   text-gray-600 dark:text-gray-400"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1 mx-1">
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`min-w-10 h-10 px-3 rounded-lg font-medium text-sm
                         transition-all duration-200 hover:scale-105
                         ${currentPage === 1 
                           ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 dark:shadow-blue-600/30' 
                           : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                         }`}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-1 text-gray-400 dark:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            )}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`min-w-10 h-10 px-3 rounded-lg font-medium text-sm
                       transition-all duration-200 hover:scale-105
                       ${currentPage === page 
                         ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 dark:shadow-blue-600/30' 
                         : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                       }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-1 text-gray-400 dark:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`min-w-10 h-10 px-3 rounded-lg font-medium text-sm
                         transition-all duration-200 hover:scale-105
                         ${currentPage === totalPages 
                           ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 dark:shadow-blue-600/30' 
                           : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                         }`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 
                   hover:bg-gray-100 dark:hover:bg-gray-800 
                   disabled:opacity-40 disabled:cursor-not-allowed 
                   transition-all duration-200 hover:scale-105
                   text-gray-600 dark:text-gray-400"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 
                   hover:bg-gray-100 dark:hover:bg-gray-800 
                   disabled:opacity-40 disabled:cursor-not-allowed 
                   transition-all duration-200 hover:scale-105
                   text-gray-600 dark:text-gray-400"
        aria-label="Last page"
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </nav>
  )
}