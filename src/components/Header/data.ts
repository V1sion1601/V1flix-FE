import { NavMenu } from "./interface";
import axios from "axios";
const fetchGeners: any = () => {
  let data: any = [];
  axios.get(`${import.meta.env.VITE_USER_URL}/geners`).then((response) => {
    console.log(response.data.geners);
    data = response.data.geners;
    return response.data.geners;
  });
  console.log(data);
  return data;
};
const genersMenu = fetchGeners();
export const listNavMenu: NavMenu[] = [
  {
    id: "Nav02",
    title: "Genre",
    url: "/home",
    subMenu: genersMenu.map((gener: any) => {
      return {
        id: gener.id,
        title: gener.name,
        url: `/genre/${gener.name.toLowerCase()}`,
      };
    }),
  },

  {
    id: "Nav04",
    title: "Newest",
    url: "/home",
  },
];
