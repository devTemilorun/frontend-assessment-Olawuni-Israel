'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Genre } from '@/types/movie'

interface GenreFilterProps {
  genres: Genre[]
  selectedGenre: string
}

export function GenreFilter({ genres, selectedGenre }: GenreFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleGenreChange = (genreId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (genreId) {
      params.set('genre', genreId)
      params.delete('query') 
    } else {
      params.delete('genre')
    }
    params.set('page', '1') 
    
    router.push(`${window.location.pathname}?${params.toString()}`)
  }

  return (
    <select
      className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-37.5"
      value={selectedGenre}
      onChange={(e) => handleGenreChange(e.target.value)}
      aria-label="Filter by genre"
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  )
}