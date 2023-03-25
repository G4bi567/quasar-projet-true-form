<template>
  <q-layout class="backgroundTemplate bgColor" view="hhh LpR fff">
    <q-header reveal elevated class="bg-secondary text-white paddHeader">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-tabs align="left">
          <q-route-tab to="/" @click="ResetMode()" label="Home Page" />
          <q-route-tab to="/" @click="followedComments()" label="Suivis" />
        </q-tabs>

        <q-toolbar-title class="centerText">
          <img
            class="verticalAlign imgOptions"
            src="https://collegedusud.ch/wp-content/uploads/2017/11/logo_variante.png"
          />
          <h7 class="verticalAlign, title">Forum CSUD</h7>
        </q-toolbar-title>
        <q-btn
          @click="writeCommentMode()"
          class="colorTopObjects"
          icon-right="fa-solid fa-pencil"
          label="Une question"
        />

        <q-fab
          v-model="fabVar"
          class="colorTopObjects marginMenu"
          label="Menu"
          vertical-actions-align="left"
          icon="keyboard_arrow_down"
          direction="down"
        >
          >
          <q-fab-action
            external-label
            color="primary"
            to="/settings"
            icon="settings"
            label="settings"
            @click="ResetMode()"
          />
        </q-fab>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      behavior="normal"
      bordered
    >
      <q-item-label header>
        <div v-for="branche in branches" :key="branche">
          <q-item clickable to="/" @click="getTo(branche)">
            <q-item-section>
              <q-item-label>{{ branche }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-item-label>
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      behavior="normal"
      elevated
      ><q-item-label header>
        <div v-for="lien in liensUtiles" :key="lien.title" v-bind="lien">
          <q-item clickable tag="a" target="_blank" :href="lien.link">
            <q-item-section>
              <q-item-label>{{ lien.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-item-label>
    </q-drawer>
    <q-page-container class="bgColor" v-show="login == false">
      <Login @logInFinished="TurnoffLogInPage()" />
    </q-page-container>
    <!-- première partie,si login est false, (login est une variable qui est false si il n'y a aucune donnée sur l'utilisateur), puis si c'est false affiche une page afin de pouvoir fournir les données-->
    <q-page-container class="bgColor" v-show="writeComment == false">
      <router-view @logout="logoutaccount()" />
    </q-page-container>
    <!-- deuxième partie,si writeComment est false, (writeComment est une variable qui est false s'il y a pas de demande pour écrire une publication), comme c'est false cela affiche la page des publications récentes, c'est à dire la page principale du site-->
    <q-page-container class="bgColor" v-show="writeComment == true">
      <createPost @finished="isAvailable()" />
    </q-page-container>
    <!-- troisième partie,si writeComment est true, (writeComment est une variable qui est true s'il y a une demande pour écrire une publication), comme c'est true cela affiche une page afin de pouvoir publier notre question ou problème-->
  </q-layout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import createPost from 'components/CreatePost.vue';
import Login from 'pages/LogInPage.vue';
import { date } from 'quasar';
import { useUserStore } from 'stores/utilisateur.js';
import { useCommentStore } from 'stores/comment.js';

//permet d'accéder au store
const CommentStore = useCommentStore();
//permet d'accéder au store

const UserStore = useUserStore();

const fabVar = ref(false);

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
const liensUtiles = [
  {
    title: 'Deepl',
    link: 'https://www.deepl.com/translator',
  },
  {
    title: 'SlideGo',
    link: 'https://slidesgo.com/',
  },
];
localStorage.setItem('Branches', JSON.stringify(branches));

localStorage.setItem(
  'pp_profil',
  'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg'
);

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const writeComment = ref(false);

const login = ref(localStorage.getItem('profil') === null ? false : true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
function isAvailable() {
  if (CommentStore.isAvailableVar == true) {
    writeCommentMode();
  }
}

function writeCommentMode() {
  writeComment.value = !writeComment.value;
}

function ResetMode() {
  writeComment.value = false;
  CommentStore.filteroptiontype = null;
}

function logoutaccount() {
  localStorage.setItem('profil', null);
  localStorage.setItem(
    'pp_profil',
    'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg'
  );
  login.value = false;
}

function TurnoffLogInPage() {
  if (localStorage.getItem('profil') !== 'null') {
    login.value = true;
  }
}

function followedComments() {
  CommentStore.filteroptiontype = 'follow';
  CommentStore.filteroption = 'Suivis';
}
function getTo(title) {
  CommentStore.filteroption = title;
  CommentStore.filteroptiontype = 'branche';
}
</script>
<style>
.backgroundTemplate {
  box-sizing: border-box;
}
.bgColor {
  background-color: #181818;
}
.paddHeader {
  padding: 5px 10px;
}
.centerText {
  text-align: center;
}
.verticalAlign {
  vertical-align: middle;
}
.title {
  margin-left: 5px;
}
.imgOptions {
  height: 35px;
  background-color: white;
  padding: 5px 10px;
  border-radius: 10px;
}
.colorTopObjects {
  background: #484e55;
}
.marginMenu {
  margin: 0px 10px 0px 10px;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
