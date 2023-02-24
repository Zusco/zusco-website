/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";

class MessagesStore {
  // ====================================================
  // State
  // ====================================================
  conversations = null;
  chats = null;
  currentChat = null;
  currentChatRef = null;
  externalChat = null;
  error = null;
  loading = false;

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

  setConversations = (data) => {
    this.conversations = data;
  };
  setCurrentChat = (data) => {
    this.currentChat = data;
  };
  setCurrentChatRef = (data) => {
    this.currentChatRef = data;
  };
  setChats = (data) => {
    this.chats = data;
  };
  setLoading = (data) => {
    this.loading = data;
  };
  setExternalChat = (data) => {
    this.externalChat = data;
  };
}

export default new MessagesStore();
