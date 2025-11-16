import React from 'react';

// Basic Skeleton Component
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Card Skeleton
const CardSkeleton = () => (
  <div className="border rounded-lg p-4">
    <Skeleton className="h-40 w-full mb-3" />
    <Skeleton className="h-5 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-2" />
    <Skeleton className="h-4 w-full" />
  </div>
);

// Profile Skeleton
const ProfileSkeleton = () => (
  <div className="border rounded-lg p-4">
    <div className="flex items-center gap-3 mb-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div>
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

// List Skeleton
const ListSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4, 5].map((item) => (
      <div key={item} className="flex items-center gap-3 p-3 border rounded">
        <Skeleton className="h-10 w-10 rounded" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    ))}
  </div>
);

// Main UI Component
const SkeletonUI = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Cards Grid */}
        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <ProfileSkeleton />
        </div>

        {/* List Section */}
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <ListSkeleton />
        </div>

      </div>
    </div>
  );
};

export default SkeletonUI;