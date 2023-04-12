import React, { useEffect, useState } from "react";
import { IImages } from "../../interface";
import { Form, Select } from "../../components/Form/Form";
import axios from "axios";
import { account } from "../../utils/Storage";

const UserFilmSetting = ({ setMenu, title, images, status, id }: any) => {
  //remove body scroll-bar
  const bannerUrl = images.filter(
    (image: IImages) => image.type === "banner"
  )[0]?.name;
  const [userStatus, setUserStatus] = useState("");
  console.log(userStatus);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_URL}/series/get-list/${account.get(
          "idUser"
        )}/${id}`,
        {
          signal: controller.signal,
        }
      );

      if (response.data.status === "succeed") {
        setUserStatus(response.data.userStatus);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [id]);

  const handleSubmit = async (data: any) => {
    const response = await axios.post(
      `${import.meta.env.VITE_USER_URL}/series/add`,
      {
        id_series: parseInt(id),
        id_user: account.get("idUser"),
        status: data.listStatus,
      }
    );

    if (response.data.status === "succeed") {
      alert("Add to list successfully");
      setMenu(false);
    } else {
      alert("Fail to add");
    }
  };

  const updateStatus = async (data: any) => {
    console.log("Test update");
  };

  return (
    <section className="absolute bg-black bg-opacity-75 inset-0 z-30 flex justify-center items-center ">
      <aside className="bg-mainColor opacity-100 text-left w-3/5 rounded-md z-50 ">
        <div
          className="bg-center bg-no-repeat h-40 rounded-md flex justify-end"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        >
          <span
            onClick={() => setMenu(false)}
            className="cursor-pointer text-secondColor font-bold mx-5 text-4xl w-fit text-right"
          >
            X
          </span>
        </div>
        <article className="px-5 -mt-16 mb-5">
          <div className="flex flex-row gap-x-3.5">
            <div aria-label="image" className="basis-1/6">
              <img
                className="rounded-md"
                src={
                  images.filter(
                    (image: IImages) => image.type === "thumbnail"
                  )[0]?.name
                }
                alt="thumb"
              />
            </div>
            <header className="flex flex-col justify-between mt-20 gap-y-2 basis-5/6">
              <h1 className="font-bold text-2xl">{title}</h1>
              <div>
                <span>User Status: </span>
                <span className="font-bold text-secondColor">{`${userStatus}`}</span>
              </div>
              <div>
                <span>Film Status: </span>
                <span className="font-bold text-secondColor">{`${status}`}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Form
                  onSubmit={userStatus === "" ? handleSubmit : updateStatus}
                >
                  <Select
                    name="listStatus"
                    options={["Completed", "Plan to watch", "Dropped"]}
                    className="p-2 mr-1.5 rounded-md text-black"
                    optionsClass="text-black"
                  />
                  <button
                    type="submit"
                    className="bg-secondColor hover:bg-secondColorBrighter p-2 rounded-md"
                  >
                    {userStatus === "" ? "Add to library" : "Update status"}
                  </button>
                </Form>
              </div>
            </header>
          </div>
        </article>
      </aside>
    </section>
  );
};

export default UserFilmSetting;
