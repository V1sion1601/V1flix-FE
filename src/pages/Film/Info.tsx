import React from "react";
import { IImages, ISeries } from "../../../server/interface";

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
  return (
    <main className="flex lg:w-5/6 w-full gap-x-4 bg-opacityText p-4 rounded-lg">
      <section aria-label="image" className="basis-1/5">
        <img
          src={
            images.filter((image: IImages) => image.type === "thumbnail")[0]
              ?.name
          }
          alt={`img-${id}`}
        />
      </section>
      <section aria-label="content" className="basis-4/5 space-y-4 h-full">
        <h3 className="lg:text-4xl text-xl font-bold">{title}</h3>
        <h4 className="font-extralight">{alt_title || title}</h4>

        <p className="font-light lg:text-xl text-sm w-full lg:line-clamp-5">
          {description}
        </p>

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
  );
};

export default Info;
