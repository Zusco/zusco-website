/**
 * Advanced example demonstrating all core MobX constructs.
 */
import {
  computed,
  autorun,
  action,
  makeAutoObservable,
  observable,
} from "mobx";
import moment from "moment";

class DetailsStore {
  // ====================================================
  // State
  // ====================================================
  user = null;
  count = 0;
  error = null;
  loading = false;
  startDate = new Date();
  endDate = new Date();

  noOfGuest = 0;
  price = 25000;
  otherFees = 2000;

  constructor() {
    makeAutoObservable(this, {
      calcDiff: computed,
      totalPrice: computed,
      totalFees: computed,
      startDate: observable,
      endDate: observable,
      setStartDate: action,
      setEndDate: action,
    });
  }

  // ====================================================
  // Computed views

  get calcDiff() {
    const date1 = new Date(moment(this.startDate).format("l"));

    const date2 = new Date(moment(this.endDate).format("l"));

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const difference = diffDays;

    return difference;
  }

  get totalPrice() {
    const sum = this.price * this.calcDiff;
    return sum;
  }
  get totalFees() {
    const total = this.price * this.calcDiff + this.otherFees;
    return total;
  }

  // ====================================================
  // While MobX promotes OOP, we can still benefit from using FP where it's appropriate
  get token() {
    return this.user.token;
  }

  // ====================================================
  // Actions
  // ====================================================

  setStartDate(item) {
    this.startDate = item;
  }
  setEndDate(item) {
    this.endDate = item;
  }

  addGuest() {
    this.noOfGuest = this.noOfGuest + 1;
  }

  subtractGuest() {
    this.noOfGuest = this.noOfGuest - 1;
    if (this.noOfGuest < 0) {
      this.noOfGuest = 0;
    }
  }
}

export default new DetailsStore();
