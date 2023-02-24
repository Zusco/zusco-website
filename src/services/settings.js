import { apiInstance2 } from "utils/apiInstance";

const apis = {
  getSettings: () => apiInstance2(`user-settings`),

  updateSettings: (data) =>
    apiInstance2("user-settings", {
      method: "PUT",
      body: data,
    }),
};

export default apis;
