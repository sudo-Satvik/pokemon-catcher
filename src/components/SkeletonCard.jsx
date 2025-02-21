const SkeletonCard = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg animate-pulse">
      <div className="h-24 bg-gray-300 rounded"></div>
      <div className="h-4 w-3/4 bg-gray-300 mt-4 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-300 mt-2 rounded"></div>
    </div>
  );
};

export default SkeletonCard;
