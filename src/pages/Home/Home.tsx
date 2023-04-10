import { useState, useEffect } from "react";
//lib
import axios from "axios";
import { Link } from "react-router-dom";
//Interface
import { ISeries } from "../../interface";
//Components
import Card from "../../components/Card/Card";
import TopAnimeCard from "../../components/Card/TopAnimeCard";
import { FaPlay } from "react-icons/fa";
//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Home: React.FC = () => {
  const [series, setSeries] = useState<ISeries[]>([]);
  useEffect(() => {
    let controller: AbortController | null = new AbortController();
    const fetchData = async () => {
      const responseSeries = await axios.get(
        `${import.meta.env.VITE_USER_URL}/series`,
        {
          signal: controller?.signal,
        }
      );
      setSeries(responseSeries.data.series);

      controller = null;
    };
    fetchData();
    return () => controller?.abort();
  }, []);

  return (
    <>
      <section aria-label="banner" className="lg:h-auto h-80">
        <Swiper
          pagination={true}
          modules={[Pagination]}
          slidesPerView={1}
          className="h-full w-full mySwiper"
        >
          {/* //Will fix soon */}
          {series.map((banner: ISeries) => (
            <SwiperSlide key={banner.id}>
              <div className="lg:flex lg:flex-row-reverse lg:px-10 lg:gap-x-5 px-4 flex-none">
                {banner.images.length > 0 && (
                  <img
                    src={
                      banner.images.filter(
                        (image) => image.type === "banner"
                      )[0]?.name
                    }
                    className={`lg:static absolute inset-0 h-80 lg:basis-1/2 lg:w-1/2 lg:h-1/2 lg:rounded-3xl lg:shadow-black lg:shadow-sm lg:opacity-100 opacity-60`}
                  />
                )}

                <aside className="lg:static lg:basis-1/2 lg:gap-8 lg:w-1/2 w-full relative lg:h-auto h-80 flex flex-col justify-center items-start gap-3">
                  <h1 className="lg:text-5xl text-white text-2xl font-bold capitalize truncate w-full">
                    {banner.title}
                  </h1>
                  <p className="lg:text-2xl text-sm lg:w-full w-3/4 lg:line-clamp-3 text-white line-clamp-2 font-light lg:text-opacity-60 text-opacity-90">
                    {banner.description}
                  </p>
                  <a
                    href={`/watch/${banner.title.toLowerCase()}/ep/1`}
                    className="bg-secondColor text-white hover:bg-opacity-70 lg:px-10 px-5 font-bold lg:py-4 py-2 lg:text-2xl text-base rounded-md flex justify-center items-center gap-x-3"
                  >
                    <FaPlay />
                    PLAY NOW
                  </a>
                </aside>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <main className="bg-bgColor lg:px-9 px-4 py-2 flex lg:flex-row flex-col text-white">
        <section className="basis-3/4 mt-5">
          <h1 className="font-bold lg:text-2xl text-4xl mb-5">Newly Added</h1>
          <aside className="grid lg:grid-cols-5 grid-cols-2 gap-5">
            {series.map((film: ISeries | any) => (
              <Card key={film.id} {...film} />
            ))}
          </aside>
        </section>
        <section className="basis-1/4 lg:mt-5 mt-8">
          <h1 className="font-bold lg:text-2xl text-4xl mb-5">Top Anime</h1>
          <aside>
            <ul className="flex gap-3 flex-col" role="list">
              {series
                .sort((a: ISeries, b: ISeries) => b.view - a.view)
                .map((film: ISeries, index) => (
                  <li
                    key={film.id}
                    className="rounded-lg [&:nth-child(1)]:border-r-fistAnime [&:nth-child(2)]:border-r-secondAnime [&:nth-child(3)]:border-r-thirdAnime border-r-other border-r-4"
                  >
                    <TopAnimeCard {...film} rank={index + 1} />
                  </li>
                ))}
            </ul>
          </aside>
        </section>
      </main>
    </>
  );
};

export default Home;
