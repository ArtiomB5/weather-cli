import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "/weather-data.json");

export const tokenDictionary = {
  token: "token",
  city: "city",
};

export const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
console.log({key, value})
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key, path = filePath) => {
  if (await isExist(path)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }

  return null;
};

export const isExist = async (path) => {
  try {
    const file = await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export const getToken = async () => {
  try {
    const token =
      process.env["TOKEN"] ?? (await getKeyValue(tokenDictionary.token));
    return token;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getCity = async () => {
  try {
    const city =
      process.env["CITY"] ?? (await getKeyValue(tokenDictionary.city));
    return city;
  } catch (e) {
    console.log(e);
    return null;
  }
};

//f17b94b3b52ae7c465d1a4d3382d3194
