/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";

class ExploreStore {
  // ====================================================
  // State
  // ====================================================
  user = null;
  count = 0;
  error = null;
  loading = false;

  apartmentPackage = "zuscoShortlets";
  filter = false;
  noOfRoom = 0;
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

  toggleFilter() {
    this.filter = !this.filter;
    console.log("filter works");
  }

  addRoom() {
    this.noOfRoom = this.noOfRoom + 1;
  }

  subtractRoom() {
    this.noOfRoom = this.noOfRoom - 1;
    if (this.noOfRoom < 0) {
      this.noOfRoom = 0;
    }
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
}

export default new ExploreStore();
