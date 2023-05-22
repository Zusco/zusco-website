/**
 * Advanced example demonstrating all core MobX constructs.
 */

import { makeAutoObservable } from "mobx";
import apis from "services/auth";

import { successToast } from "components/general/toast/toast";
import { saveToStorage } from "utils/storage";

class AuthStore {
  // ====================================================
  // State
  // ====================================================
  user = null;
  otp_value = "";
  authState = "send";
  error = null;
  loading = false;
  loadingVerify = false;
  showAuthModal = false;
  showPaymentModal = false;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Computed views
  // ====================================================
  // While MobX promotes OOP, we can still benefit from using FP where it's appropriate

  // ====================================================
  // Actions
  // ====================================================

  setisAuthenticated = (item) => {
    this.isAuthenticated = item;
  };
  setShowAuthModal = (payload) => {
    this.showAuthModal = payload;
  };
  setShowPaymentModal = (payload) => {
    this.showPaymentModal = payload;
  };
  sendOtp = async (data, phone_number, router, isModal) => {
    this.loading = true;
    try {
      const res = await apis.sendOtp(data);
      this.otp_value = res?.otp_value;
      phone_number && saveToStorage("otp_phone_number", phone_number);
      if (isModal) {
        this.setAuthState("verify");
      } else {
        router && router?.push("/otp/verify");
      }

      const message = "Veification code successfully sent to your number";
      successToast(`Veification code sent`, message);
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  verifyOtp = async (data, logUserIn, isModal, handleLoginSuccess) => {
    this.loadingVerify = true;
    try {
      const res = await apis.verifyOtp(data);
      if (isModal) {
        this.setAuthState("sent");
      }
      this.setCurrentUser(res);
      logUserIn(res, "", isModal);
      this.isAuthenticated = true;
      isModal && handleLoginSuccess();
      const message = "You have successfully logged into your zusco account";
      successToast(`Successfully logged in`, message);
    } catch (error) {
      this.error = error;
    } finally {
      this.loadingVerify = false;
    }
  };

  setCurrentUser = (data) => {
    this.user = data;
  };

  setAuthState = (data) => {
    this.authState = data;
  };

  logout = () => {
    this.user = null;
    this.isAuthenticated = false;
  };
}

export default new AuthStore();
