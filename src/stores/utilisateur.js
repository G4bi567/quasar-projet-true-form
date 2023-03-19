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
    async loadComments(location) {},

    async addComment(comment, location) {},

    loginVariable(NewLogin, location) {
      if (location === 'localStorage') {
        localStorage.setItem('profil', JSON.stringify(NewLogin));
        NewLogin.name = '';
        NewLogin.mail = '';
        NewLogin.password = '';
      }
    },
  },
});
