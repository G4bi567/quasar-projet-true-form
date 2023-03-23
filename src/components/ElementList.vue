<template>
  <q-item clickable to="/" @click="getTo(title)">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useCommentStore } from 'stores/comment.js';

//permet d'accéder au store
const CommentStore = useCommentStore();

const props = defineProps({
  title: String,
});

function getTo(title) {
  CommentStore.filteroption = title;
  CommentStore.filteroptiontype = 'branche';
}
</script>
