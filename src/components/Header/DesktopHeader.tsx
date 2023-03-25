import React, { useReducer, useState, useContext } from "react";
//Component
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { CiDark, CiLight } from "react-icons/ci";
import { TbMinusVertical } from "react-icons/tb";
import { Hover, NavItem, NavMenu } from "./interface";
import { NavLink, Link } from "react-router-dom";
//Reducer
import { IReducer } from "../../interface";
import { reducer } from "./reducer";
//Data
import { listNavMenu } from "./data";
import { ISeries } from "../../interface";
import useSearchSeries from "./hook";
//Context
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";

const initState: Hover = {
  isLoading: false,
  id: "",
};
let count = 0;
const DesktopHeader: React.FC = () => {
  console.log("re-render ", count++);
  const [loading, dispatch] = useReducer<
    (state: Hover, action: IReducer) => any
  >(reducer, initState);
  const [searchInput, setSearchInput] = useState<string>("");
  const [userMenu, setUserMenu] = useState(false);
  const result = useSearchSeries(searchInput);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { getUser, removeUser } = useContext(UserContext);
  const user = getUser();

  return (
    <>
      <div className="px-10 flex text-white">
        <section aria-label="Logo" className="py-10 basis-1/6">
          Your Logo
        </section>
        <section
          aria-label="functions"
          className="py-10 px-24 flex flex-row justify-between items-center basis-3/6 font-semibold"
        >
          {listNavMenu.map((item: NavMenu) => (
            <aside key={item.id}>
              <div
                aria-label="main-menu"
                onMouseEnter={() =>
                  dispatch({ type: "loading", payload: item.id })
                }
                onMouseLeave={() =>
                  dispatch({ type: "unloading", payload: "" })
                }
              >
                <NavLink
                  to={item.url}
                  className="hover:text-secondColor cursor-pointer block"
                >
                  {item.title}
                </NavLink>
                {loading.isLoading === true && loading.id === item.id && (
                  <div
                    aria-label="sub-menu"
                    className="pt-5 absolute text-white"
                  >
                    <ul className="bg-mainColor w-32 -ml-4 rounded-md">
                      {item.subMenu?.map((sub: NavItem) => (
                        <li
                          className="cursor-pointer pl-4 pr-1.5 py-2 hover:bg-secondColor hover:rounded-md"
                          key={sub.id}
                        >
                          {sub.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          ))}
        </section>

        <section
          aria-label="others"
          className="py-8 basis-3/6 flex flex-row text-right h-fit gap-5"
        >
          <aside aria-label="search" className="flex flex-col w-2/3 h-12">
            <aside aria-label="input" className="flex flex-row">
              <div
                className={`${
                  searchInput !== "" && "rounded-l-none"
                }  flex justify-center items-center bg-opacity-40 bg-gray-500 px-2 py-4 rounded-l-md`}
              >
                <AiOutlineSearch />
              </div>
              <input
                type="text"
                className={`${
                  searchInput !== "" && "rounded-r-none"
                } bg-opacity-40 bg-gray-500 px-2 rounded-r-md w-full focus:outline-none`}
                placeholder="Search"
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    window.location.href = `/search/${searchInput}`;
                  }
                }}
                onChange={(e) => {
                  setSearchInput(() => e.target.value);
                }}
              />
            </aside>
            <aside aria-label="result">
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
                            href={`/watch/${item.id}`}
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
                  <div className="bg-gray-500 bg-opacity-50  text-center py-2 px-2 rounded-b-md">
                    Can't find the data
                  </div>
                )
              ) : null}
            </aside>
          </aside>
          <aside
            aria-label="sign-in"
            className={`w-1/3 flex-row flex gap-3 ${
              !user ? "justify-center" : "justify-between"
            } `}
          >
            <div
              className={` flex items-center bg-opacity-40 px-2 py-2 rounded-l-md`}
            >
              <TbMinusVertical size={20} />
            </div>
            <div
              className="flex justify-center items-center bg-opacity-40 px-2 py-2 rounded-l-md cursor-pointer"
              onClick={() => toggleTheme()}
            >
              {theme === "dark" ? <CiDark size={20} /> : <CiLight size={20} />}
            </div>
            {user === "" ? (
              <Link
                to="/login"
                className="flex justify-center items-center bg-transparent outline outline-offset-2 outline-outColor py-2 rounded-lg px-2 w-full"
              >
                Sign-in
              </Link>
            ) : (
              <div
                onClick={() => setUserMenu(!userMenu)}
                className="text-right flex justify-center items-center bg-opacity-40 px-2 py-2 rounded-l-md cursor-pointer"
              >
                <AiOutlineUser
                  size={20}
                  className={`${
                    userMenu ? "text-secondColor " : "text-white "
                  }hover:text-secondColor `}
                />
                {userMenu && (
                  <div
                    aria-label="sub-menu"
                    className="pt-5 absolute text-white mt-28"
                  >
                    <ul className="bg-mainColor -ml-4 rounded-md p-2 ">
                      <li className="cursor-pointer p-2 hover:bg-secondColor hover:rounded-md">
                        <Link
                          to={`/profile/${user.username}`}
                          className="text-center"
                        >
                          {user.username}
                        </Link>
                      </li>
                      <li
                        onClick={() => {
                          removeUser();
                        }}
                        className="cursor-pointer p-2 hover:bg-secondColor hover:rounded-md"
                      >
                        Log-out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </aside>
        </section>
      </div>
    </>
  );
};

export default DesktopHeader;