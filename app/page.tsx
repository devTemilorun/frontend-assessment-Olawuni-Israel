import { Suspense } from 'react'
import Image from 'next/image'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { SkeletonCard } from '@/components/Skeleton/SkeletonCard'
import { SearchParams, Genre } from '@/types/movie'
import { GenreFilter } from '@/components/GenreFilter/GenreFilter'
import { FilmStrip } from '@/components/FilmStrip/FilmStrip'
import { getGenres, getPopularMovies, buildImageUrl } from '@/lib/tmdb'
import { MovieResults } from './MovieResults'
import { Star } from 'lucide-react'

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams

  let genres: Genre[] = []
  try {
    genres = await getGenres()
  } catch (error) {
    console.error('Failed to fetch genres:', error)
  }

  let featured = null
  try {
    const popular = await getPopularMovies(1)
    featured = popular.results[0] ?? null
  } catch (error) {
    console.error('Failed to fetch featured movie:', error)
  }

  return (
    <div className="bg-[#0B0E14] min-h-screen">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-120 w-full overflow-hidden">
        {featured?.backdrop_path && (
          <Image
            src={buildImageUrl(featured.backdrop_path, 'original')}
            alt=""
            fill
            priority
            className="object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #0B0E14 10%, rgba(11,14,20,0.55) 55%, rgba(11,14,20,0.85) 100%)',
          }}
        />

        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-14">
          {featured && (
            <div
              className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full w-fit"
              style={{ backgroundColor: 'rgba(232,179,61,0.15)', border: '1px solid #E8B33D' }}
            >
              <Star size={12} fill="#E8B33D" className="text-[#E8B33D]" />
              <span className="font-mono-ticket text-xs uppercase tracking-widest text-white">
                Now Showing · {featured.vote_average.toFixed(1)} rating
              </span>
            </div>
          )}

          <h1 className="font-marquee text-6xl md:text-8xl leading-[0.9] mb-3 text-white">
            {featured ? featured.title.toUpperCase() : 'MOVIE EXPLORER'}
          </h1>

          {featured?.overview && (
            <p className="max-w-xl text-sm md:text-base mb-8 line-clamp-2 text-gray-400">
              {featured.overview}
            </p>
          )}

          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>

      <FilmStrip />

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="font-marquee text-3xl text-white">
            BROWSE THE REEL
          </h2>
          <GenreFilter genres={genres} selectedGenre={params?.genre || ''} />
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          }
        >
          <MovieResults searchParams={params} />
        </Suspense>
      </div>
    </div>
  )
}