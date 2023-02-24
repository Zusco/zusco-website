/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import apis from "services/filter";

class FilterStore {
  // ====================================================
  // State
  // ====================================================
  user = null;
  count = 0;
  error = null;
  loading = false;

  filterLoading = false;
  filteredListing = [];
  error = null;

  filter = false;
  min = 1000;
  max = 400000;
  thumbsize = 14;

  avg = (this.min + this.max) / 2;
  minVal = this.avg;
  maxVal = this.avg;

  minPercent = ((this.minVal - this.min) / (this.avg - this.min)) * 100;
  maxPercent = ((this.maxVal - this.avg) / (this.max - this.avg)) * 100;

  constructor() {
    makeAutoObservable(this, {});
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

  toggleFilter() {
    this.filter = !this.filter;
  }

  setMinVal(target) {
    this.avg = (this.maxVal + this.minVal) / 2;
    this.minVal = Number(target.value);
    this.minPercent = ((this.minVal - this.min) / (this.avg - this.min)) * 100;
    this.maxPercent = ((this.maxVal - this.avg) / (this.max - this.avg)) * 100;
  }

  setMaxVal(target) {
    this.avg = (this.maxVal + this.minVal) / 2;
    this.maxVal = Number(target.value);
    this.minPercent = ((this.minVal - this.min) / (this.avg - this.min)) * 100;
    this.maxPercent = ((this.maxVal - this.avg) / (this.max - this.avg)) * 100;
  }

  filterListings = async (data) => {
    this.filterLoading = true;
    try {
      let results = await apis.filterListings(data);
      results = results?.data;
      this.filteredListing = results;
      console.log("filtered results", results);
      return results;
    } catch (error) {
      this.error = error;
    } finally {
      this.filterLoading = false;
    }
  };
}

export default new FilterStore();
