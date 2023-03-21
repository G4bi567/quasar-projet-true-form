<template>
  <div class="fullscreen bg-black text-center q-pa-md flex flex-center">
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
        @keyup.enter="controlTheValues()"
        v-model="UserStore.NewLogin.password"
        label="password"
        type="password"
      />
    </div>
    <div class="text-white" v-show="notcompleted.value">
      Il manque une entrée
    </div>
    <div class="flex flex-center" style="margin: 10px">
      <q-btn
        @click="controlTheValues()"
        unelevated
        rounded
        color="primary"
        label="Log in"
      />
    </div>
  </div>
  <div class="text-white" v-show="notcompleted.value == true">
    Il manque une entrée
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from 'stores/utilisateur.js';

//permet d'accéder au store
const UserStore = useUserStore();
const notcompleted = ref(false);

function controlTheValues() {
  alert(notcompleted.value);
  notcompleted.value = true;
  alert(notcompleted.value);
  if (
    UserStore.NewLogin.name !== '' &&
    UserStore.NewLogin.mail !== '' &&
    UserStore.NewLogin.password !== ''
  ) {
    alert(333);
    notcompleted.value = false;
    UserStore.loginVariable(UserStore.NewLogin, 'localStorage');
    $emit(`logInFinished`);
  }
}
</script>
