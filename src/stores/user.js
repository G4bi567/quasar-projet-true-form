import { defineStore } from 'pinia';
import { date } from 'quasar';
import { useQuery, useMutation } from 'villus';
import { ref, reactive } from 'vue';
import { gql } from 'graphql-tag';
import { watch, defineExpose, toRaw } from 'vue';
import { computed } from 'vue';
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
    isAuth: true,
    falsePass: false,
  }),

  actions: {
    async loginVariable(location, method) {
      // Delete db/localStorage
      if (location === 'localStorage') {
        this.isLogVar = true;
        localStorage.setItem('profile', JSON.stringify(this.Profile));
        this.pp_profile =
          'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg';
        localStorage.setItem('pp_profile', this.pp_profile);
      } else {
        const GetUserByEmailAndPassword = gql`
        query GetUserByEmailAndPassword($email: String!, $password: String!) {
          user(where: { email: { _eq: $email }, password_hash: { _eq: $password } }) {
            id
            username
            profil_photo
          }
        }
        `;
        const variables = {
          email: this.Profile.mail, // Replace with the actual email
          password: this.Profile.password, // Replace with the actual password
        };
        const { execute } = useQuery({
          query: GetUserByEmailAndPassword,
          variables,
        });

        const { data, error } = await execute();
        console.log(data);
        if (error) {
          console.error('GraphQL Error: ', error);
          // Handle your error here
        }
        if (!data.user[0]) {
          const GetUserByEmail = gql`
        query GetUserByEmail($email: String!) {
          user(where: { email: { _eq: $email } }) {
            id
          }
        }
        `;
          const variables = {
            email: this.Profile.mail, // Replace with the actual email
          };
          const { execute } = useMutation({
            query: GetUserByEmail,
            variables,
          });

          const { data, error } = await execute();
          console.log(data);
          if (!data.user[0]) {
            this.isAuth = false;
            this.falsePass = false;
          } else {
            this.falsePass = true;
            this.isAuth = true;
          }
        } else {
          this.isAuth = true;
          this.falsePass = false;
          this.isLogVar = true;
          this.Profile.name = data.user[0].username;
          this.Profile.mail = '';
          this.Profile.password = '';
          localStorage.setItem('profile', JSON.stringify(this.Profile));
          this.pp_profile = data.user[0].profil_photo;
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
    async changePpProfile(newLink, location) {
      if (location == 'localStorage') {
        //stocks the profile photo link in the localStorage
        localStorage.setItem('pp_profile', newLink);

        this.pp_profil = newLink.value;
        //resets the value
        newLink = '';
      } else {
        alert(1);
        localStorage.setItem('pp_profile', newLink);
        const UpdateProfilePhoto = gql`
        mutation UpdateProfilePhoto($username: String!, $photoUrl: String!) {
          update_user(where: { username: { _eq: $username } }, _set: { profil_photo: $photoUrl }) {
            affected_rows
          }
        }
        
        `;
        const variables = {
          username: this.Profile.name,
          photoUrl: newLink.value, // Replace with the actual email
        };
        const { data, execute } = useMutation(UpdateProfilePhoto);
        await execute(variables);
        console.log(data);
        newLink = '';
      }
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
