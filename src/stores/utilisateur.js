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
      alert(1);
      const newlogin = JSON.parse(localStorage.getItem('profil'));
      localStorage.setItem('loginvar3', JSON.stringify(newlogin));
      alert(1);
      if (newlogin == null) {
        this.isLogVar = false;
        alert(this.isLogVar);
      } else {
        alert(2);
        this.isLogVar = true;
        this.NewLogin = JSON.parse(newlogin);
        alert(1);
        localStorage.setItem('loginvar5', JSON.stringify(this.NewLogin));
      }
    },
  },
});
