/**
 * Advanced example demonstrating all core MobX constructs.
 */

import { makeAutoObservable } from "mobx";

class MainDashboardStore {
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

  setCurrentUser = (data) => {
    this.user = data;
  };

  logout = () => {
    this.user = null;
  };
}

export default new MainDashboardStore();
