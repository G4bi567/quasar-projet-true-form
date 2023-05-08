import { defineStore } from 'pinia';
import { date } from 'quasar';
import { useQuery, useMutation } from 'villus';
import { ref, reactive } from 'vue';
import { gql } from 'graphql-tag';
import { watch, defineExpose, toRaw } from 'vue';




export const useUserStore = defineStore('userStore', {
  state: () => ({
    Profile: {
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
      // Delete db/localStorage
      if (location === 'localStorage') {
        this.isLogVar = true;
        localStorage.setItem('profile', JSON.stringify(this.Profile));
        this.pp_profile =
          'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg';
        localStorage.setItem('pp_profile', this.pp_profile);
      }else{
        const GetUsers = gql`
          query GetAllUsers {
            user {
              id
              username
              email
              password_hash
            }
          }
        `;

        const { data } = useQuery({
          query: GetUsers,
        });
        this.isLogVar = true;
        localStorage.setItem('profile', JSON.stringify(this.Profile));
        this.pp_profile =
          'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg';
        localStorage.setItem('pp_profile', this.pp_profile);
      }
    },
    logOut(location) {
      // Delete db/localStorage
      if (location === 'localStorage') {
        //reset the values of the profile
        this.Profile = {
          name: '',
          email: '',
          password: '',
        };
        //shows the LogInPage
        this.isLogVar = false;
        //sets the profile informations to null
        localStorage.setItem('profile', null);
      }
    },
    changePpProfile(newLink) {
      //stocks the profile photo link in the localStorage
      localStorage.setItem('pp_profile', newLink);

      this.pp_profil = newLink.value;
      //resets the value
      newLink = '';
    },
    async profileload() {
      //search for a variable in the localStorage
      const newlogin = JSON.parse(localStorage.getItem('profile'));
      if (newlogin == null) {
        //if there is nothing, it opens the LogInPage
        this.isLogVar = false;
      } else {
        //if there is the informations, it loads the infos
        this.isLogVar = true;
        this.pp_profile = localStorage.getItem('pp_profile');
        this.Profile = newlogin;
      }
    },
  },
});
