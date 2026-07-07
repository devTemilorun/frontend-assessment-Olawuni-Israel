import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getPopularMovies,
  searchMovies,
  getMovieById,
  getMoviesByGenre,
  getGenres,
  buildImageUrl,
} from '@/lib/tmdb'

const mockFetch = vi.fn()
global.fetch = mockFetch

process.env.TMDB_API_KEY = 'test_api_key_12345'

describe('TMDB API Library', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('buildImageUrl', () => {
    it('should return placeholder when path is null', () => {
      const result = buildImageUrl(null)
      expect(result).toBe('https://placehold.co/500x750?text=No+Image')
    })

    it('should return full image URL when path is provided', () => {
      const result = buildImageUrl('/test.jpg')
      expect(result).toBe('https://image.tmdb.org/t/p/w500/test.jpg')
    })

    it('should use custom size when provided', () => {
      const result = buildImageUrl('/test.jpg', 'original')
      expect(result).toBe('https://image.tmdb.org/t/p/original/test.jpg')
    })
  })

  describe('getPopularMovies', () => {
    it('should fetch popular movies with correct URL', async () => {
      const mockResponse = {
        results: [{ id: 1, title: 'Test Movie' }],
        total_pages: 10,
        total_results: 100,
        page: 1,
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getPopularMovies(1)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/movie/popular?page=1'),
        expect.objectContaining({
          next: { revalidate: 3600 },
        })
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => 'Movie not found',
      })

      await expect(getPopularMovies(1)).rejects.toThrow('TMDB API error: 404 Not Found')
    })
  })

  describe('searchMovies', () => {
    it('should search movies with query parameter', async () => {
      const mockResponse = {
        results: [{ id: 2, title: 'Search Result' }],
        total_pages: 5,
        total_results: 50,
        page: 1,
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await searchMovies('test', 1)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/search/movie?query=test&page=1'),
        expect.objectContaining({
          cache: 'no-store',
        })
      )
      expect(result).toEqual(mockResponse)
    })

    it('should encode query parameter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [], total_pages: 0, total_results: 0, page: 1 }),
      })

      await searchMovies('test movie', 1)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('query=test%20movie'),
        expect.any(Object)
      )
    })
  })

  describe('getMovieById', () => {
    it('should fetch movie details by ID', async () => {
      const mockMovie = {
        id: 123,
        title: 'Test Movie',
        overview: 'Test overview',
        runtime: 120,
        genres: [{ id: 1, name: 'Action' }],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockMovie,
      })

      const result = await getMovieById(123)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/movie/123'),
        expect.objectContaining({
          next: { revalidate: 86400 },
        })
      )
      expect(result).toEqual(mockMovie)
    })
  })

  describe('getMoviesByGenre', () => {
    it('should fetch movies by genre ID', async () => {
      const mockResponse = {
        results: [{ id: 3, title: 'Genre Movie' }],
        total_pages: 3,
        total_results: 30,
        page: 1,
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getMoviesByGenre(28, 1)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/discover/movie?with_genres=28&page=1'),
        expect.objectContaining({
          next: { revalidate: 3600 },
        })
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getGenres', () => {
    it('should fetch list of genres', async () => {
      const mockGenres = {
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGenres,
      })

      const result = await getGenres()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/genre/movie/list'),
        expect.objectContaining({
          next: { revalidate: 604800 },
        })
      )
      expect(result).toEqual(mockGenres.genres)
    })
  })
})