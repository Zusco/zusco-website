/* eslint-disable dot-notation */
import axios from "axios";
import { getToken } from "../utils/storage";
import { errorToast } from "components/general/toast/toast";

function logout() {
  window.localStorage.clear();
}

export function apiInstance2(
  endpoint,
  { method = "GET", data, body, ...customConfig } = {}
) {
  const token = getToken();
  let url = "";

  const headers = { "content-type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    data: data || body,
    ...customConfig,
    headers: {
      ...(token && { Authorization: token }),
      ...headers,
      ...customConfig.headers,
      ...(customConfig.internal && {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      }),
    },
  };

  if (!process.env.NEXT_PUBLIC_API_URL) {
    url = endpoint;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  }

  if (
    !endpoint?.includes("internal/") &&
    !token &&
    !endpoint?.includes("auth/verify")
  ) {
    return;
  }
  return axios(url, config)
    .then(async (response) => {
      const data = response.data;
      if (response.statusText) {
        return Promise.resolve({
          ok: response.statusText,
          ...data,
        });
      }
    })
    .catch(async (_err) => {
      let message;
      switch (_err?.response?.status) {
        case 400:
          message = "Bad Request";
          break;
        case 401:
          // logout();
          // window.location.assign(window.location);
          // message = "You're not Authenticated. Kindly Login";
          break;
        case 403:
          message = "UnAuthorised User";
          break;
        case 404:
          message = "Resource not found";
          break;
        case 500:
          message = "Internal server error";
          break;
        default:
          message = "";
      }

      if (_err?.response?.data)
        errorToast(
          "Error",
          _err.response.data.message
            ? _err.response.data.message
            : "An error occured"
        );

      const errorRes = {
        response: {
          ok: _err?.response?.statusText,
          custom_message: message,
          data: _err?.response?.data,
        },
      };
      await Promise.reject(errorRes);
    });
}

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const setToken = (token) => {
  apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  apiInstance.defaults.withCredentials = false;
};
