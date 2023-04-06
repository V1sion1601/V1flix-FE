import React from "react";

const UserFilmSetting = ({ setMenu }: any) => {
  return (
    <section className="absolute bg-black opacity-75 inset-0 z-30 h-[86.8rem]  flex justify-center items-center ">
      <div className="bg-mainColor p-5">
        <span className="cursor-pointer" onClick={() => setMenu(false)}>
          Test
        </span>
      </div>
    </section>
  );
};

export default UserFilmSetting;
