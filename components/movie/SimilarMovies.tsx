import Link from 'next/link'
import Image from 'next/image'
import { buildImageUrl } from '@/lib/tmdb'
import { Movie } from '@/types/movie'

export function SimilarMovies({ movies }: { movies: Movie[] }) {
  if (movies.length === 0) return null

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Similar Movies</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {movies.slice(0, 10).map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="shrink-0 w-32 group"
          >
            <div className="relative w-32 h-48 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
              <Image
                src={buildImageUrl(movie.poster_path, 'w185')}
                alt={movie.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="128px"
              />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-2 line-clamp-2">
              {movie.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}