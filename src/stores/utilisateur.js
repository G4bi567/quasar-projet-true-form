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
        this.pp_profil =
          'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg';
        localStorage.setItem('profil', null);
      }
    },
    changePpProfil(newLink) {
      localStorage.setItem('pp_profil', newLink);

      this.pp_profil = newLink.value;

      newLink = '';
    },
    async profilload() {
      const newlogin = JSON.parse(localStorage.getItem('profil'));
      if (newlogin == null) {
        this.isLogVar = false;
      } else {
        this.isLogVar = true;
        this.pp_profil = localStorage.getItem('pp_profil');
        this.NewLogin = newlogin;
      }
    },
  },
});
