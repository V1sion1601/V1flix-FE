import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DefaultLoading from "../../components/Loading/DefaultLoading";
import Card from "../../components/Card/Card";

const Newest = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/episodes`
      );
      if (response.data) return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  if (isLoading) return <DefaultLoading msg={"Wait for the newest episode"} />;
  console.log(data);
  return (
    <main className="h-screen text-white mx-8 mt-2">
      <header className="font-bold text-3xl">Newest Episodes</header>
      <section className="w-full grid grid-cols-6 gap-4 mt-4">
        {data.episodes.map((episode: any) => {
          console.log(episode);
          return (
            <div>
              <Card {...episode.series} />
              <div>{`Episode: ${episode.ep_num}`}</div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Newest;
