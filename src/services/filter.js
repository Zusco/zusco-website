import { apiInstance2 } from "utils/apiInstance";

const filters = {
  filterListings: (data) =>
    apiInstance2(`internal/shortlet/filter`, {
      method: "POST",
      body: data,
      internal: true,
    }),
};

export default filters;
