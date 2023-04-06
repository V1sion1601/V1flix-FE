import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
//Components
import { AiOutlineSearch } from "react-icons/ai";
import { CiDark, CiLight } from "react-icons/ci";
import { TbMinusVertical } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
//Interface
import { Hover, NavMenu, NavItem } from "./interface";
import { IReducer } from "../../interface";

//Data
import { listNavMenu } from "./data";
import useSearchSeries from "./hook";
import { ISeries } from "../../interface";
//Context
import { ThemeContext } from "../../context/ThemeContext";
import { slugifyString } from "../../utils/HandleString";
const MobileHeader: React.FC = () => {
  const [subMenu, setSubMenu] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>(() => {
    return "";
  });
  const [searchbar, setSearchbar] = useState<boolean>(false);
  const [loading, setLoading] = useState<Hover>(() => {
    console.log("Test loading");
    return { id: "", isLoading: false };
  });
  const result = useSearchSeries(searchInput);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <section
        aria-label="main-menu"
        className="flex flex-row py-6 px-5  text-white"
      >
        <aside className="basis-1/3 flex items-center justify-start gap-3">
          <div>
            <GiHamburgerMenu
              className={`${subMenu && "text-secondColor"}`}
              onClick={() => {
                setSubMenu(!subMenu);
                setSearchbar(false);
              }}
            />
          </div>
          <span>Your logo</span>
        </aside>
        <aside className="basis-2/3 flex justify-end items-center gap-4">
          <AiOutlineSearch
            className={`${searchbar && "text-secondColor"}`}
            onClick={() => {
              setSearchbar(!searchbar);
              setSubMenu(false);
            }}
            size={15}
          />
          <TbMinusVertical size={15} />
          <div className="cursor-pointer" onClick={() => toggleTheme()}>
            {theme === "dark" ? <CiDark size={15} /> : <CiLight size={15} />}
          </div>
          <button className="text-sm bg-transparent outline outline-offset-2 outline-outColor py-0.5 rounded-md px-2">
            Sign-in
          </button>
        </aside>
      </section>
      {searchbar && (
        <section
          className="-mb-[15rem] overflow-auto text-white "
          aria-label="search-bar"
        >
          <aside aria-label="input" className=" flex flex-row h-1/4">
            <div
              className={`${
                searchInput !== "" && "rounded-b-none"
              }  flex justify-center items-center  bg-mainColor px-2 py-4`}
            >
              <AiOutlineSearch />
            </div>
            <input
              type="text"
              className={`${
                searchInput !== "" && "rounded-b-none"
              }  bg-mainColor px-2 w-full focus:outline-none`}
              placeholder="Search"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  window.location.href = `/search/${searchInput}`;
                }
              }}
            />
          </aside>
          <aside aria-label="result" className="h-3/4">
            {searchInput !== "" ? (
              result.length > 0 ? (
                <ul className="rounded-b-md list">
                  {result.map((item: ISeries, index: number) => {
                    return (
                      <li
                        key={index}
                        className="bg-mainColor text-left py-2 px-2 even:bg-black-500"
                      >
                        <a
                          className="hover:text-secondColor"
                          href={`/watch?title=${slugifyString(
                            item.title
                          )}&ep=1`}
                        >
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                  <a href={`/search/${searchInput}`}>
                    <li className="bg-secondColor rounded-b-md text-center font-bold py-2 px-2">
                      See more
                    </li>
                  </a>
                </ul>
              ) : (
                <div className="text-center py-2 px-2 rounded-b-md bg-secondColor">
                  Can't find the data
                </div>
              )
            ) : null}
          </aside>
        </section>
      )}
      {subMenu && (
        <section aria-label="sub-menu">
          <div
            className={`h-40 -mb-[10rem] overflow-auto px-5 pt-5 text-white text-sm bg-mainColor`}
          >
            {listNavMenu.map((item: NavMenu) => (
              <aside key={item.id}>
                <div
                  aria-label="main-menu"
                  className={`${
                    loading.isLoading === true &&
                    loading.id === item.id &&
                    item.subMenu &&
                    "mb-3"
                  } h-auto mb-10`}
                >
                  <span
                    // onTouchStart={() => {
                    //   setLoading({ isLoading: true, id: item.id });
                    // }}
                    className={`${
                      loading.id === item.id && "text-secondColor"
                    } cursor-pointer  hover:font-bold`}
                  >
                    <NavLink
                      to={item.url}
                      className="hover:text-secondColor cursor-pointer block"
                    >
                      {item.title}
                    </NavLink>
                  </span>

                  <div aria-label="sub-menu" className="h-auto mt-3">
                    {loading.id === item.id && (
                      <>
                        <ul>
                          {item.subMenu?.map((sub: NavItem) => (
                            <li
                              className="cursor-pointer hover:text-secondColor list-disc ml-8 hover:font-bold"
                              key={sub.id}
                            >
                              {sub.title}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </aside>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default MobileHeader;
