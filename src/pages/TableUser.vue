<template>
  <div>
    Bonjour
    <ul v-if="data">
      <li v-for="user in data.users" :key="user.id">
        {{ user.username }} | {{ user.email }} | {{ user.password_hash }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useQuery } from 'villus';
import { gql } from 'graphql-tag';

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
</script>
