import { apiInstance2 } from "utils/apiInstance";

const apartments = {
  bookListing: (shortlet_id, data) =>
    apiInstance2(`shortlet/book/${shortlet_id}`, {
      method: "POST",
      body: data,
    }),

  getAllListings: (page_number) =>
    apiInstance2(`internal/shortlet/${page_number}`, {
      internal: true,
    }),

  searchListing: (page_number, data) =>
    apiInstance2(`internal/shortlet/search/${page_number}`, {
      method: "POST",
      body: data,
      internal: true,
    }),

  addFavouriteListing: (shortlet_id, data) =>
    apiInstance2(`shortlet/favourite/${shortlet_id}`, {
      method: "POST",
      body: data,
    }),

  getReviews: (shortlet_id) =>
    apiInstance2(`shortlet/review/${shortlet_id}`, {
      internal: true,
    }),
  addReview: (shortlet_id, data) =>
    apiInstance2(`shortlet/review/${shortlet_id}`, {
      method: "POST",
      body: data,
    }),

  getFavouriteListings: () =>
    apiInstance2(`user/shortlet/favourite`, {
      internal: true,
    }),

  getAAR: () =>
    apiInstance2(`internal/aar`, {
      internal: true,
    }),

  searchListingById: (shortlet_id) =>
    apiInstance2(`internal/shortlet/one/${shortlet_id}`, {
      method: "GET",
      internal: true,
    }),
  reportAgent: (agent_id, data) =>
    apiInstance2(`agent/report/${agent_id}`, {
      method: "POST",
      body: data,
    }),
};

export default apartments;
