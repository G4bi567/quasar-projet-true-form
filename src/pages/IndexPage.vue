<template>
  <div>
    <div>
      <h1 class="row justify-center text-center align-center">Récents</h1>
    </div>
    <div>
      <PostLayer
        v-for="post in CommentStore.commentsList"
        :key="post.title"
        v-bind="post"
      />

      <q-pagination
        v-on="pagination(current)"
        v-model="current"
        :max="paginationnumber.index"
        direction-links
        flat
        color="grey"
        active-color="primary"
      />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, reactive, ref } from 'vue';

import PostLayer from 'components/PostLayer.vue';
import { useCommentStore } from 'stores/comment.js';

//permet d'accéder au store
const CommentStore = useCommentStore();

//importer la liste des commentaires
CommentStore.loadComments('localStorage');

//permet de savoir le nombre de pages disponible
const paginationnumber = reactive({
  index: 1 + Math.floor(CommentStore.commentsList.length / 5),
});

//création de variable des 
const problem = ref();
const current = ref(1);

function pagination(current) {
  problem.value = CommentStore.commentsList.slice(
    (current - 1) * 5,
    current * 5
  );
}
</script>

<style>
h1 {
  margin: 50px auto;
  width: 350px;
  border-radius: 20px;
  background-color: #1e252b;
  color: white;
  padding: 5px 10px;
}
</style>
