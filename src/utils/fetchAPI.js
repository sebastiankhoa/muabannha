import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const res = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "e42677e148msha399f5026cba189p11198djsnfcc649352d91",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });
  return res.data;
};
