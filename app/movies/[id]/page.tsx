import { getMovieById, getMovieCredits, getMovieVideos, getSimilarMovies, getMovieReviews, buildImageUrl } from '@/lib/tmdb'
import Image from 'next/image'
import Link from 'next/link'
import { CastCrew } from '@/components/movie/CastCrew'
import { Trailer } from '@/components/movie/Trailer'
import { SimilarMovies } from '@/components/movie/SimilarMovies'
import { Reviews } from '@/components/movie/Reviews'
import { Metadata } from 'next'
import { Calendar, Star, Timer, User } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const movie = await getMovieById(parseInt(id))
    const posterUrl = buildImageUrl(movie.poster_path, 'w500')

    return {
      title: `${movie.title} | Movie Explorer`,
      description: movie.overview || `Watch ${movie.title} - Movie details and information`,
      openGraph: {
        title: movie.title,
        description: movie.overview || `Watch ${movie.title} - Movie details and information`,
        images: [posterUrl],
      },
    }
  } catch {
    return {
      title: 'Movie Not Found',
      description: 'The requested movie could not be found',
    }
  }
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params
  const movieId = parseInt(id)

  const [movie, credits, videos, similar, reviews] = await Promise.all([
    getMovieById(movieId),
    getMovieCredits(movieId),
    getMovieVideos(movieId),
    getSimilarMovies(movieId),
    getMovieReviews(movieId),
  ])

  const backdropUrl = buildImageUrl(movie.backdrop_path, 'original')
  const posterUrl = buildImageUrl(movie.poster_path, 'w500')

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'

  return (
    <>
      <div className="relative w-full h-[60vh] min-h-112.5 overflow-hidden">
        {movie.backdrop_path && (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#0B0E14] via-[#0B0E14]/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0B0E14]/70 to-transparent" />
      </div>

      <div className="bg-[#141824] -mt-1 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              {' / '}
              <span className="text-white font-medium">{movie.title}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative w-48 h-72 shrink-0 mx-auto md:mx-0 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="text-gray-400 italic mb-4 text-lg">
                    {movie.tagline}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {releaseYear}
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer size={12} /> {runtime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} /> {rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={12} /> {movie.vote_count}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {movie.overview || 'No overview available.'}
                </p>

                {movie.production_companies.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-300 mb-2">
                      Production Companies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.production_companies.map((company) => (
                        <span
                          key={company.id}
                          className="px-2 py-1 bg-[#1C212C] border border-[#262B36] text-gray-300 rounded text-sm"
                        >
                          {company.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {videos.results.length > 0 && (
                  <Trailer videos={videos.results} />
                )}
              </div>
            </div>

            {credits.cast.length > 0 && (
              <div className="mt-8">
                <CastCrew credits={credits} />
              </div>
            )}

            {similar.results.length > 0 && (
              <div className="mt-8">
                <SimilarMovies movies={similar.results} />
              </div>
            )}

            {reviews.results.length > 0 && (
              <div className="mt-8">
                <Reviews reviews={reviews.results} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}