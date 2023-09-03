#!/user/bin/env node
import { getArgs } from "./helpers/args.js";
import * as logServices from "./services/log.service.js";
import * as storageServices from "./services/storage.service.js";
import * as apiServices from "./services/api.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    logServices.printError(`The token hasn't pass!`);
    return;
  }
  try {
  console.log(token)
    await storageServices.saveKeyValue(storageServices.tokenDictionary.token, token);
    logServices.printSuccess("Token has been saved");
  } catch (e) {
    logServices.printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    logServices.printError(`The city hasn't pass!`);
    return;
  }

  try {
    await storageServices.saveKeyValue(storageServices.tokenDictionary.city, city);
    logServices.printSuccess("City has been saved");
  } catch (e) {
    logServices.printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const weather = await apiServices.getWeather();
    const weatherDesc = {
      country: weather?.location?.country ?? '',
      city: weather?.location?.name ?? '',
      desc: weather?.current?.condition?.text ?? '',
      temp: weather?.current?.temp_c ?? ''
    }
    logServices.printWeather(weatherDesc);
  } catch (e) {
    if (e?.response?.status === 404 || e?.response?.status === 400) {
      logServices.printError("City name is wrong");
    } else if (e?.response?.status === 403 || e?.response?.status === 401) {
      logServices.printError("Token is wrong");
    } else {
      logServices.printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    logServices.printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }

  getForecast();
};

initCLI();
