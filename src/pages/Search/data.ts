import axios from "axios";

const fetchGeners: any = () => {
  let data: any = [];

  axios.get(`${import.meta.env.VITE_USER_URL}/geners`).then((response) => {
    console.log(response.data.geners);
    data = response.data.geners;
    return response.data.geners;
  });
  return data;
};

export const filters: any = [
  {
    id: 1,
    category: "genre",
    list: fetchGeners(),
  },
  {
    id: 2,
    category: "status",
    list: [
      {
        id: "completed",
        name: "completed",
      },
      {
        id: "releasing",
        name: "releasing",
      },
    ],
  },
];
