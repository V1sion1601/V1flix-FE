//libs
import axios from "axios";

//components
import SettingBoxLayout from "../../layout/SettingBoxLayout";
import { IImages } from "../../interface";
import { Select, Form } from "../../components/Form/Form";
import { account } from "../../utils/Storage";

const UserSetting = ({
  setMenu,
  title,
  images,
  status,
  id,
  filmStatus,
}: any) => {
  const bannerUrl = images.filter(
    (image: IImages) => image.type === "banner"
  )[0]?.name;

  const handleSubmit = async (data: any) => {
    const response = await axios.put(
      `${import.meta.env.VITE_USER_URL}/series/update/${account.get(
        "idUser"
      )}/${id}"`,
      {
        status: data.listStatus,
      }
    );
    if (response.data.status === "succeed") {
      alert("Updated successfully");
      window.location.replace(`/profile/${account.get("username")}`);
    } else {
      alert("Updated failed");
    }
  };

  const handleDelete = async () => {
    const decision = window.confirm(
      "Do you want to delete this series out of your list?"
    );
    if (decision) {
      const response = await axios.delete(
        `${import.meta.env.VITE_USER_URL}/series/delete/${account.get(
          "idUser"
        )}/${id}"`
      );
      if (response.data.status === "succeed") {
        alert("Delete successfully");
        window.location.replace(`/profile/${account.get("username")}`);
      } else {
        alert("Delete failed");
      }
    }
  };

  return (
    <SettingBoxLayout>
      <div
        className="bg-center bg-no-repeat h-40 rounded-md flex justify-end"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      >
        <span
          onClick={() => setMenu({ show: false, title, images, status, id })}
          className="cursor-pointer text-secondColor font-bold mx-5 text-4xl w-fit text-right"
        >
          X
        </span>
      </div>
      <article className="px-5 -mt-16 mb-5">
        <div className="flex flex-row gap-x-3.5">
          <div aria-label="image" className="w-[11.2rem]">
            <img
              className="rounded-md"
              src={
                images.filter((image: IImages) => image.type === "thumbnail")[0]
                  ?.name
              }
              alt="thumb"
            />
          </div>
          <header className="flex flex-col justify-between mt-20 gap-y-2 basis-5/6 text-white">
            <div className="flex justify-between">
              <h1 className="font-bold text-2xl ">{title}</h1>
              <button
                onClick={handleDelete}
                type="submit"
                className="bg-red-600 hover:bg-red-500 px-3.5 py-2 rounded-md font-bold"
              >
                Delete
              </button>
            </div>
            <div>
              <span>User Status: </span>
              <span className="font-bold text-secondColor">{`${status}`}</span>
            </div>
            <div>
              <span>Film Status: </span>
              <span className="font-bold text-secondColor">
                {`${filmStatus.charAt(0).toUpperCase()}${filmStatus.substr(1)}`}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Form onSubmit={handleSubmit}>
                <Select
                  name="listStatus"
                  options={["Completed", "Plan to watch", "Dropped"]}
                  className="p-2 mr-1.5 rounded-md text-black"
                  optionsClass="text-black"
                  defaultValue={status}
                />
                <button
                  type="submit"
                  className="bg-secondColor hover:bg-secondColorBrighter p-2 rounded-md"
                >
                  Edit this item
                </button>
              </Form>
            </div>
          </header>
        </div>
      </article>
    </SettingBoxLayout>
  );
};

export default UserSetting;