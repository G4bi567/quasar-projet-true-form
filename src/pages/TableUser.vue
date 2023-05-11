<template>
  <div>
    <q-card-section>
      <q-form @submit="onSubmit(variables)">
        <q-input outlined v-model="variables.username" label="Username" />
        <q-input
          outlined
          v-model="variables.email"
          label="Email"
          type="email"
        />
        <q-input
          outlined
          v-model="variables.password_hash"
          label="Password"
          type="password"
        />
        <q-btn
          label="Sign Up"
          type="submit"
          color="primary"
          class="q-mt-md"
          :loading="loading"
        />
      </q-form>
    </q-card-section>

    <ul v-if="data">
      <li v-for="user in data.user" :key="user.id">
        {{ user.username }} | {{ user.email }} | {{ user.password_hash }}
      </li>
    </ul>
    <button @click="onSubmit(variables)">Submit</button>
  </div>
</template>

<script setup>
import { useQuery, useMutation } from 'villus';
import { ref, reactive } from 'vue';
import { gql } from 'graphql-tag';
import { watch, defineExpose, toRaw } from 'vue';

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
const dataRef = reactive({});
watch(
  () => data.value,
  (newData, oldData) => {
    if (newData) {
      dataRef.value = newData.user[0];
      console.log(dataRef.value);
      console.log(data);
    }
  },
  { deep: true }
);

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

const { data_modify, execute } = useMutation(CreateUserAndInsertReview);

const variables = reactive({
  username: '',
  email: '',
  password_hash: '',
});

function onSubmit(variables) {
  alert(1);
  execute(variables).then((result) => {
    if (result.error) {
      alert(2);
      alert(`${result.error}`);
    } else {
      alert(3);
      alert(`User created successfully!`);
    }
  });
}
</script>
