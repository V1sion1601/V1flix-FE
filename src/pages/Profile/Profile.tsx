import React, { useEffect, useState } from "react";
import Avatar from "../../assets/default_avatar.jpg";
import Banner from "../../assets/default_banner.png";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [account, setAccount] = useState<any>({});
  const { username } = useParams();
  console.log(username);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/get-account/${username}`,
        {
          signal: controller.signal,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeed") {
        setAccount(response.data.account);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [username]);

  return (
    <>
      {account.id ? (
        <main className="h-screen  py-2 text-white ">
          <section aria-label="banner" className="h-[18rem]">
            <div
              style={{
                backgroundImage: `url(${Banner})`,
              }}
              className="h-full bg-bottom bg-no-repeat"
            ></div>
          </section>
          <section aria-label="content" className="h-3/4 lg:px-9 px-4">
            <aside aria-label="information" className="flex gap-x-4">
              <div aria-label="actions">
                <img
                  src={Avatar}
                  alt="avatar"
                  className="rounded-full w-40 h-40 -mt-[4.5rem] shadow-md border-2 border-secondColor"
                />
              </div>
              <div aria-label="detail-account">
                <h1 className="pt-5 text-4xl font-bold">{account.username}</h1>
                <aside className=" w-full mt-8">
                  <nav className="flex gap-x-5 w-fit bg-mainColor font-bold rounded-sm">
                    <div className="p-2.5">Plans to Watch</div>
                    <div className="p-2.5">Paused</div>
                    <div className="p-2.5">Watching</div>
                    <div className="p-2.5">Completed</div>
                  </nav>
                </aside>
              </div>
            </aside>
          </section>
        </main>
      ) : (
        <main className="h-screen flex justify-center items-center">
          <h1 className="font-bold text-white text-2xl">
            This account doesn't exist
          </h1>
        </main>
      )}
    </>
  );
};

export default Profile;
