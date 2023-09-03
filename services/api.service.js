import axios from "axios";
import * as services from "./storage.service.js";

export const getWeather = async () => {
  const token = await services.getToken();
  const city = await services.getCity();
  console.log({token, city})

  if (!token) {
    throw new Error(`The API key is absent. Set the key by using -t [API_KEY]`);
  }

  const { data } = await axios.get("http://api.weatherapi.com/v1/current.json", {
    params: {
      key: token,
      q: city,
      aqi: "no",
    },
  });

  return data;
};
