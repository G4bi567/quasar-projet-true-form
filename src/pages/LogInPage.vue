<template>
  <div class="fullscreen bg-black text-center q-pa-md flex flex-center">
    <div class="flex flex-center">
      <q-input
        style="margin: 10px"
        outlined
        dark
        v-model="UserStore.NewLogin.name"
        @keydown.enter="
          controlTheValues();
          $emit(`logInFinished`);
        "
        label="name "
      />
      <q-input
        style="margin: 10px"
        outlined
        dark
        v-model="UserStore.NewLogin.mail"
        @keydown.enter="
          controlTheValues();
          $emit(`logInFinished`);
        "
        label="email"
      />
      <q-input
        style="margin: 10px"
        outlined
        dark
        @keydown.enter="
          controlTheValues();
          $emit(`logInFinished`);
        "
        v-model="UserStore.NewLogin.password"
        label="password"
        type="password"
      />
    </div>

    <div class="flex flex-center" style="margin: 10px">
      <q-btn
        @click="
          controlTheValues();
          $emit(`logInFinished`);
        "
        unelevated
        rounded
        color="primary"
        label="Log in"
      />
    </div>
    <div v-show="notcompleted == true" class="text-white">
      Il manque une entrée
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from 'stores/utilisateur.js';

//permet d'accéder au store
const UserStore = useUserStore();
const notcompleted = ref(false);

function controlTheValues() {
  notcompleted.value = true;

  if (
    UserStore.NewLogin.name !== '' &&
    UserStore.NewLogin.mail !== '' &&
    UserStore.NewLogin.password !== ''
  ) {
    notcompleted.value = false;

    UserStore.loginVariable('localStorage');
  }
}
</script>
