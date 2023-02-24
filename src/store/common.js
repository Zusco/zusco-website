/**
 * Advanced example demonstrating all core MobX constructs.
 */

import { makeAutoObservable } from "mobx";
import apis from "services/common";
import { successToast } from "components/general/toast/toast";
import { useAuth } from "hooks/auth";
import { saveUserInfoToStorage } from "utils/storage";

class CommonStore {
  // ====================================================
  // State
  // ====================================================
  products = [];

  query = "";
  category = "";
  sortAsc = true;

  fetched = false;
  fetching = false;
  me = null;
  error = null;
  loading = false;
  loadingFetchMe = false;

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
  getMe = async () => {
    if (localStorage.getItem("zusco-token") !== null) {
      this.loadingFetchMe = true;
      try {
        const res = await apis.getMe();
        this.me = res;
        saveUserInfoToStorage(res);
        return res;
      } catch (error) {
        this.error = error;
      } finally {
        this.loadingFetchMe = false;
      }
    }
  };

  updateMe = async ({ data, router, route }) => {
    if (localStorage.getItem("zusco-token") !== null) {
      this.loading = true;
      try {
        await apis.updateMe(data);
        const message = "You have successfully updated your profile";
        successToast(`Operation successful!`, message);
        this.getMe();
        router.push(route);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  };
}

export default new CommonStore();
