import { getPopularMovies, searchMovies, getMoviesByGenre } from '@/lib/tmdb'
import { MovieCard } from '@/components/MovieCard/MovieCard'
import { Pagination } from '@/components/Pagination/Pagination'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { SearchParams, TMDBResponse, Movie } from '@/types/movie'

interface MovieResultsProps {
  searchParams: SearchParams
}

export async function MovieResults({ searchParams }: MovieResultsProps) {
  const { query, genre, page = '1' } = searchParams
  const currentPage = parseInt(page) || 1

  let genreId: number | null = null
  if (genre) {
    const parsed = parseInt(genre)
    if (!isNaN(parsed) && parsed > 0) {
      genreId = parsed
    } else {
      console.warn(`Invalid genre parameter: "${genre}"`)
    }
  }

  let data: TMDBResponse<Movie>
  try {
    if (query) {
      data = await searchMovies(query, currentPage)
    } else if (genreId) {
      data = await getMoviesByGenre(genreId, currentPage)
    } else {
      data = await getPopularMovies(currentPage)
    }
  } catch (error) {
    console.error('Failed to fetch movies:', error)
    throw new Error('Failed to fetch movies', { 
      cause: error 
    })
  }

  const { results: movies, total_pages: totalPages } = data

  if (movies.length === 0) {
    return <EmptyState />
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} priority={index < 4} />
        ))}
      </div>
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={Math.min(totalPages, 500)} 
      />
    </>
  )
}