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
          <q-route-tab to="/" label="Home Page" />
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
            src="~assets/logo_variante.png"
          />
          Forum CSUD
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
          style="
            bg-image: url('https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg');
          "
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

<script setup>
import { ref, reactive } from 'vue';
import createPost from 'components/CreatePost.vue';
import Login from 'pages/LogInPage.vue';
import { date } from 'quasar';

const ThepostList = reactive([
  {
    title: 'Problème de grammaire et de syntaxe',
    date: '29-11-22',
    name: 'Jonathan',
    description:
      'Bonjour à tous, je voudrais savoir comment je pourrais améliorer ma grammaire et les formulation de mes pharses. Car je perds très souvent des points à causes de ça, mais je ne sais pas comment y remédier. Merci pour vos futurs réponses. ',
    branche: 'Français',
    pp_profil:
      'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
    id: 1,
    comment: [
      {
        date: '30-11-22',
        name: 'François',
        description:
          "Salut, je comprends ce que tu dis, ce que j'ai fait c'est d'écrire très souvent et de donner les feuilles à ton professeur de langue afin qu'il corrige(je suis sûr il le fera)",
        pp_profil:
          'https://th.bing.com/th/id/OIP.yxV37VJ70Fy4_GyhctJprwHaJX?pid=ImgDet&rs=1',
        id: 1,
        comment: [
          {
            date: '30-11-22',
            name: 'Steve',
            description:
              'Je voudrais juste rajouter que tu peux demander aussi des cours supplémentaires pour revoir les erreurs que tu comprends pas dans tes rédactions.',
            branche: 'fr',
            pp_profil:
              'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg',
            id: 1,
            comment: [],
          },
        ],
      },
      {
        date: '29-11-22',
        description:
          'Salut, je te dirais de repérer les erreurs que tu fais dans tes évaluations, et après tu vas lire les règles de celle-ci.',
        pp_profil:
          'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg',
        id: 2,
        name: 'jonathan',
        comment: [],
      },
    ],
  },
  {
    title: 'Résolution de problèmes',
    date: '22-11-22',
    description:
      "Bonjour, ça fait longtemps j'ai un problème avec les résolutions de problèmes en Maths, car je ne vois pas où commencer, quoi utiliser... etc. Merci de votre aide",
    branche: 'Mathématiques',
    pp_profil:
      'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
    id: 2,
    name: 'Joel',
    comment: [],
  },
]);

// à désactiver si besoin d'ajouter/supprimer des posts ou commentaires
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
function logoutaccount() {
  localStorage.setItem('profil', null);
  login.value = false;
}

function TurnoffLogInPage() {
  login.value = true;
}
</script>
