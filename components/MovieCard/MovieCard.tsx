'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Movie, Genre } from '@/types/movie'
import { buildImageUrl } from '@/lib/image-url'
import { Star, Users, Globe } from 'lucide-react'

interface MovieCardProps {
  movie: Movie
  priority?: boolean
  genres?: Genre[]
}

function formatVoteCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return `${count}`
}

export function MovieCard({ movie, priority = false, genres = [] }: MovieCardProps) {
  const posterUrl = buildImageUrl(movie.poster_path)
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'
  const voteCount = movie.vote_count ? formatVoteCount(movie.vote_count) : '0'
  const language = movie.original_language?.toUpperCase()

  const cardGenres = genres.length > 0
    ? movie.genre_ids
        ?.map((id) => genres.find((g) => g.id === id)?.name)
        .filter((name): name is string => Boolean(name))
        .slice(0, 2)
    : []

  return (
    <Link href={`/movies/${movie.id}`} className="group block">
      <div className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-[#151922]">
        <div className="relative aspect-2/3 w-full overflow-hidden">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized={posterUrl.includes('placehold.co')}
          />

          <div className="absolute top-2 right-2 flex items-center gap-1 pl-2 pr-2.5 py-1 rounded bg-[#0B0E14] border-l-2 border-dashed border-[#E8B33D]">
            <Star size={12} className="text-[#E8B33D]" fill="#E8B33D" />
            <span className="font-mono-ticket text-xs font-semibold text-white">
              {rating}
            </span>
          </div>

          {language && (
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono-ticket uppercase bg-[#0B0E14] text-gray-400">
              <Globe size={10} />
              {language}
            </div>
          )}

          {movie.overview && (
            <div
              className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              style={{ background: 'linear-gradient(to top, #0B0E14 60%, transparent)' }}
            >
              <p className="text-xl line-clamp-4 text-gray-400">
                {movie.overview}
              </p>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-1 text-white">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-sm mb-2 text-gray-400">
            <span className="font-mono-ticket">{releaseYear}</span>
            <span className="flex items-center gap-1 font-mono-ticket">
              <Users size={12} />
              {voteCount}
            </span>
          </div>

          {cardGenres && cardGenres.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {cardGenres.map((name) => (
                <span
                  key={name}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1C212C] text-[#E8B33D]"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}