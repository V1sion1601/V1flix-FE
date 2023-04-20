import React from "react";
import { Link } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import Details from "./Details";
import { IImages, ISeries } from "../../interface";
import { slugifyString } from "../../utils/HandleString";

import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { image } from "@cloudinary/url-gen/qualifiers/source";

const Card: React.FC<ISeries | any> = ({
  id,
  title,
  images,
  type,
  total_episodes,
  status,
}) => {
  const imageName = images.filter(
    (image: IImages) => image.type === "thumbnail"
  )[0]?.name;
  console.log(imageName);
  const myImage = new CloudinaryImage(`/anime/thumb/${imageName}`, {
    cloudName: `${import.meta.env.VITE_USER_CLOUDINARY}`,
  });

  return (
    <div className="flex flex-col w-full">
      <div className="relative group">
        {images.length > 0 && (
          <>
            <a href={`/watch?title=${slugifyString(title)}&ep=1`}>
              <AdvancedImage cldImg={myImage} />
            </a>
          </>
        )}

        <div className="absolute top-1/2 lg:left-1/3 left-1/4 group-hover:translate-x-4 group-hover:duration-1000 opacity-0  group-hover:opacity-100 group-hover:cursor-pointer">
          <CiPlay1 fontSize={50} />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between bg-mainColor px-2 py-0.5 mb-3 rounded-b-md">
        <Details newep={total_episodes} type={type} status={status} />
      </div>
      <h3 className="lg:text-xl text-lg w-full line-clamp-2">{title}</h3>
    </div>
  );
};

export default Card;
