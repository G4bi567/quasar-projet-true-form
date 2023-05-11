<template>
  <div class="fullscreen bg-black text-center q-pa-md flex flex-center">
    <div class="flex flex-center">
      <div v-show="method_log == true">
        <q-input
          style="margin: 10px"
          outlined
          dark
          v-model="UserStore.Profile.name"
          @keydown.enter="controlTheValues()"
          label="name "
        />
        <q-input
          style="margin: 10px"
          outlined
          dark
          v-model="UserStore.Profile.mail"
          @keydown.enter="controlTheValues()"
          label="email"
        />
        <q-input
          style="margin: 10px"
          outlined
          dark
          @keydown.enter="controlTheValues()"
          v-model="UserStore.Profile.password"
          label="password"
          type="password"
        />
        <div class="flex flex-center" style="margin: 10px">
          <q-btn
            unelevated
            rounded
            color="primary"
            label="Do you already have a account?"
            @click="changeLog()"
          ></q-btn>
        </div>
        <div class="flex flex-center" style="margin: 10px">
          <q-btn
            @click="controlTheValues()"
            unelevated
            rounded
            color="primary"
            label="Create a account"
          />
        </div>
        <div v-show="notcompleted == true" class="text-white">
          Il manque une entrée
        </div>
        <div v-show="toolong == true" class="text-white">
          Le nom de profil est trop long
        </div>
      </div>
      <div v-show="method_log == false">
        <q-input
          style="margin: 10px"
          outlined
          dark
          v-model="UserStore.Profile.mail"
          @keydown.enter="controlTheValues()"
          label="email"
        />
        <q-input
          style="margin: 10px"
          outlined
          dark
          @keydown.enter="controlTheValues()"
          v-model="UserStore.Profile.password"
          label="password"
          type="password"
        />
        <div class="flex flex-center" style="margin: 10px">
          <q-btn
            unelevated
            rounded
            color="primary"
            label="Do you want to create a account?"
            @click="changeLog()"
          ></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from 'stores/user.js';

//allows you to access the store
const UserStore = useUserStore();

//variable to display a message if all fields are not filled
const notcompleted = ref(false);

//variable to display a message if the username is too long
const toolong = ref(false);

const method_log = ref(true);

function changeLog() {
  method_log.value = !method_log.value;
}
//function that checks if the fields are correctly filled in
function controlTheValues() {
  //the variables display the message that at least one of the fields has not been filled in
  notcompleted.value = true;
  toolong.value = false;
  if (
    UserStore.Profile.name !== '' &&
    UserStore.Profile.mail !== '' &&
    UserStore.Profile.password !== ''
  ) {
    //the variables display the message that the profile name is too long
    toolong.value = true;
    notcompleted.value = false;
    if (UserStore.Profile.name.length < 20) {
      //the login is made
      toolong.value = false;
      alert(1);
      UserStore.loginVariable('localStorage');
    }
  }
}
</script>
