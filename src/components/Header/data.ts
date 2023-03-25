import { NavMenu } from "./interface";

export const listNavMenu: NavMenu[] = [
  {
    id: "Nav01",
    title: "Home",
    url: "/home",
    subMenu: [
      {
        id: "SubNav01-1",
        title: "Home",
        url: "/home/1",
      },
      {
        id: "SubNav01-2",
        title: "Home 2",
        url: "/home/1",
      },
      {
        id: "SubNav01-3",
        title: "Home 3",
        url: "/home/1",
      },
    ],
  },
  {
    id: "Nav02",
    title: "Genre",
    url: "/home",
    subMenu: [
      {
        id: "SubNav02-1",
        title: "Genre",
        url: "/home/1",
      },
    ],
  },
  {
    id: "Nav03",
    title: "Types",
    url: "/home",
    subMenu: [
      {
        id: "SubNav03-1",
        title: "Types",
        url: "/home/1",
      },
    ],
  },
  {
    id: "Nav04",
    title: "Newest",
    url: "/home",
  },
];
