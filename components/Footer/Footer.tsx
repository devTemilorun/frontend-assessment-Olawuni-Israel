import Link from 'next/link';
import { Film } from 'lucide-react';
import { FilmStrip } from '@/components/FilmStrip/FilmStrip';

const exploreLinks = [
  { label: 'Popular', href: '/?sort=popular' },
  { label: 'Top Rated', href: '/?sort=top_rated' },
  { label: 'Now Playing', href: '/?sort=now_playing' },
  { label: 'Upcoming', href: '/?sort=upcoming' },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <FilmStrip />

      <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8 *:flex-1">
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Film size={20} className="text-white" />
            <span className="font-marquee text-2xl text-white">MOVIE EXPLORER</span>
          </div>
          <p className="text-sm text-gray-400 max-w-xs">
            Every screening, sorted. Browse, search, and discover your next favorite film.
          </p>
        </div>

        <div>
          <h4 className="font-mono-ticket text-xs uppercase tracking-widest text-white mb-3">
            Explore
          </h4>
          <ul className="space-y-2">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono-ticket text-xs uppercase tracking-widest text-white mb-3">
            Data & Source
          </h4>
          <p className="text-sm text-gray-400 mb-3">
            Movie data provided by The Movie Database (TMDB).
          </p>
        </div>

      </div>
    </div>
    </footer>
  );
}