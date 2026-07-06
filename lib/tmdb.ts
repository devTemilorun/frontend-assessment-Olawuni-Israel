import { Movie, MovieDetail, TMDBResponse, Genre } from '@/types/movie'
import { Credits, VideosResponse, ReviewsResponse } from '@/types/movie'


const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN

if (!API_KEY && !ACCESS_TOKEN) {
  throw new Error(
    'TMDB_API_KEY or TMDB_ACCESS_TOKEN must be defined in environment variables.\n' +
    'Get a free API key at: https://www.themoviedb.org/signup'
  )
}

const fetchFromTMDB = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (ACCESS_TOKEN) {
    headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`
  }

  const mergedHeaders = {
    ...headers,
    ...(options?.headers as Record<string, string> || {}),
  }

  const response = await fetch(url, {
    ...options,
    headers: mergedHeaders,
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'No error body')
    throw new Error(`TMDB API error: ${response.status} ${response.statusText} - ${errorBody}`)
  }

  return response.json()
}

export const getPopularMovies = async (page: number = 1): Promise<TMDBResponse<Movie>> => {
  return fetchFromTMDB<TMDBResponse<Movie>>(`/movie/popular?page=${page}`, {
    next: { revalidate: 3600 }
  })
}

export const searchMovies = async (query: string, page: number = 1): Promise<TMDBResponse<Movie>> => {
  return fetchFromTMDB<TMDBResponse<Movie>>(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    { cache: 'no-store' }
  )
}

export const getMovieById = async (id: number): Promise<MovieDetail> => {
  return fetchFromTMDB<MovieDetail>(`/movie/${id}`, {
    next: { revalidate: 86400 } 
  })
}

export const getMoviesByGenre = async (genreId: number, page: number = 1): Promise<TMDBResponse<Movie>> => {
  return fetchFromTMDB<TMDBResponse<Movie>>(
    `/discover/movie?with_genres=${genreId}&page=${page}`,
    { next: { revalidate: 3600 } } 
  )
}

export const getGenres = async (): Promise<Genre[]> => {
  const response = await fetchFromTMDB<{ genres: Genre[] }>('/genre/movie/list', {
    next: { revalidate: 604800 } 
  })
  return response.genres
  
}


export const getMovieCredits = async (id: number): Promise<Credits> => {
  return fetchFromTMDB<Credits>(`/movie/${id}/credits`, {
    next: { revalidate: 86400 }
  })
}

export const getMovieVideos = async (id: number): Promise<VideosResponse> => {
  return fetchFromTMDB<VideosResponse>(`/movie/${id}/videos`, {
    next: { revalidate: 86400 }
  })
}

export const getSimilarMovies = async (id: number, page: number = 1): Promise<TMDBResponse<Movie>> => {
  return fetchFromTMDB<TMDBResponse<Movie>>(`/movie/${id}/similar?page=${page}`, {
    next: { revalidate: 3600 }
  })
}

export const getMovieReviews = async (id: number, page: number = 1): Promise<ReviewsResponse> => {
  return fetchFromTMDB<ReviewsResponse>(`/movie/${id}/reviews?page=${page}`, {
    next: { revalidate: 86400 }
  })
}

export { buildImageUrl } from './image-url'