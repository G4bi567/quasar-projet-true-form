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
            @click="$emit(`logout`)"
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
          @click="changePpProfil()"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommentStore } from 'stores/comment.js';
import { ref } from 'vue';
const CommentStore = useCommentStore();
const newLink = ref('');
function changePpProfil() {
  localStorage.setItem('pp_profil', newLink.value);
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
