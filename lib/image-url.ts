export const buildImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return 'https://placehold.co/500x750?text=No+Image'
  return `https://image.tmdb.org/t/p/${size}${path}`
}