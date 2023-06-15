/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import { successToast } from "components/general/toast/toast";
import apis from "services/listing";
import apis2 from "services/filter";
import { debounce } from "utils/functions";
import { PENDING_BOOKING_DATA } from "utils/storage";
import { defaultFilterValues } from "utils/constants";
import AuthStore from "./auth";
class ListingStore {
  // ====================================================
  // State
  // ====================================================
  error = null;
  loading = true;
  bookListingLoading = false;
  favouritesLoading = false;
  amenitiesLoading = false;
  addingFavourite = false;
  allListings = [];
  listingsCount = 0;
  reservedListings = [];
  zuscoListings = [];
  featuredListings = [];
  popularListings = [];
  newListings = [];
  searchedListings = [];
  currentListing = null;
  currentFeatures = [];
  currentReviews = [];
  currentReviewsValue = 0;
  pageCount = 1;
  pendingBookingForm = null;
  searchLoading = false;

  favouriteListings = [];
  amenities = [];
  allowances = [];
  rules = [];
  allStates = [];
  loadingStates = false;

  searchIdLoading = true;

  filterData = defaultFilterValues;
  filterLoading = false;
  reviewsLoading = false;
  filteredListing = [];
  reloadFilters = false;
  showShareModal = false;

  showFilteredListings = false;
  constructor() {
    makeAutoObservable(this);

    // Using reactions we can tie otherwise unrelated concerns and react to their changes
  }

  // ====================================================
  // Computed views
  // ====================================================
  // While MobX promotes OOP, we can still benefit from using FP where it's appropriate

  // ====================================================
  // Actions
  // ====================================================

  setShowFilteredListings = (item) => {
    this.showFilteredListings = item;
  };
  setShowShareModal = (item) => {
    this.showShareModal = item;
  };
  setFilterData = (item) => {
    this.filterData = item;
  };
  incrementPageCount = () => {
    this.pageCount += 1;
  };

  handleSortlistings = (res) => {
    const sortedListings =
      res?.map(({ draft, occupied, zusco, featured, popular, ...items }) => {
        const status = draft ? "draft" : occupied ? "occupied" : "unoccupied";
        const type = zusco
          ? "zusco"
          : !zusco
          ? "featured"
          : popular
          ? "popular"
          : items?.new
          ? "new"
          : "regular";
        return { ...items, status, type };
      }) || [];

    return sortedListings;
  };
  handleAlllistings = (res) => {
    this.listingsCount = res?.total;
    res = res?.data;

    res = this.handleSortlistings(res);
    let newListings = [...this.allListings, ...res];
    newListings = newListings.filter(
      (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    );

    this.allListings = newListings;
    this.reservedListings = newListings?.filter(
      ({ status }) => status === "reserved"
    );
    this.zuscoListings = newListings?.filter(({ type }) => type === "zusco");
    this.featuredListings = newListings?.filter(
      ({ type }) => type === "featured"
    );
    this.popularListings = newListings?.filter(
      ({ type }) => type === "popular"
    );
    this.newListings = newListings?.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    this.loading = false;
    return res;
  };
  getAllListing = async (all) => {
    this.loading = true;
    try {
      let res = await apis.getAllListings(all || this.pageCount);
      res = this.handleAlllistings(res);
      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  getReviews = async (shortlet_id) => {
    this.reviewsLoading = true;
    try {
      let res = await apis.getReviews(shortlet_id);
      const sortedRes = [];

      for (const key in res) {
        if (res.hasOwnProperty(key) && key !== "ok") {
          sortedRes.push(res[key]);
        }
      }
      const totalRate = sortedRes?.reduce(
        (sum, obj) => sum + Number(obj.rate),
        0
      );
      this.currentReviews = res;
      this.currentReviewsValue = totalRate / sortedRes?.length;

      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.reviewsLoading = false;
    }
  };

  bookListing = async (
    data,
    isAuthenticated,
    router,
    extraData,
    makeBookingRequest
  ) => {
    if (!isAuthenticated) {
      this.pendingBookingForm = data;
      const pendingBookingData = {
        pendingBookingForm: data,
        id: this.currentListing?.id,
        extraData,
      };
      localStorage.setItem(
        PENDING_BOOKING_DATA,
        JSON.stringify(pendingBookingData)
      );
      router.push("/otp/send", { replace: false });
    } else {
      this.bookListingLoading = true;
      try {
        makeBookingRequest &&
          (await apis.bookListing(this.currentListing?.id, data));
        localStorage.removeItem(PENDING_BOOKING_DATA);
        router.push("/dashboard/bookings");
        successToast("Success", `Your booking was created successfully`);
      } catch (error) {
        this.error = error;
      } finally {
        this.bookListingLoading = false;
        AuthStore.setShowPaymentModal(false);
      }
    }
  };

  searchListings = async (data, page_number) => {
    this.searchLoading = true;
    try {
      let results = await apis.searchListing(page_number, data);
      results = results?.data;
      this.searchedListings = results;
      return results;
    } catch (error) {
      this.error = error;
    } finally {
      this.searchLoading = false;
    }
  };

  searchListingsById = async (shortlet_id) => {
    this.searchIdLoading = true;
    try {
      let results = await apis.searchListingById(shortlet_id);
      results = results?.shortlet;
      return results;
    } catch (error) {
      this.error = error;
    } finally {
      this.searchIdLoading = false;
    }
  };
  handleFindListing = async ({ url, router, route }) => {
    let currentListing;
    currentListing = await this.searchListingsById(url);
    if (currentListing) {
      let amenities = currentListing?.amenities || [];
      let allowances = currentListing?.allowances || [];
      let rules = currentListing?.rules || [];
      this.currentListing = currentListing;
      this.currentFeatures = [...amenities, ...allowances, ...rules];
    } else {
      router.push(route);
    }
    return currentListing;
  };

  addToFavourite = async (shortlet_id, isAuthenticated) => {
    if (isAuthenticated) {
      this.addingFavourite = true;
      try {
        let results = await apis.addFavouriteListing(shortlet_id);
        results = results?.message;
        return true;
      } catch (error) {
        this.error = error;
        return false;
      } finally {
        this.addingFavourite = false;
      }
    }
  };

  getFavouriteListings = async (isAuthenticated) => {
    if (isAuthenticated) {
      this.favouritesLoading = true;
      try {
        let res = await apis.getFavouriteListings();
        res = res?.data;
        this.favouriteListings = res;
        return res;
      } catch (error) {
        this.error = error;
      } finally {
        this.favouritesLoading = false;
      }
    }
  };

  getARR = async () => {
    this.amenitiesLoading = true;
    try {
      let res = await apis.getAAR();
      this.amenities = res?.amenities;
      this.allowances = res?.allowances;
      this.rules = res?.rules;
      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.amenitiesLoading = false;
    }
  };

  filterListings = async (data) => {
    if (JSON.stringify(data) === JSON.stringify(defaultFilterValues)) {
      return;
    }

    this.filterLoading = true;
    try {
      let results = await apis2.filterListings(data);
      results = results?.data;
      results = this.handleSortlistings(results);
      this.filteredListing = results?.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      return results;
    } catch (error) {
      this.error = error;
    } finally {
      this.filterLoading = false;
    }
  };

  debouncedFilter = debounce((data) => this.filterListings(data), 2000);

  clearFilter = (reload) => {
    this.filterData = defaultFilterValues;
    this.showFilteredListings = false;
    this.filteredListing = [];
    if (!reload) {
      this.reloadFilters = !this.reloadFilters;
    }
    if (reload) {
    }
  };
}
export default new ListingStore();
