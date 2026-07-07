import Image from 'next/image'
import { buildImageUrl } from '@/lib/tmdb'
import { Credits } from '@/types/movie'

export function CastCrew({ credits }: { credits: Credits }) {
  const director = credits.crew.find((c) => c.job === 'Director')
  const topCast = credits.cast.slice(0, 8)

  if (topCast.length === 0 && !director) return null

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cast & Crew</h2>

      {director && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span className="font-semibold text-gray-900 dark:text-white">Director:</span> {director.name}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {topCast.map((member) => (
          <div key={member.id} className="text-center">
            <div className="relative w-full aspect-2/3 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
              <Image
                src={buildImageUrl(member.profile_path, 'w185')}
                alt={member.name}
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-2 line-clamp-1">
              {member.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
              {member.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}