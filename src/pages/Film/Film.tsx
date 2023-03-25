import React, { useState, useEffect } from "react";
//component
import Info from "./Info";
import TrendingCard from "./TrendingCard";
//lib
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
//data
import { Trending } from "../../interface";
import { listTrending } from "./data";
//interface
import { IEpisodes, ISeries } from "../../../server/interface";

const Film: React.FC<any> = () => {
  const { id, epNum = "1" } = useParams();
  const [film, setFilm] = useState<ISeries | any>(() => {
    console.log("state");
    return {
      id: 0,
      type: "TV",
      description: "",
      view: 0,
      total_episodes: 0,
      episodes: [],
      images: [],
      title: "",
    };
  });
  const [currentEp, setCurrentEp] = useState<IEpisodes>();
  console.log("re-render film");
  //Will improve/optimize this bunch of code soon
  useEffect(() => {
    let controller: AbortController | null = new AbortController();

    const fetchData = async () => {
      //getting api (problem for each episode is clicked)
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/series/film/${id}`,
        {
          signal: controller?.signal,
        }
      );
      setFilm(() => response.data.series);
      //getting current ep
      response.data.series.episodes.length > 0 &&
        setCurrentEp(
          response.data.series.episodes.find((episode: IEpisodes) => {
            return episode.ep_num === parseInt(epNum);
          })
        );
      document.title = `${response.data.series.title} - ${epNum}`;
    };
    fetchData();
    return () => controller?.abort();
  }, [id, epNum]);

  return (
    <section className="px-8 text-white pt-5 space-y-5">
      <header>
        <h1 className="lg:text-2xl text-4xl font-bold">
          {currentEp ? `Episode: ${epNum}, ${currentEp?.title}` : null}
        </h1>
      </header>
      <main aria-label="main" className="lg:flex lg:gap-x-4">
        <section
          aria-label="details-film"
          className="basis-4/5 flex flex-col gap-y-6"
        >
          <aside aria-label="video">
            {film.episodes.length > 0 ? (
              <>
                <ReactPlayer
                  url={[currentEp?.source || ""]}
                  width="100%"
                  controls={true}
                />
                {console.log(currentEp)}
              </>
            ) : (
              <div>Coming soon</div>
            )}
          </aside>

          <aside aria-label="episodes">
            <h2 className="lg:text-2xl text-4xl mb-5">Episodes</h2>
            <ul className="flex lg:gap-x-5 gap-x-3 gap-y-3 " role="list">
              {film.episodes.length > 0 ? (
                film.episodes.map((episode: IEpisodes, index: number) => (
                  <a
                    key={episode.id}
                    className="rounded-md "
                    href={`/watch/${id}/ep/${episode.ep_num}`}
                  >
                    <li
                      key={episode.id}
                      className={`${
                        episode.ep_num === parseInt(epNum)
                          ? "bg-secondColor"
                          : "bg-mainColor"
                      } py-3 px-4 even:bg-opacity-40 hover:cursor-pointer hover:bg-secondColor rounded-md `}
                    >
                      {episode.ep_num}
                    </li>
                  </a>
                ))
              ) : (
                <div>Coming soon</div>
              )}
            </ul>
          </aside>
          <aside className="w-full" aria-label="info-film">
            <Info {...film} />
          </aside>
        </section>
        <section aria-label="trending" className="basis-1/5 pt-8">
          <h2 className="lg:text-3xl text-4xl mb-5 font-bold">Top Trending</h2>
          <ul className="flex gap-3 flex-col">
            {listTrending.map((trending: Trending, index: number) => (
              <li key={index}>
                <TrendingCard {...trending} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </section>
  );
};

export default Film;
