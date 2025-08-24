import LatestBlogs from "../LatestBlogs/LatestBlogs";

export const RightSectionItems = () => {
  return (
    <div className="p-4 rounded-lg bg-gray-100 border-1 border-gray-200 shadow-md">
      <div className="min-h-[200px] border-b-1 border-gray-400 mb-2">
        SECTION 1
      </div>
      <div className="min-h-[200px] border-b-1 border-gray-400 mb-2">
        SECTION 2
      </div>
      <div className="min-h-[200px] mb-2">
        <LatestBlogs />
      </div>
    </div>
  );
};
