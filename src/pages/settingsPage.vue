<template>
  <div class="q-pa-md">
    <div class="flew row white-text">
      <div class="column items-start">
        <div class="col">
          <q-btn class="bg-secondary width-section" label="Profil" />
        </div>
        <div class="col">
          <q-btn
            @click="CommentStore.resetComment('localStorage')"
            class="bg-secondary width-section"
            label="Supprimer les publications"
            to="/"
          />
        </div>
        <div class="col topmargin">
          <q-btn
            @click="UserStore.logOut('localStorage')"
            class="bg-secondary width-section"
            label="Se déconnecter"
            to="/"
          />
        </div>
      </div>
      <div style="margin: 10px; max-width: 50%">
        <q-input
          class="divInput"
          outlined
          dark
          v-model="newLink"
          color="white"
          text-color="white"
          label-color="white"
          label="Nouveau lien de photo de profil"
        />
        <q-btn
          class="btnEnvoyez"
          color="primary"
          icon="profi"
          icon-right="send"
          label="Envoyer"
          @click="isAvailable(newLink)"
        />
        <div v-if="ismodified == true">
          Vous avez changé votre photo d'écran
        </div>
        <div v-if="ismodified == false">Votre URL n'est pas une image</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from 'stores/user.js';
import { useCommentStore } from 'stores/comment.js';

//allows access to the store
const CommentStore = useCommentStore();

//allows access to the store
const UserStore = useUserStore();

//loads the profile variables
UserStore.profileload();

//variable that displays a message when changing the profile picture
const ismodified = ref(null);

//variable that stores the new url
const newLink = ref('');

//function to check if the url is an image
function isAvailable(newLink) {
  if (newLink) {
    const img = new Image();
    img.src = newLink;

    img.onload = function () {
      UserStore.changePpProfile(newLink);
      ismodified.value = true;
    };

    img.onerror = function () {
      ismodified.value = false;
    };
  }
}
</script>
<style>
.divInput {
  margin: 10px;
  width: 300px;
}
.btnEnvoyez {
  margin-top: 10px;
}
.white-text {
  color: white;
}
.topmargin {
  margin-top: 20px;
}
.width-section {
  width: 150px;
}
</style>
