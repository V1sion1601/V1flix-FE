import axios from "axios";

const fetchGeners = async () => {
  const response = await axios.get(`${import.meta.env.VITE_USER_URL}/geners`);
  console.log(response.data.geners);
  return response.data.geners;
};

export const filters: any = [
  {
    id: 1,
    category: "genre",
    list: await fetchGeners(),
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
