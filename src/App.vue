<template>
  <router-view />
</template>

<script setup>
import { useClient, defaultPlugins } from 'villus';
import { defineComponent } from 'vue';

defineComponent({
  name: 'App',
});
function authPlugin({ opContext }) {
  opContext.headers['Content-Type'] = 'application/json';
  opContext.headers['x-hasura-admin-secret'] =
    'Il0IFkTm1C3SgZPk1y1hrp4hsidxML2uNyswlzrMH3l0kRQLxQnWNfFIzE1IJ9cy';
}

useClient({
  url: 'https://pleased-spaniel-49.hasura.app/v1/graphql',
  use: [authPlugin, ...defaultPlugins()],
});
</script>
