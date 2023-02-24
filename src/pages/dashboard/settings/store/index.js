/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import { successToast } from "components/general/toast/toast";
import apis from "services/settings";

class SettingsStore {
  // ====================================================
  // State
  // ====================================================

  settings = null;
  error = null;
  loading = false;
  updateLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Actions
  // ====================================================

  getSettings = async () => {
    this.loading = true;
    try {
      const res = await apis.getSettings();
      this.settings = res;
      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  updateSettings = async (data) => {
    this.updateLoading = true;
    try {
      const res = await apis.updateSettings(data);
      this.settings = res;
      successToast(`Operation successful!`, "");
    } catch (error) {
      this.error = error;
    } finally {
      this.updateLoading = false;
    }
  };
}

export default new SettingsStore();
