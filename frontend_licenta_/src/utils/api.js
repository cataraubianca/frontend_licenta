import axios from "axios";
import { deleteToken, getToken } from "./token";

export const httpMethods = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put",
};

const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ` + getToken();
  return config;
});

export const _get = async (url) => {
  try {
    return await instance({
      method: httpMethods.GET,
      url: url,
    });
  } catch (err) {
    handleError(err);
  }
};

export const _post = async (url, body) => {
  try {
    return await instance({
      method: httpMethods.POST,
      url: url,
      data: body,
    });
  } catch (err) {
    console.log(err);
  }
};

export const _put = async (url, body) => {
  try {
    return await instance({
      method: httpMethods.PUT,
      url: url,
      data: body,
    });
  } catch (err) {
    handleError(err);
  }
};

export const _delete = async (url) => {
  try {
    return await instance({
      method: httpMethods.DELETE,
      url: url,
    });
  } catch (err) {
    handleError(err);
  }
};


export const handleError = (err) => {
  console.log(err);
  const {
    response: { statusCode },
  } = err;
  switch (statusCode) {
    case 401:
      deleteToken();
    default:
      throw err;
  }
};