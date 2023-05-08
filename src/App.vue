<template>
  <router-view />
</template>

<script setup>
import { useClient } from 'villus';
import { defineComponent } from 'vue';

defineComponent({
  name: 'App',
});

useClient({
  url: 'https://pleased-spaniel-49.hasura.app/v1/graphql',
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret':
      'Il0IFkTm1C3SgZPk1y1hrp4hsidxML2uNyswlzrMH3l0kRQLxQnWNfFIzE1IJ9cy',
  },
});
</script>
