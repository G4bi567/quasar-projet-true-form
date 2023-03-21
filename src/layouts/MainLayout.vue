<template>
  <q-layout style="box-sizing: border-box" view="hhh LpR fff">
    <q-header
      reveal
      elevated
      class="bg-#262D34 text-white"
      height-hint="98"
      style="padding: 5px 10px"
    >
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-tabs align="left">
          <q-route-tab
            to="/"
            @click="exitWriteCommentMode()"
            label="Home Page"
          />
        </q-tabs>

        <q-toolbar-title style="margin-left: 29%">
          <img
            bg-color="white"
            vertical-middle
            style="
              height: 35px;
              background-color: white;
              padding: 5px 10px;
              border-radius: 10px;
            "
            src="https://collegedusud.ch/wp-content/uploads/2017/11/logo_variante.png"
          />
          Forum CSUD
        </q-toolbar-title>
        <q-btn
          @click="writeCommentMode()"
          color="secondary"
          icon-right="fa-solid fa-pencil"
          label="Une question"
        />
        <!-- 
        <q-input
          dark
          dense
          standout
          v-model="text"
          input-class="text-right"
          class="q-ml-md"
        >
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
        </q-input>
        -->

        <q-fab
          v-model="fab2"
          label="Menu"
          external-label
          vertical-actions-align="left"
          color="none"
          direction="down"
          :hide-label="hideLabels"
        >
          <q-fab-action
            :hide-label="hideLabels"
            external-label
            color="primary"
            to="/settings"
            icon="settings"
            label="settings"
            @click="exitWriteCommentMode()"
          />
        </q-fab>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleRightDrawer"
          style="margin-left: 20px"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      behavior="normal"
      style="margin-left: 40px"
      bordered
    >
      <q-list>
        <q-item-label header
          >Ceci sera utilisé pour accéder à des pages de branches</q-item-label
        >
      </q-list>
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      behavior="normal"
      elevated
    >
      <q-list>
        <q-item-label header
          >Ceci sera utilisé pour mettre des liens utiles pour les
          élèves</q-item-label
        >
      </q-list>
    </q-drawer>
    <q-page-container style="background-color: #181818" v-show="login == false">
      <Login @logInFinished="TurnoffLogInPage()" />
    </q-page-container>
    <!-- première partie,si login est false, (login est une variable qui est false si il n'y a aucune donnée sur l'utilisateur), puis si c'est false affiche une page afin de pouvoir fournir les données-->
    <q-page-container
      style="background-color: #181818"
      v-show="writeComment == false"
    >
      <router-view @logout="logoutaccount()" />
    </q-page-container>
    <!-- deuxième partie,si writeComment est false, (writeComment est une variable qui est false s'il y a pas de demande pour écrire une publication), comme c'est false cela affiche la page des publications récentes, c'est à dire la page principale du site-->
    <q-page-container
      style="background-color: #181818"
      v-show="writeComment == true"
    >
      <createPost v-model="newPost" @finished="writeCommentMode()" />
    </q-page-container>
    <!-- troisième partie,si writeComment est true, (writeComment est une variable qui est true s'il y a une demande pour écrire une publication), comme c'est true cela affiche une page afin de pouvoir publier notre question ou problème-->
  </q-layout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import createPost from 'components/CreatePost.vue';
import Login from 'pages/LogInPage.vue';
import { date } from 'quasar';

const branches = [
  'Français ',
  'Allemand',
  'Anglais ',
  'Latin',
  'Italien ',
  'Latin ',
  'Grec',
  'Mathématiques',
  'Physique',
  'Chimie ',
  'Biologie ',
  'Histoire ',
  'Géographie',
  'Philisophie ',
  'Arts visuels',
  'Musique ',
  'Appl. des math. ',
  'Economie et droit',
  'Informatique ',
  'Sciences religieuses ',
  'Education physique ',
];

localStorage.setItem('Branches', JSON.stringify(branches));

const timeStamp = Date.now();
localStorage.setItem('date', date.formatDate(timeStamp, 'DD-MM-YYYY'));

localStorage.setItem(
  'pp_profil',
  'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg'
);

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const writeComment = ref(false);

const login = ref(localStorage.getItem('profil') === null ? false : true);

const pp_profil_img = localStorage.getItem('pp_profil');

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

function writeCommentMode() {
  writeComment.value = !writeComment.value;
}

function exitWriteCommentMode() {
  writeComment.value = false;
}

function logoutaccount() {
  localStorage.setItem('profil', null);
  login.value = false;
}

function TurnoffLogInPage() {
  login.value = true;
}
</script>
