export default function MovieDetailLoading() {
  return (
    <div className="animate-pulse">
      <div className="relative w-full h-[60vh] bg-gray-200 dark:bg-gray-700" />
      <div className="container mx-auto px-4 -mt-48 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative w-48 h-72 bg-gray-300 dark:bg-gray-600 rounded-lg" />
            <div className="flex-1">
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4" />
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4" />
              <div className="flex gap-4 mb-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20" />
              </div>
              <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}