export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  original_language: string
}

export interface MovieDetail extends Movie {
  runtime: number | null
  genres: Genre[]
  tagline: string
  status: string
  revenue: number
  budget: number
  production_companies: ProductionCompany[]
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
}

export interface TMDBResponse<T> {
  results: T[]
  total_pages: number
  total_results: number
  page: number
}

export interface SearchParams {
  query?: string
  genre?: string
  page?: string
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface Credits {
  cast: CastMember[]
  crew: CrewMember[]
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface VideosResponse {
  results: Video[]
}

export interface Review {
  id: string
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string | null
    rating: number | null
  }
  content: string
  created_at: string
}

export interface ReviewsResponse {
  results: Review[]
  page: number
  total_pages: number
  total_results: number
}