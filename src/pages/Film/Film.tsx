import React, { useContext } from "react";
//component
import Info from "./Info";
import TrendingCard from "./TrendingCard";
//lib
import axios from "axios";
import ReactPlayer from "react-player/youtube";
//interface
import { IEpisodes } from "../../interface";
import { handleUrl, slugifyString } from "../../utils/HandleString";
import { useQuery } from "@tanstack/react-query";
//context
import { TopTrendingContext } from "../../context/TopTrendingContext";
import TopAnimeCard from "../../components/Card/TopAnimeCard";
const Film: React.FC<any> = () => {
  let film, currentEp;
  const [titleName, epNum] = handleUrl(window.location.href.split("?")[1], [
    "title",
    "ep",
  ]);
  const { listTrending } = useContext(TopTrendingContext);
  console.log(listTrending);
  console.log("re-render film");
  //Will improve/optimize this bunch of code soon
  const { isLoading, error, data, isSuccess } = useQuery({
    queryFn: async () => {
      return await axios.get(
        `${import.meta.env.VITE_USER_URL}/series/film/${titleName}`
      );
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  if (isSuccess) {
    console.log(data);
    film = data.data.series;
    const { episodes, title } = data.data.series;
    currentEp =
      episodes.length > 0 &&
      episodes.find((episode: IEpisodes) => episode.ep_num === parseInt(epNum));
    document.title = `${title} - ${epNum}`;
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="px-8 text-white pt-5 space-y-5">
          <header>
            <h1 className="lg:text-2xl text-4xl font-bold">
              {currentEp ? `Episode: ${epNum}, ${currentEp?.title}` : null}
            </h1>
          </header>
          <main aria-label="main" className="lg:flex lg:gap-x-16">
            <section
              aria-label="details-film"
              className="basis-4/6 flex flex-col gap-y-6"
            >
              <aside aria-label="video">
                {currentEp ? (
                  //Will fix the loading
                  <>
                    <ReactPlayer
                      url={[currentEp?.source || ""]}
                      width="100%"
                      controls={true}
                    />
                  </>
                ) : (
                  <div>This episode doesn't exist</div>
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
                        href={`/watch?title=${slugifyString(titleName)}&ep=${
                          episode.ep_num
                        }`}
                      >
                        <li
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
            <section aria-label="trending" className="basis-2/6 pt-8">
              <h2 className="lg:text-3xl text-4xl mb-5 font-bold">
                Top Trending
              </h2>
              <ul className="flex gap-3 flex-col">
                {listTrending.map((trending: any, index: number) => (
                  <li key={index}>
                    <TopAnimeCard {...trending} rank={index + 1} />
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </section>
      )}
    </>
  );
};

export default Film;
