import { useEffect, useState } from "react";
import Avatar from "../../assets/default_avatar.jpg";
import Banner from "../../assets/default_banner.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card";
import { account } from "../../utils/Storage";
const Profile = () => {
  const [user, setUser] = useState<any>({});
  const [list, setList] = useState<any>([]);

  const { username } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      //fetch accounts
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/get-account/${username}`,
        {
          signal: controller.signal,
        }
      );
      console.log(response.data);
      //fetch list
      if (response.data.status === "succeed") {
        setUser(response.data.account);
        const responseList = await axios.get(
          `${import.meta.env.VITE_USER_URL}/series/get/${
            response.data.account.id
          }`,
          {
            signal: controller.signal,
          }
        );
        console.log(responseList.data.data);
        setList(responseList.data.data);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [username]);

  return (
    <>
      {user.id ? (
        <main className="h-screen  py-2 text-white mb-[20rem]">
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
                <h1 className="pt-5 text-4xl font-bold">{user.username}</h1>
                <aside className=" w-full mt-8">
                  <nav className="flex gap-x-5 w-fit bg-mainColor font-bold rounded-sm">
                    <div className="p-2.5">Plans to Watch</div>
                    <div className="p-2.5">Paused</div>
                    <div className="p-2.5">Watching</div>
                    <div className="p-2.5">Completed</div>
                  </nav>
                </aside>
                <aside className="grid grid-cols-4 text-white gap-4 w-full mt-5">
                  {list.map((item: any) => (
                    <div key={item["series.id"]} className="w-56">
                      <Card
                        key={item["series.id"]}
                        title={item["series.title"]}
                        images={[{ name: item.name, type: item.type }]}
                        type={item["series.type"]}
                        total_episodes={item["series.total_episodes"]}
                        status={item["status"]}
                      />
                      {account.get("idUser") === user.id && (
                        <button className="mt-2 font-bold rounded-md text-white bg-secondColor hover:bg-secondColorBrighter py-1.5 px-2.5">
                          Setting
                        </button>
                      )}
                    </div>
                  ))}
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
