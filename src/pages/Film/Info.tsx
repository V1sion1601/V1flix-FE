import React, { useState, useEffect } from "react";
//interfaces
import { IImages, ISeries } from "../../interface";
//components
import UserFilmSetting from "./UserFilmSetting";
//others
import { account } from "../../utils/Storage";
import axios from "axios";
//lib
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
const Info: React.FC<ISeries> = ({
  id,
  images,
  description,
  title,
  type,
  view,
  total_episodes,
  status,
  alt_title,
}) => {
  const [settingMenu, setSettingMenu] = useState<boolean>(false);
  const [genersList, setGeneresList] = useState<any>([]);
  //add and remove scroll-bar
  if (settingMenu) {
    document.body.classList.add("overflow-hidden");
    window.scrollTo(0, 0);
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/film/get-geners/${id}`
      );
      setGeneresList(response.data.listFilmsGeners);
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [id]);
  const imageName = images.filter((image: IImages) => image.type === "card")[0]
    ?.name;

  const myImage = new CloudinaryImage(`/anime/card/${imageName}`, {
    cloudName: `${import.meta.env.VITE_USER_CLOUDINARY}`,
  });
  return (
    <>
      {settingMenu && (
        <UserFilmSetting
          images={images}
          title={title}
          status={status}
          id={id}
          setMenu={setSettingMenu}
        />
      )}
      <main className="flex w-full gap-x-4 bg-opacityText p-4 rounded-lg">
        <section aria-label="image" className="basis-1/5">
          <AdvancedImage cldImg={myImage} alt={`img-${id}`} />
        </section>
        <section aria-label="content" className="basis-4/5 space-y-4 h-full">
          <div className="flex justify-between">
            <h3 className="lg:text-4xl text-xl font-bold">{title}</h3>
            {account.get("username") && (
              <button
                onClick={() => setSettingMenu(true)}
                className="bg-secondColor hover:bg-secondColorBrighter p-2 rounded-md lg:text-xl text-md font-bold"
              >
                Settings
              </button>
            )}
          </div>
          <h4 className="font-extralight">{alt_title || title}</h4>

          <p className="font-light lg:text-xl text-sm w-full ">{description}</p>

          <div className="lg:text-base text-sm">
            <ul className="grid lg:grid-cols-2 lg:gap-y-2 grid-cols-1 gap-y-0.5">
              <li>
                Type:
                <span className="text-secondColor ml-3 font-bold">{type}</span>
              </li>
              <li>
                View:
                <span className="text-secondColor ml-3 font-bold">{view}</span>
              </li>
              <li>
                Episodes:
                <span className="text-secondColor ml-3 font-bold">
                  {total_episodes}
                </span>
              </li>
              <li>
                Generes:
                {genersList.map((genere: any, index: number) => (
                  <span key={index} className="text-secondColor font-bold">
                    {` ${genere.name}, `}
                  </span>
                ))}
              </li>
              <li>
                Status:
                <span className="text-secondColor ml-3 font-bold  ">
                  {status
                    ? `${status.charAt(0).toUpperCase()}${status.slice(1)}`
                    : null}
                </span>
              </li>
              {status === "ongoing" ? <li>`Status: ${status}`</li> : null}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Info;
