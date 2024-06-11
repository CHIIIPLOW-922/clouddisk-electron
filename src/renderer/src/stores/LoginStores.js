import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    failedAttempts: 0,
    showCaptcha: false,
  }),
  actions: {
    incrementFailedAttempts() {
      this.failedAttempts++;
      if (this.failedAttempts > 2) {
        this.showCaptcha = true;
      }
    },
    resetFailedAttempts() {
      this.failedAttempts = 0;
      this.showCaptcha = false;
    },
  },
})
