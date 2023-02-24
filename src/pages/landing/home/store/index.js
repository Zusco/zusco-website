/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";

class LandingStore {
  // ====================================================
  // State
  // ====================================================
  user = null;
  count = 0;
  error = null;
  loading = false;

  apartmentPackage = "zuscoShortlets";

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

  isZuscoShortlets() {
    this.apartmentPackage = "zuscoShortlets";
    console.log("shortlets");
  }

  isPopular() {
    this.apartmentPackage = "popular";
    console.log("popular");
  }

  isFeatured() {
    this.apartmentPackage = "featured";
    console.log(this.apartmentPackage);
  }

  isNew() {
    this.apartmentPackage = "new";
    console.log(this.apartmentPackage);
  }
}

export default new LandingStore();
