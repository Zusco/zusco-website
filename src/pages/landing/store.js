/**
 * Advanced example demonstrating all core MobX constructs.
 */

import { makeAutoObservable } from "mobx";

class MainLandingStore {
  // ====================================================
  // State
  // ====================================================

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

  setCurrentData = (data) => {
    this.allListings = data;
  };

  nextPage = () => {
    this.max = this.max + 12;
    this.change = false;
  };

  logout = () => {
    this.user = null;
  };
}

export default new MainLandingStore();
