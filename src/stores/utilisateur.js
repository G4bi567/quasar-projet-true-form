import { defineStore } from 'pinia';
import { date } from 'quasar';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    NewLogin: {
      name: '',
      mail: '',
      password: '',
    },
    isLogVar: false,
    followed: [],
    pp_profil: '',
  }),

  actions: {
    loginVariable(location) {
      if (location === 'localStorage') {
        this.isLogVar = true;
        localStorage.setItem('profil', JSON.stringify(this.NewLogin));
      }
    },
    logOut(location) {
      if (location === 'localStorage') {
        this.NewLogin = {
          name: '',
          email: '',
          password: '',
        };
        this.isLogVar = false;
        localStorage.setItem('profil', null);
      }
    },
    async profilload() {
      const newlogin = JSON.parse(localStorage.getItem('profil'));
      if (newlogin == null) {
        this.isLogVar = false;
      } else {
        this.isLogVar = true;

        this.NewLogin = newlogin;
      }
    },
  },
});
