import { NavMenu } from "./interface";
import axios from "axios";
let genersMenu: any[] = [];

const fetchGeners: any = () => {
  return axios
    .get(`${import.meta.env.VITE_USER_URL}/geners`)
    .then((response) => {
      genersMenu = response.data.geners;
      console.log(response.data.geners);
      return response.data.geners;
    });
};

fetchGeners().then(() => {
  return genersMenu;
});
const test = await fetchGeners();
// const genersMenu = fetchGeners();
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
