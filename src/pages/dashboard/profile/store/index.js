/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";

class ProfileStore {
  // ====================================================
  // State
  // ====================================================
  user = null;
  count = 0;
  error = null;
  loading = false;

  pushNotification = false;
  chatNotification = false;
  bannerNotification = false;

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

  toggleChat() {
    this.chatNotification = !this.chatNotification;
  }
  togglePush() {
    this.pushNotification = !this.pushNotification;
  }
  toggleBanner() {
    this.bannerNotification = !this.bannerNotification;
  }
}

export default new ProfileStore();
