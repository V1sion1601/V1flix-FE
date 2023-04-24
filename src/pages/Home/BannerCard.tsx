import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";

import PlaceHolder from "../../assets/placeholder_image.jpg";
import { slugifyString } from "../../utils/HandleString";
import { FaPlay } from "react-icons/fa";
//hook
import useCheckImage from "../../hook/useCheckImage";

const BannerCard = ({ images, id, title, description }: any) => {
  const imageName = images.filter((image: any) => image.type === "banner")[0]
    ?.name;

  const myImage = new CloudinaryImage(`/anime/banner/${imageName}`, {
    cloudName: `${import.meta.env.VITE_USER_CLOUDINARY}`,
  });
  const imgStatus = useCheckImage(myImage.createCloudinaryURL());

  return (
    <div className="lg:flex lg:flex-row-reverse lg:px-10 lg:gap-x-5 px-4 flex-none">
      {imgStatus ? (
        <AdvancedImage
          cldImg={myImage}
          className={`lg:static absolute inset-0 h-80 lg:basis-1/2 lg:w-1/2 lg:h-1/2 lg:rounded-3xl lg:shadow-black lg:shadow-sm lg:opacity-100 opacity-60`}
        />
      ) : (
        <img
          loading="lazy"
          className="h-[369px] w-[725px]"
          src={PlaceHolder}
          alt="placeholder-img"
        />
      )}

      <aside className="lg:static lg:basis-1/2 lg:gap-8 lg:w-1/2 w-full relative lg:h-auto h-80 flex flex-col justify-center items-start gap-3">
        <h1 className="lg:text-5xl text-white text-2xl font-bold capitalize truncate w-full">
          {title}
        </h1>
        <p className="lg:text-2xl text-sm lg:w-full w-3/4 lg:line-clamp-3 text-white line-clamp-2 font-light lg:text-opacity-60 text-opacity-90">
          {description}
        </p>
        <a
          href={`/watch?title=${slugifyString(title)}&ep=1`}
          className="bg-secondColor text-white hover:bg-opacity-70 lg:px-10 px-5 font-bold lg:py-4 py-2 lg:text-2xl text-base rounded-md flex justify-center items-center gap-x-3"
        >
          <FaPlay />
          PLAY NOW
        </a>
      </aside>
    </div>
  );
};

export default BannerCard;
