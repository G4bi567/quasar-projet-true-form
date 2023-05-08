<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="result && result.user">
      <div>id: {{ result.user.id }}</div>
      <div>username: {{ result.user.username }}</div>
      <div>email: {{ result.user.email }}</div>
      <div>password_hash: {{ result.user.password_hash }}</div>
    </div>
  </q-page>
</template>

<script lang="ts">
  import { useQuery } from '@vue/apollo-composable'
  import gql from 'graphql-tag'

  export default defineComponent({
    setup () {

      const { result, loading, error } = useQuery(gql`
        query GetAllUsers {
          user {
            id
            username
            email
            password_hash
          }
        }

      `)

      return { /* your other items, */ result, loading, error }
    }
  })
</script>