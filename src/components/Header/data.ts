import { NavMenu } from "./interface";
import axios from "axios";
const fetchGeners: any = async () => {
  const response = await axios.get(`${import.meta.env.VITE_USER_URL}/geners`);
  console.log(response.data.geners);
  return response.data.geners;
};
const genersMenu = await fetchGeners();
export const listNavMenu: NavMenu[] = [
  {
    id: "Nav02",
    title: "Genre",
    url: "/home",
    subMenu: genersMenu.map((gener: any) => {
      console.log(gener);
      return {
        id: gener.id,
        title: gener.name,
        url: `/genre/${gener.name}`,
      };
    }),
  },

  {
    id: "Nav04",
    title: "Newest",
    url: "/home",
  },
];
