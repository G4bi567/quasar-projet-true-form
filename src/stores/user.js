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
    isAuth: false,
  }),

  actions: {
    async loginVariable(location) {
      // Delete db/localStorage
      if (location === 'localStorage') {
        alert(2);
        this.isLogVar = true;
        localStorage.setItem('profile', JSON.stringify(this.Profile));
        this.pp_profile =
          'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg';
        localStorage.setItem('pp_profile', this.pp_profile);
      } else {
        alert(3);
        const GetUserByEmailAndPassword = gql`
          query GetUserByEmailAndPassword($email: String!, $password: String!) {
            user(where: { email: { _eq: $email }, password_hash: { _eq: $password } }) {
              username
              profil_photo
            }
          }
        `;

        const { data } = useQuery({
          query: GetUserByEmailAndPassword,
          variables: {
            email: 'asdfasdfs@gmail.com', // Replace with the actual email
            password: 'fdasfdsafasfasdf', // Replace with the actual password
          },
        });
        console.log(data);
        if (data.user) {
          this.isAuth = true;
          alert('attention');
        } else {
          this.isLogVar = true;
          this.Profile.name = data.user.username;
          this.Profile.mail = '';
          this.Profile.password = '';
          localStorage.setItem('profile', JSON.stringify(this.Profile));
          this.pp_profile =
            'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg';
          localStorage.setItem('pp_profile', this.pp_profile);
        }
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
