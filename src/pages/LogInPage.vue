<template>
  <div
    class="fullscreen bg-black text-white text-center q-pa-md flex flex-center"
  >
    <div class="flex flex-center">
      <q-input
        style="margin: 10px"
        outlined
        dark
        v-model="UserStore.NewLogin.name"
        label="name "
      />
      <q-input
        style="margin: 10px"
        outlined
        dark
        v-model="UserStore.NewLogin.mail"
        label="email"
      />
      <q-input
        style="margin: 10px"
        outlined
        dark
        v-model="UserStore.NewLogin.password"
        label="password"
        type="password"
      />
    </div>
    <div class="flex flex-center" style="margin: 10px">
      <q-btn
        @click="
          UserStore.loginVariable(NewLogin, 'localStorage');
          $emit(`logInFinished`);
        "
        unelevated
        rounded
        color="primary"
        label="Log in"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useUserStore } from 'stores/utilisateur.js';

//permet d'accéder au store
const UserStore = useUserStore();
</script>
