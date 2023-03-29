<template>
  <div>
    <div v-show="CommentStore.filteroptiontype === null">
      <h1 class="test row justify-center text-center align-center">Récents</h1>
    </div>
    <div v-show="CommentStore.filteroptiontype !== null">
      <h1 class="test row justify-center text-center align-center">
        {{ CommentStore.filteroption }}
      </h1>
    </div>
    <div>
      <layerPostComment
        v-for="post in UpdatedList"
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
import layerPostComment from 'components/LayerPostComment.vue';
import { useCommentStore } from 'stores/comment.js';
import { useUserStore } from 'stores/utilisateur.js';

//permet d'accéder au store
const UserStore = useUserStore();
//permet d'accéder au store
const CommentStore = useCommentStore();

//importer la liste des commentaires
CommentStore.loadComments('localStorage');
UserStore.profilload();
//permet de savoir le nombre de pages disponible
const paginationnumber = reactive({
  index: Math.ceil(CommentStore.commentsList.length / 5),
});

//création de variable des
const UpdatedList = ref();
const current = ref(1);

function pagination(current) {
  if (CommentStore.filteroptiontype == null) {
    UpdatedList.value = CommentStore.commentsList.slice(
      (current - 1) * 5,
      current * 5
    );
    paginationnumber.index = Math.ceil(CommentStore.commentsList.length / 5);
  } else if (CommentStore.filteroptiontype == 'branche') {
    UpdatedList.value = CommentStore.commentsList
      .filter((post) => post.branche == CommentStore.filteroption)
      .slice((current - 1) * 5, current * 5);
    paginationnumber.index = Math.ceil(
      CommentStore.commentsList.filter(
        (post) => post.branche == CommentStore.filteroption
      ).length / 5
    );
  } else if (CommentStore.filteroptiontype == 'name') {
    UpdatedList.value = CommentStore.commentsList
      .filter((post) => post.name == CommentStore.filteroption)
      .slice((current - 1) * 5, current * 5);
    paginationnumber.index = Math.ceil(
      CommentStore.commentsList.filter(
        (post) => post.name == CommentStore.filteroption
      ).length / 5
    );
  } else if (CommentStore.filteroptiontype == 'follow') {
    UpdatedList.value = CommentStore.commentsList
      .filter((post) => UserStore.followed.indexOf(post.id) >= 0)
      .slice((current - 1) * 5, current * 5);
    paginationnumber.index =
      1 +
      Math.floor(
        CommentStore.commentsList.filter(
          (post) => UserStore.followed.indexOf(post.id) >= 0
        ).length / 5
      );
  }
}
</script>

<style>
.test {
  margin: 50px auto;
  border-radius: 20px;
  width: 350px;
  background-color: #1e252b;
  color: white;
  padding: 5px 10px;
}
</style>
