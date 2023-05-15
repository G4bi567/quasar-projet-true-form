import { defineStore } from 'pinia';
import { date } from 'quasar';
import { useQuery, useMutation, createClient, defaultPlugins } from 'villus';
import { ref, reactive } from 'vue';
import { gql } from 'graphql-tag';
import { watch, defineExpose, toRaw } from 'vue';
import { computed } from 'vue';

function authPlugin({ opContext }) {
  opContext.headers['Content-Type'] = 'application/json';
  opContext.headers['x-hasura-admin-secret'] =
    'Il0IFkTm1C3SgZPk1y1hrp4hsidxML2uNyswlzrMH3l0kRQLxQnWNfFIzE1IJ9cy';
}

// Create a new client
const client = createClient({
  url: 'https://pleased-spaniel-49.hasura.app/v1/graphql',
  use: [authPlugin, ...defaultPlugins()],
});
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
    async createUserAndInsertReview() {
      const CreateUserAndInsertReview = `
          mutation CreateUserAndInsertReview(
            $username: String!,
            $email: String!,
            $password_hash: String!,
          ) {
            insert_user_one(object: { username: $username, email: $email, password_hash: $password_hash}) {
              id
              username
              email
              password_hash
              profil_photo
            }
          }
        `;

      const { execute } = useMutation(CreateUserAndInsertReview, {
        manualClient: client,
      });

      const variables = {
        username: this.Profile.name,
        email: this.Profile.mail,
        password_hash: this.Profile.password,
      };

      const result = await execute(variables);

      if (result.error) {
        alert(`${result.error}`);
      } else {
        alert(`User created successfully!`);
        // Optionally, update the store state with the created user's data
        this.id = result.data.insert_user_one.id;
        this.profil_photo = result.data.insert_user_one.profil_photo;
      }
      this.isAuth = true;
      this.falsePass = false;
      this.isLogVar = true;
      this.Profile.mail = '';
      this.Profile.password = '';
      localStorage.setItem('profile', JSON.stringify(this.Profile));
      this.pp_profile =
        'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg';
      localStorage.setItem('pp_profile', this.pp_profile);
    },
    async loginVariable(location, method) {
      // Delete db/localStorage
      if (location === 'localStorage') {
        this.isLogVar = true;
        localStorage.setItem('profile', JSON.stringify(this.Profile));
        this.pp_profile =
          'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg';
        localStorage.setItem('pp_profile', this.pp_profile);
      } else {
        if (method == 'log') {
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
            const { execute } = useQuery({
              query: GetUserByEmail,
              variables,
            });

            const { data, error } = await execute();
            console.log(data.user.length);
            if (data.user.length == 0) {
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
            this.Profile.id = data.user[0].id;
            console.log(data);
            this.Profile.name = data.user[0].username;
            this.Profile.mail = '';
            this.Profile.password = '';
            localStorage.setItem('profile', JSON.stringify(this.Profile));
            this.pp_profile = data.user[0].profil_photo;
            localStorage.setItem('pp_profile', this.pp_profile);
          }
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
          id: '',
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
        const UpdateProfilePhoto = `
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
