import React from "react";
//interface
import { Trending } from "../../interface";
//components
import { BsBookmark, BsEye } from "react-icons/bs";
const TrendingCard: React.FC<Trending> = ({
  id,
  img,
  title,
  totalep = 0,
  view,
}) => {
  return (
    <div className="flex w-full gap-5 bg-mainColor mb-2 bg-opacity-70 rounded-md">
      <div className="basis-1/5">
        <img src={img} alt={`anime-${id}`} />
      </div>
      <div className="flex flex-col justify-center items-start basis-4/5 gap-y-2">
        <h3 className="text-xl font-medium">{title}</h3>
        <div className="flex flex-row gap-x-5">
          <span className="flex justify-center items-center gap-2">
            <BsBookmark />
            {totalep}
          </span>
          <span className="flex justify-center items-center gap-2">
            <BsEye />
            {view}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
