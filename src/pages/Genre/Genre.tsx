import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card";
const Genre: React.FC = () => {
  const { name } = useParams();
  const [films, setFilms] = useState<any>([]);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/geners/find/${name
          ?.charAt(0)
          .toUpperCase()}${name?.slice(1)}`,
        {
          signal: controller.signal,
        }
      );
      if (response.data.status === "success") {
        setFilms(response.data.films);
        console.log(response.data.films);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [name]);

  console.log(films);
  return (
    <section className="h-screen px-8 text-white">
      <header>
        <aside aria-label="header">
          <h1 className="font-bold text-3xl">{`List film for "${name
            ?.charAt(0)
            .toUpperCase()}${name?.slice(1)}"`}</h1>
        </aside>
      </header>
      <main className="w-full grid grid-cols-5 gap-x-8 mt-5">
        {films.map((film: any) => (
          <section className="w-full">
            <Card {...film} />
          </section>
        ))}
      </main>
    </section>
  );
};

export default Genre;
