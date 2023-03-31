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
    pp_profile: '',
  }),

  actions: {
    loginVariable(location) {
      if (location === 'localStorage') {
        this.isLogVar = true;
        localStorage.setItem('profile', JSON.stringify(this.NewLogin));
        this.pp_profile =
          'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg';
        localStorage.setItem('pp_profile', this.pp_profile);
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

        localStorage.setItem('profile', null);
      }
    },
    changePpProfile(newLink) {
      localStorage.setItem('pp_profile', newLink);

      this.pp_profil = newLink.value;

      newLink = '';
    },
    async profileload() {
      const newlogin = JSON.parse(localStorage.getItem('profile'));
      if (newlogin == null) {
        this.isLogVar = false;
      } else {
        this.isLogVar = true;
        this.pp_profile = localStorage.getItem('pp_profile');
        this.NewLogin = newlogin;
      }
    },
  },
});
