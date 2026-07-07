'use client'

import { useState } from 'react'
import { Play, X } from 'lucide-react'
import { Video } from '@/types/movie'

export function Trailer({ videos }: { videos: Video[] }) {
  const [open, setOpen] = useState(false)

  const trailer =
    videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) ??
    videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer')

  if (!trailer) return null

  return (
    <div className="mt-4">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Play size={16} /> Watch Trailer
        </button>
      ) : (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5"
            aria-label="Close trailer"
          >
            <X size={16} />
          </button>
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  )
}