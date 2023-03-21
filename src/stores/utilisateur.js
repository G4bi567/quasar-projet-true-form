import { defineStore } from 'pinia';
import { date } from 'quasar';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    NewLogin: {
      name: '',
      mail: '',
      password: '',
    },

  }),

  actions: {
    loginVariable(NewLogin, location) {
      if (location === 'localStorage') {
        localStorage.setItem('profil', JSON.stringify(NewLogin));
        NewLogin = {
          name: '',
          mail: '',
          password: '',
        };
      }
    },
  },
});
