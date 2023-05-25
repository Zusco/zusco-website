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
  }

  isPopular() {
    this.apartmentPackage = "popular";
  }

  isFeatured() {
    this.apartmentPackage = "featured";
  }

  isNew() {
    this.apartmentPackage = "new";
  }
}

export default new LandingStore();
