<template>
  <div>
    <div v-if="data">
      <p>User created: {{ data.createUser.username }}</p>
    </div>
    <button @click="onSubmit('jojaja', 'gagag@fdhsfsdahj.com', 'here')">
      Submit
    </button>
  </div>
</template>

<script setup>
import { useQuery, useMutation } from 'villus';
import { ref } from 'vue';

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
const { data, execute } = useMutation(CreateUserAndInsertReview);
const variables = {
  username: '',
  email: '',
  password_hash: '',
};

function onSubmit(username, email, password_hash) {
  variables.username = username;
  variables.email = email;
  variables.password_hash = password_hash;
  alert(1);
  execute(variables).then((result) => {
    if (result.error) {
      alert(2);
      alert(`${result.error}`);
    }
  });
}
</script>
