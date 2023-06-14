import { apiInstance2 } from "utils/apiInstance";

const apis = {
  sendOtp: (data) =>
    apiInstance2("internal/send-otp", {
      method: "POST",
      body: data,
      internal: true,
    }),

  verifyOtp: (data) =>
    apiInstance2("auth/verify/web", {
      method: "POST",
      body: data,
    }),
};

export default apis;
