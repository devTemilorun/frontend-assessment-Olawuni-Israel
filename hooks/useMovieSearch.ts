import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../lib/tmdb'

export function useMovieSearch(query: string, page: number = 1) {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, 
  })
}