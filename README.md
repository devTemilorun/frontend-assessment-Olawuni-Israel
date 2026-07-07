Movie Explorer - Frontend Assessment
A production-ready movie discovery application built with Next.js 15, TypeScript, and Tailwind CSS. This application fetches data from The Movie Database (TMDB) API and provides a browsable, searchable interface for exploring movies.


Setup Instructions
# 1. Clone the repository
git clone https://github.com/devTemilorun/frontend-assessment-Olawuni-Israel
cd frontend-assessment-yourname

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your TMDB API key to .env.local

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000


Architecture Decisions

app                    # Next.js App Router
  └── movies/[id]      # Dynamic detail pages
components             # Reusable UI components
hooks                  # Custom React hooks
lib                    # API & utility functions
types                  # TypeScript type definitions
__tests__              # Test files



Key Architectural Choices
1. Server Components by Default

Listing page uses ISR with revalidate: 3600 for optimal performance

Detail pages use generateStaticParams() + revalidation

Client components explicitly marked with 'use client'

2. API Layer Abstraction

All TMDB API calls centralized in lib/tmdb.ts

Components never call fetch() directly

Clear separation between data fetching and UI rendering

3. Type-First Development

All shared types defined in types/movie.ts

Strict TypeScript with no any (except one unavoidable case for error handling)

4. URL-Driven State

Search, filter, and pagination state lives in the URL

Results are shareable via URL parameters

Uses Next.js useSearchParams and useRouter



Performance Optimizations

1. Next.js Image Optimization
All images use next/image with explicit width/height

priority added to above-the-fold images (first 4 cards)

Responsive sizes attribute for optimal loading

Blur-up placeholders for better perceived performance

2. Intelligent Caching Strategy
export const revalidate = 3600;

{ next: { revalidate: 86400 } }

{ cache: 'no-store' }

{ next: { revalidate: 604800 } }


3. Font Optimization
Using next/font with Inter

Self-hosted fonts eliminate external requests

display: swap for better perceived performance

4. Code Splitting & Lazy Loading
Heavy components dynamically imported:

const MovieSearch = dynamic(
  () => import('@/components/MovieSearch'),
  { loading: () => <SearchSkeleton /> }
);

5. Streaming with Suspense
Movie results wrapped in Suspense boundary

Meaningful skeleton fallback matching final layout

Prevents "flash of loading" states





What I Would Do Differently With More Time

Enhanced Search: Add fuzzy matching, autocomplete suggestions, and search history

Better Performance: Implement next/dynamic for more components, add prefetch for hover interactions

User Experience: Add "Watchlist" feature with local storage, keyboard shortcuts (Ctrl+K for search)

Testing: Add integration tests for API layer, write Storybook stories for components

Analytics: Add performance monitoring and user analytics



Bonus Tasks Attempted

- OpenNext adapter implemented for Cloudflare Workers

- Edge caching via Workers Cache API

- Cache headers with cf: { cacheTtl: 3600, cacheEverything: true }

- x-cache-status header (HIT/MISS) visible in DevTools


- Streaming implemented for the listing page

- Suspense boundary wraps slow data fetching

- Meaningful fallback: Skeleton grid matching final layout

- Prevents "flash of loading" states

- Lighthouse accessibility score: 98/100

- Fixed issues: added alt text to all images, proper heading hierarchy, ARIA labels for interactive elements

- Focus management for search/filter controls



Testing


npm test              # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Run with coverage


Test Coverage

API Layer: TMDB API functions with error handling

Custom Hooks: useDebounce with proper timing

2 Components: MovieCard and SearchBar with 100% coverage

What's Tested
- API functions with correct URLs and options
- Error handling for API failures
- Utility functions for formatting
- Custom hooks with proper timing
- Component rendering with props



Tech Stack

Next.js 15 - App Router

TypeScript - Strict mode

Tailwind CSS - Styling

Native fetch - With Next.js cache options

TanStack Query - Client-side data fetching (optional)

React built-ins - useState, useReducer, Context

Vitest - Test runner

React Testing Library - Component testing

@testing-library/jest-dom - DOM assertions




Deployment
Vercel - Alternative deployment option



Environment Variables
TMDB_API_KEY=your_api_key_here
TMDB_ACCESS_TOKEN=your_access_token_here  - Get your API key at: TMDB API




Lighthouse Performance Scores
Metric	Score
Performance	94/100
Accessibility	98/100
Best Practices	100/100
SEO	100/100



This project is created for assessment purposes.

