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
          <q-route-tab to="" label="Home Page" />
          <!--
          <q-route-tab to="/Two" label="Page Two" />
          <q-route-tab to="/Three" label="Page Three" />
          -->
        </q-tabs>

        <q-toolbar-title>
          <img
            bg-color="white"
            vertical-middle
            style="
              height: 35px;
              background-color: white;
              padding: 5px 10px;
              border-radius: 10px;
            "
            class="logo"
            src="~assets/logo_variante.png"
          />
          Forum Csud
        </q-toolbar-title>
        <q-btn
          @click="writeCommentMode()"
          color="secondary"
          icon-right="fa-solid fa-pencil"
          label="Une question"
        />
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

        <q-fab
          v-model="fab2"
          label="Menu"
          external-label
          vertical-actions-align="left"
          color="none"
          icon="none"
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
      bordered
    >
      <q-list>
        <q-item-label header>hahahaahah </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      behavior="normal"
      elevated
    >
    </q-drawer>

    <q-page-container style="background-color: #181818" v-show="login == false">
      <Login @logInFinished="TurnoffLogInPage()" />
    </q-page-container>
    <q-page-container
      style="background-color: #181818"
      v-show="writeComment == false"
    >
      <router-view @logout="logoutaccount()" />
    </q-page-container>
    <q-page-container
      style="background-color: #181818"
      v-show="writeComment == true"
    >
      <createPost v-model="newPost" @finished="writeCommentMode()" />
    </q-page-container>
  </q-layout>
</template>
<style>
.logo {
  height: 30px;
}
</style>
<script setup>
import { ref, reactive } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import createPost from 'components/CreatePost.vue';
import Login from 'pages/LogInPage.vue';

import { date } from 'quasar';
const ThepostList = reactive([
  {
    title: 'Probleme dfrancais',
    date: '29 octobre 2022',
    name: 'jonathan',
    description: 'ahahahaah, je comprendss pas ca',
    branche: 'fr',
    pp_profil:
      'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
    id: 1,
    comment: [
      {
        title: 'Probleme dfrancais',
        date: '29 octobre 2022',
        name: 'jonathan',
        description: 'ahahahaah, je comprendss pas ca',
        branche: 'fr',
        pp_profil:
          'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
        id: 1,
        comment: [
          {
            title: 'Probleme dfrancais',
            date: '29 octobre 2022',
            name: 'jonathan',
            description: 'ahahahaah, je comprendss pas ca',
            branche: 'fr',
            pp_profil:
              'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
            id: 1,
            comment: [],
          },
        ],
      },
      {
        title: 'probleme de maths',
        date: '29 octobre 2022',
        description: 'Bonjour, je comprendss pas ca',
        branche: 'fr',
        pp_profil:
          'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
        id: 2,
        name: 'jonathan',
        comment: [],
      },
      {
        title: 'probleme de maths',
        date: '29 octobre 20sss22',
        branche: 'fr',
        description: 'Bonjour, je comprendss pas ca',
        pp_profil:
          'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
        name: 'jonathan',
        id: 3,
        comment: [],
      },
    ],
  },
  {
    title: 'probleme de maths',
    date: '29 octobre 2022',
    description: 'Bonjour, je comprendss pas ca',
    branche: 'fr',
    pp_profil:
      'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
    id: 2,
    name: 'jonathan',
    comment: [],
  },
  {
    title: 'probleme de maths',
    date: '29 octobre 20sss22',
    branche: 'fr',
    description: 'Bonjour, je comprendss pas ca',
    pp_profil:
      'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
    name: 'jonathan',
    id: 3,
    comment: [],
  },
]);
const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

localStorage.setItem('data', JSON.stringify(ThepostList));

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
  'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
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
function logoutaccount() {
  localStorage.setItem('profil', null);
  login.value = false;
}

function TurnoffLogInPage() {
  login.value = true;
}
</script>
