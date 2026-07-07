'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import { Search } from 'lucide-react'

interface SearchBarProps {
  placeholder?: string
}

export function SearchBar({ placeholder = 'Search movies...' }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('query') || ''

  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const debouncedSearch = useDebounce(searchTerm, 300)

  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      if (debouncedSearch === initialQuery) {
        return
      }
    }

    const currentQuery = searchParams.get('query') || ''
    if (debouncedSearch === currentQuery) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())

    if (debouncedSearch) {
      params.set('query', debouncedSearch)
      params.delete('genre')
    } else {
      params.delete('query')
    }
    params.set('page', '1')

    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.push(newUrl)
  }, [debouncedSearch])

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 pl-10 pr-4 text-white bg-[#151922] border border-[#262B36] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8B33D] focus:border-transparent placeholder-gray-500"
        aria-label="Search movies"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" strokeWidth={2} />
    </div>
  )
}