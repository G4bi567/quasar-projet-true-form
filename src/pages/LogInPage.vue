<template>
  <div
    class="fullscreen bg-black text-white text-center q-pa-md flex flex-center"
  >
    <div class="flex flex-center">
      <q-input
        style="margin: 10px"
        outlined
        dark
        v-model="NewLogin.name"
        label="name "
      />
      <q-input
        style="margin: 10px"
        outlined
        dark
        v-model="NewLogin.mail"
        label="email"
      />
      <q-input
        style="margin: 10px"
        outlined
        dark
        v-model="NewLogin.password"
        label="password"
        type="password"
      />
    </div>
    <div class="flex flex-center" style="margin: 10px">
      <q-btn
        @click="
          loginVariable(NewLogin);
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

const NewLogin = reactive({
  name: '',
  mail: '',
  password: '',
});

function loginVariable(NewLogin) {
  localStorage.setItem('profil', JSON.stringify(NewLogin));
  NewLogin.name = '';
  NewLogin.mail = '';
  NewLogin.password = '';
}
</script>
