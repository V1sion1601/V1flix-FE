const SettingBoxLayout = ({ children }: any) => {
  return (
    <section className="absolute bg-black bg-opacity-75 inset-0 z-30 flex justify-center items-center ">
      <aside className="bg-mainColor opacity-100 text-left w-3/5 rounded-md z-50 ">
        {children}
      </aside>
    </section>
  );
};

export default SettingBoxLayout;
