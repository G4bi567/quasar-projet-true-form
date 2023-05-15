<template>
  <q-layout class="backgroundTemplate bgColor" view="hhh LpR fff">
    <q-header reveal elevated class="bg-primary text-white paddHeader">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-tabs
          v-model="CommentStore.tab"
          indicator-class="no-underline"
          align="left"
          class="smallerTabs hidden-sm hidden-xs text-sm"
        >
          <q-route-tab
            class="smallerTab"
            to="/"
            @click="ResetMode()"
            name="Home"
            label="Home"
          />
          <q-route-tab
            class="smallerTab"
            to="/"
            @click="followedComments()"
            label="Suivis"
          />
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
          class="colorTopObjects smallerBtn"
          icon="fa-solid fa-pencil"
          label="Une question"
        />

        <q-fab
          v-model="fabVar"
          class="colorTopObjects marginMenu smallerFab"
          label="Menu"
          vertical-actions-align="center"
          direction="down"
        >
          <q-fab-action
            external-label
            class="smallerFab"
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
      <Login />
    </q-page-container>
    <!--first part, if login is false, (login is a variable that is false if there is no data about the user), then if it is false, it displays a page in order to provide the data-->
    <q-page-container class="bgColor" v-show="writeComment == false">
      <router-view />
    </q-page-container>
    <!-- second part, if writeComment is false, (writeComment is a variable that is false if there is no request to write a publication), as it is false it displays the recent publications page, that is the main page of the site-->
    <q-page-container class="bgColor" v-show="writeComment == true">
      <createPostComment @finished="isAvailable()" />
    </q-page-container>
    <!-- third part, if writeComment is true, (writeComment is a variable that is true if there is a request to write a publication), as it is true, it displays a page to give the data about the problem-->
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import createPostComment from 'components/CreatePostComment.vue';
import Login from 'pages/LogInPage.vue';
import { date } from 'quasar';
import { useUserStore } from 'stores/user.js';
import { useCommentStore } from 'stores/comment.js';

//allows access to the blind
const CommentStore = useCommentStore();

//allows access to the blind
const UserStore = useUserStore();

// setting of variables/objects

//allows you to set the variable for the menu
const fabVar = ref(false);

const branches = [
  'Allemand',
  'Anglais',
  'Appl. des math.',
  'Arts visuels',
  'Biologie',
  'Chimie',
  'Economie et droit',
  'Education physique',
  'Français',
  'Géographie',
  'Grec',
  'Histoire',
  'Informatique',
  'Italien',
  'Latin',
  'Mathématiques',
  'Musique',
  'Philisophie',
  'Physique',
  'Sciences religieuses',
];

//Save the list of branches in the Storage location
localStorage.setItem('Branches', JSON.stringify(branches));

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

//allows you to set drawers variables
const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

//sets the variable to display the "CreatePostComment
const writeComment = ref(false);

// setting of functions

//functions allow to close or open the drawers
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

//function that checks if the "writeCommentMode" function can be executed
function isAvailable() {
  if (CommentStore.isAvailableVar == true) {
    writeCommentMode();
  }
}

//function that closes the "CreatePostComment" component
function writeCommentMode() {
  writeComment.value = !writeComment.value;
}

//function that resets the variables
function ResetMode() {
  writeComment.value = false;
  CommentStore.filteroptiontype = null;
}

//function allows to open the page "Suivis"
function followedComments() {
  CommentStore.filteroptiontype = 'follow';
  CommentStore.filteroption = 'Suivis';
  CommentStore.filteroptiontitle = 'Suivis';
}

//function to open the branches
function getTo(title) {
  CommentStore.filteroptiontitle = title;
  CommentStore.filteroption = title;
  CommentStore.filteroptiontype = 'branche';
  CommentStore.tab = '';
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
  background: #262d34;
}
.marginMenu {
  margin: 0px 10px 0px 10px;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
@media (max-width: 870px) {
  .imgOptions,
  .title {
    display: none;
  }
}
@media (max-width: 600px) {
  .smallerBtn {
    font-size: 8px;
    padding: 5px;
    width: 110px;
    height: 50px;
  }
  @media (max-width: 600px) {
    .smallerFab {
      font-size: 8px;
      width: 70px;
      height: 50px;
      margin: 0px 0px 0px 7px;
    }
    .smallerTabs {
      width: 100px;
    }
    .smallerTab {
      width: 50px;
      font-size: 1px;
    }
    .smallerTabs .q-tab {
      font-size: 12px;
    }
    .paddHeader {
      padding: 0px;
    }
  }
}
</style>
