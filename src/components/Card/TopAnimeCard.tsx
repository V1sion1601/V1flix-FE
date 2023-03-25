import React from "react";
import Details from "./Details";
import { FiEye } from "react-icons/fi";
import { ISeries } from "../../../server/interface";
const TopAnimeCard: React.FC<ISeries | any> = ({
  id,
  title,
  status,
  view,
  images,
  rank,
}) => {
  return (
    <div className="flex flex-row w-full h-auto gap-3 bg-mainColor bg-opacity-50">
      <div className="basis-1/5 flex justify-center items-center">
        <span
          className={`${
            parseInt(rank) === 1
              ? "first"
              : parseInt(rank) === 2
              ? "second"
              : parseInt(rank) === 3
              ? "third"
              : "other"
          } text-7xl text-opacityText font-extrabold`}
        >
          {parseInt(rank)}
        </span>
      </div>
      <div className="basis-1/5">
        {images.length > 0 && (
          <img
            className="h-full"
            alt={title}
            src={images.filter((image: any) => image.type === "card")[0]?.name}
          />
        )}
      </div>
      <div className="flex flex-col basis-3/5  w-full  m-auto space-y-3">
        <h3 className="lg:text-base pt-2 text-lg font-semibold line-clamp-1">
          {title}
        </h3>
        <div className="flex flex-row items-center justify-between pr-5 py-0.5 mb-3 rounded-b-md">
          <Details type={"TV"} status={status} newep={8} />
        </div>
        <div className="flex flex-row gap-x-2 justify-start items-center">
          <FiEye />
          <span className="text-white">{view}</span>
        </div>
      </div>
    </div>
  );
};

export default TopAnimeCard;
