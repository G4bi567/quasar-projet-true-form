<template>
  <q-layout class="backgroundTemplate bgColor" view="hhh LpR fff">
    <q-header reveal elevated class="bg-primary text-white paddHeader">
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
          <q-fab-action
            external-label
            color="primary"
            to="/settings"
            icon="settings"
            label="Paramètre"
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
    <q-page-container class="bgColor" v-show="UserStore.isLogVar == false">
      <Login @logInFinished="TurnoffLogInPage()" />
    </q-page-container>
    <!--first part, if login is false, (login is a variable that is false if there is no data about the user), then if it is false, it displays a page in order to provide the data-->
    <q-page-container class="bgColor" v-show="writeComment == false">
      <router-view @logout="logoutaccount()" />
    </q-page-container>
    <!-- second part, if writeComment is false, (writeComment is a variable that is false if there is no request to write a publication), as it is false it displays the page of recent publications, that means  the main page of the site-->
    <q-page-container class="bgColor" v-show="writeComment == true">
      <createPost @finished="isAvailable()" />
    </q-page-container>
    <!-- third part, if writeComment is true, (writeComment is a variable that is true if there is a request to write a publication), as it is true it displays a page in order to give the data about the problem-->
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
    title: 'SlidesGo',
    link: 'https://slidesgo.com/',
  },
  {
    title: 'CNRTL',
    link: 'https://www.cnrtl.fr/',
  },
  {
    title: 'Wolfram|Alpha',
    link: 'https://www.wolframalpha.com/',
  },
  {
    title: 'Quizlet',
    link: 'https://quizlet.com',
  },
];
localStorage.setItem('Branches', JSON.stringify(branches));

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const writeComment = ref(false);

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
  CommentStore.NewLogin = {
    name: '',
    mail: '',
    password: '',
  };
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
c .title {
  margin-left: 5px;
}
.imgOptions {
  height: 35px;
  background-color: white;
  padding: 5px 10px;
  border-radius: 10px;
}
.colorTopObjects {
  background: #262d34;
}
.marginMenu {
  margin: 0px 10px 0px 10px;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
