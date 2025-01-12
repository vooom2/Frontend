const DashboardSkeleton = () => {
  return (
    <div className="container mx-auto p-2 lg:p-6 space-y-6">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow animate-pulse">
            <div className="flex justify-between items-start">
              <div className="space-y-3 w-full">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Table Card Skeleton */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {/* Table Header Skeleton */}
                <div className="grid grid-cols-5 gap-4 pb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
                {/* Table Rows Skeleton */}
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4">
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className="h-4 bg-gray-200 rounded"
                        style={{ width: j === 1 ? "100%" : "80%" }}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Circular Progress Skeleton */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-center h-full">
            <div className="h-36 w-36 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
