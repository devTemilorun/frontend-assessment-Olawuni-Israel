export function FilmStrip({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-6 w-full bg-[#0B0E14] ${className}`}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <pattern id="sprockets" width="32" height="24" patternUnits="userSpaceOnUse">
          <rect x="10" y="6" width="12" height="12" rx="3" className="fill-[#1C212C]" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#sprockets)" />
      </svg>
    </div>
  )
}