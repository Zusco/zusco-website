/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import apis from "services/bookings";
import { successToast } from "components/general/toast/toast";

class BookingsStore {
  // ====================================================
  // State
  // ====================================================
  bookings = [];
  reservedBookings = [];
  currentBooking = null;
  currentFeatures = [];
  pageCount = 1;
  bookingsCount = 0;
  user = null;
  count = 0;
  error = null;
  loading = false;
  favorites = "all";
  showFavorite = false;
  searchLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Computed views
  // ====================================================
  // While MobX promotes OOP, we can still benefit from using FP where it's appropriate
  get token() {
    return this.user.token;
  }

  // ====================================================
  // Actions
  // ====================================================

  getBookings = async (all) => {
    this.loading = true;
    try {
      let res = await apis.getBookings(all || this.pageCount);
      this.bookingsCount = res?.total;
      res = res?.data;
      res = res?.map(({ draft, occupied, ...items }) => {
        const status = draft ? "draft" : occupied ? "occupied" : "unoccupied";
        return { ...items, status };
      });
      let newListings = [...this.bookings, ...res];
      newListings = [...new Set(newListings)];
      this.bookings = res;
      this.reservedBookings = res?.filter(
        ({ status }) => status === "reserved"
      );
      // return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  handleFindBooking = async ({ url, router, route }) => {
    let currentBooking;
    try {
      this.searchLoading = true;
      currentBooking = await apis.getBookingById(url);
      currentBooking = currentBooking?.shortlet_booking;
      if (currentBooking) {
        const amenities = currentBooking?.shortlet?.amenities || [];
        const allowances = currentBooking?.shortlet?.allowances || [];
        const rules = currentBooking?.shortlet?.rules || [];
        this.currentBooking = currentBooking;
        this.currentFeatures = [...amenities, ...allowances, ...rules];
      } else {
        router.push(route);
      }
      return currentBooking;
    } catch (error) {
    } finally {
      this.searchLoading = false;
    }
  };

  isShortlets() {
    this.favorites = "shortlets";
  }

  isHosts() {
    this.favorites = "hosts";
  }

  isLocations() {
    this.favorites = "all";
  }

  toggleShowFavorites() {
    this.showFavorite = !this.showFavorite;
    this.favorites = "all";
  }
}

export default new BookingsStore();
