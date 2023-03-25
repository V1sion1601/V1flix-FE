import React, { lazy } from "react";
//Custom Hook
import useWindowDimensions from "../../hook/useWindowDimensions";

//Components
const DesktopHeader = lazy(() => import("./DesktopHeader"));
const MobileHeader = lazy(() => import("./MobileHeader"));

const Header: React.FC = () => {
  const { width } = useWindowDimensions();
  return (
    <nav className="sticky top-0  bg-bgColor bg-gradient-to-b from-black to-transparent z-20 ">
      {width > 600 ? <DesktopHeader /> : <MobileHeader />}
    </nav>
  );
};

export default Header;