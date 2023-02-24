/* eslint-disable no-param-reassign */
const TOKEN = "zusco-token";
const USER_DATA = "zusco-user-data";
const LAST_CURRENT_BUSINESS = "zusco-lcb";
export const ACCOUNT_CREATED = "ACCOUNT_CREATED";
export const PENDING_BOOKING_DATA = "pending-bkg";

export const saveToken = (token) => {
  try {
    localStorage.setItem(TOKEN, token);
  } catch (e) {
    return e;
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN);
  } catch (e) {
    return e;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    return e;
  }
};

export const getFromStorage = (key) => {
  try {
    localStorage.getItem(key);
  } catch (e) {
    return e;
  }
};

export const saveUserInfoToStorage = (payload) => {
  try {
    if (payload.token) {
      delete payload.token;
    }
    localStorage.setItem(USER_DATA, JSON.stringify(payload));
    return payload;
  } catch (e) {
    return e;
  }
};

export const getUserInfoFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_DATA));
  } catch (error) {
    return error;
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (e) {
    return e;
  }
};

export const getLastCurrentBusiness = () => {
  try {
    return localStorage.get(LAST_CURRENT_BUSINESS);
  } catch (e) {
    return e;
  }
};

export const saveCurrentBusiness = (businessID) => {
  try {
    localStorage.setItem(LAST_CURRENT_BUSINESS, businessID);
  } catch (e) {
    return e;
  }
};

export const saveAccountCreation = (payload) => {
  try {
    localStorage.setItem(ACCOUNT_CREATED, JSON.stringify(payload));
    return payload;
  } catch (e) {
    return e;
  }
};

export const getAccountCreation = () => {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNT_CREATED));
  } catch (error) {
    return error;
  }
};

export const clearAccountCreation = () => {
  try {
    localStorage.removeItem(ACCOUNT_CREATED);
  } catch (e) {
    return e;
  }
};

export const clearUserDetails = () => {
  try {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER_DATA);
    localStorage.removeItem(PENDING_BOOKING_DATA);
  } catch (e) {
    return e;
  }
};
