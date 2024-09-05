import Axios, { AxiosError } from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

export { AxiosError };

export function AxiosWithoutHeaders() {
  const axios = Axios.create({
    baseURL,
  });

  return axios;
}

export function AxiosJSON() {
  const axios = Axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return axios;
}

export function AxiosFormData() {
  const axios = Axios.create({
    baseURL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return axios;
}
