<template>
  <div class="q-pa-md">
    <div class="flew row" style="color: white">
      <div class="column items-start" style="height: 150px">
        <div class="col, margin-top: 30">
          <q-btn style="width: 150px; background: secondary" label="Profil" />
        </div>
        <div class="col,margin-top: 30">
          <q-btn
            @click="CommentStore.resetComment('localStorage')"
            style="width: 150px; background: secondary"
            label="Supprimer les publications"
            to="/"
          />
        </div>
        <div class="col,margin-top: 30">
          <q-btn
            @click="UserStore.logOut('localStorage'), $emit(`logout`)"
            style="width: 150px; background: secondary"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from 'stores/utilisateur.js';
import { useCommentStore } from 'stores/comment.js';

//permet d'accéder au store
const CommentStore = useCommentStore();
//permet d'accéder au store

const UserStore = useUserStore();
const ismodified = ref(true);
const newLink = ref('');
function isAvailable(newLink) {
  if (newLink) {
    const img = new Image();
    img.src = newLink;

    img.onload = function () {
      // The photo is available, do something here
      alert('Votre photo a été modifié');
      UserStore.changePpProfil(newLink);
      alert('Votre photo a été modifié');
      console.log('Photo is available!');
    };

    img.onerror = function () {
      alert("Votre Url n'est pas une photo");
      // The photo is not available, do something here
      console.log('Photo is not available!');
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
</style>
