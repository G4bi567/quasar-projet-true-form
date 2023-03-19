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
            label="reset publications"
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
      <div style="margin: 10px">
        Ici vous pourrez changer votre photo de profil et changer les couleurs
        de votre site
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCommentStore } from 'stores/comment.js';
const CommentStore = useCommentStore();
</script>
