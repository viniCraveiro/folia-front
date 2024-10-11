import { Skeleton } from "@mui/material";
import React from "react"

const SkeletonDefault: React.FC = () => {
    return (
      <div className="flex flex-col md:flex-row gap-4 p-8">
        <div className="md:w-1/3 w-full">
          <Skeleton variant="text" className="w-full h-8 mt-4" />
          <Skeleton variant="circular" className="w-52 h-52 mt-8" />
          <Skeleton variant="text" className="w-full h-14 mt-2" />
          <Skeleton variant="text" className="w-full h-12 mt-2" />
          <Skeleton variant="text" className="w-full h-10 mt-2" />
          <Skeleton variant="text" className="w-full h-8 mt-2" />
        </div>
        <div className="md:w-1/3 w-full">
          <Skeleton variant="text" className="w-full h-8 mt-4" />
          <Skeleton variant="rectangular" className="w-full h-52 mt-4" />
          <Skeleton variant="rectangular" className="w-full h-52 mt-4" />
        </div>
        <div className="md:w-1/3 w-full">
          <Skeleton variant="text" className="w-full h-8 mt-4" />
          <div className="flex mt-6">
            <Skeleton variant="circular" className="w-20 h-16 mr-4" />
            <Skeleton variant="rectangular" className="w-full h-16" />
          </div>
          <div className="flex mt-6">
            <Skeleton variant="circular" className="w-20 h-16 mr-4" />
            <Skeleton variant="rectangular" className="w-full h-16" />
          </div>
          <div className="flex mt-6">
            <Skeleton variant="circular" className="w-20 h-16 mr-4" />
            <Skeleton variant="rectangular" className="w-full h-16" />
          </div>
          <div className="flex mt-6">
            <Skeleton variant="circular" className="w-20 h-16 mr-4" />
            <Skeleton variant="rectangular" className="w-full h-16" />
          </div>
          <div className="flex mt-6">
            <Skeleton variant="circular" className="w-20 h-16 mr-4" />
            <Skeleton variant="rectangular" className="w-full h-16" />
          </div>
        </div>
      </div>
    );
}
export default SkeletonDefault;
