<template>
  <div class="fullscreen bg-black text-center q-pa-md flex flex-center">
    <div class="flex flex-center">
      <form
        v-show="method_log == true"
        @submit.prevent="controlTheValues('create')"
      >
        <q-input
          style="margin: 10px"
          outlined
          dark
          v-model="UserStore.Profile.name"
          label="name "
        />
        <q-input
          style="margin: 10px"
          outlined
          dark
          v-model="UserStore.Profile.mail"
          label="email"
        />
        <q-input
          style="margin: 10px"
          outlined
          dark
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
            type="submit"
            unelevated
            rounded
            color="primary"
            label="Create a account"
          />
          <div v-show="notcompleted == true" class="text-white">
            Il manque une entrée
          </div>
          <div v-show="toolong == true" class="text-white">
            Le nom de profil est trop long
          </div>
        </div>
      </form>
      <form
        v-show="method_log == false"
        @submit.prevent="controlTheValues('log')"
      >
        <q-input
          style="margin: 10px"
          outlined
          dark
          v-model="UserStore.Profile.mail"
          label="email"
        />
        <q-input
          style="margin: 10px"
          outlined
          dark
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
        <div class="flex flex-center" style="margin: 10px">
          <q-btn
            type="submit"
            unelevated
            rounded
            color="primary"
            label="Log In"
          />
          <div v-show="notcompleted == true" class="text-white">
            Il manque une entrée
          </div>
          <div v-show="UserStore.isAuth == false" class="text-white">
            Votre compte n'existe pas
          </div>
          <div v-show="UserStore.falsePass == true" class="text-white">
            Le mot de passe est faux
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from 'stores/user.js';
import { useQuery, useMutation } from 'villus';
import { ref, reactive } from 'vue';
import { gql } from 'graphql-tag';
import { watch, defineExpose, toRaw } from 'vue';

const GetQuestions = gql`
  query GetAllQuestions {
  questions {
    id
    title
    description
    created_at
    deepth
    questions_subjects{
      subject
    }
    questions_user{
      id
      username
      profil_photo
    }
    questions_replies{
      user{
        username
        profil_photo
      }
      id
      description
      deepth
      replies_replies{
        id
        user{
          username
          profil_photo
        }
        description
        deepth
      }
    }
    
  }
}
`;
const { data } = useQuery({
  query: GetQuestions,
});
//allows you to access the store
const UserStore = useUserStore();

//variable to display a message if all fields are not filled
const notcompleted = ref(false);

//variable to display a message if the username is too long
const toolong = ref(false);

const method_log = ref(true);

function changeLog() {
  method_log.value = !method_log.value;
  notcompleted.value = false;
  UserStore.Profile.name !== '';
  UserStore.Profile.mail !== '';
  UserStore.Profile.password !== '';
}
//function that checks if the fields are correctly filled in
function controlTheValues(method) {
  //the variables display the message that at least one of the fields has not been filled in
  notcompleted.value = true;
  toolong.value = false;
  if (
    method == 'create' &&
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
      UserStore.createUserAndInsertReview();
    }
  }
  if (
    method == 'log' &&
    UserStore.Profile.mail !== '' &&
    UserStore.Profile.password !== ''
  ) {
    notcompleted.value = false;
    UserStore.loginVariable('db', method);
  }
}
</script>
