import { apiInstance2 } from "utils/apiInstance";

const apis = {
  getMe: () => apiInstance2(`me`),
  updateMe: (data) =>
    apiInstance2("auth/user", {
      method: "PUT",
      body: data,
    }),
};

export default apis;
