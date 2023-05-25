import { apiInstance2 } from "utils/apiInstance";

const apartments = {
  getBookings: (page_number) =>
    apiInstance2(`user/shortlet/bookings/${page_number}`),
  getBookingById: (booking_id) =>
    apiInstance2(`shortlet-booking/one/${booking_id}`),
};

export default apartments;
