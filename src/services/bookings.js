import { apiInstance2 } from "utils/apiInstance";

const apartments = {
  getBookings: (page_number) =>
    apiInstance2(`user/shortlet/bookings/${page_number}`),
};

export default apartments;
