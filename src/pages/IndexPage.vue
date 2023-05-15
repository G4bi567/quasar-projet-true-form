<template>
  <div>
    <div class="row justify-center text-center align-center">
      <div class="test" v-show="CommentStore.filteroptiontype === null">
        <h1 class="white-text">Récents</h1>
      </div>
      <div class="test" v-show="CommentStore.filteroptiontype !== null">
        <h1 class="white-text">
          {{ CommentStore.filteroptiontitle }}
        </h1>
      </div>
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
import { reactive, ref } from 'vue';
import layerPostComment from 'components/LayerPostComment.vue';
import { useCommentStore } from 'stores/comment.js';
import { useUserStore } from 'stores/user.js';
import { useQuery, useMutation } from 'villus';
import { gql } from 'graphql-tag';
import { watch, defineExpose, toRaw } from 'vue';
const GetQuestions = gql`
  query GetAllQuestions {
  questions {
    id
    title
    description
    created_at
    deepth
    questions_subjects{
      subject
    }
    questions_user{
      id
      username
      profil_photo
    }
    questions_replies{
      user{
        username
        profil_photo
      }
      id
      description
      deepth
      replies_replies{
        id
        user{
          username
          profil_photo
        }
        description
        deepth
      }
    }
    
  }
}
`;
const { data } = useQuery({
  query: GetQuestions,
});
console.log(data);
//allows you to access the store
const UserStore = useUserStore();

//allows you to access the store
const CommentStore = useCommentStore();

//loads the list of comments and the profile
CommentStore.loadComments('localStorage');
UserStore.profileload();

//allows you to know the number of pages needed
const paginationnumber = reactive({
  index: Math.ceil(CommentStore.commentsList.length / 5),
});

//creation of the variable to store the publications
const UpdatedList = ref();

//creation of the variable to know in which page you are
const current = ref(1);

//function that filters publications
function pagination(current) {
  if (CommentStore.filteroptiontype == null) {
    //take all publications
    UpdatedList.value = CommentStore.commentsList.slice(
      (current - 1) * 5,
      current * 5
    );
    paginationnumber.index = Math.ceil(CommentStore.commentsList.length / 5);
    //generates the number of pages needed
  } else if (CommentStore.filteroptiontype == 'branche') {
    //take all publications that have the same branch as the one chosen
    UpdatedList.value = CommentStore.commentsList
      .filter((post) => post.branche == CommentStore.filteroption)
      .slice((current - 1) * 5, current * 5);
    paginationnumber.index = Math.ceil(
      CommentStore.commentsList.filter(
        (post) => post.branche == CommentStore.filteroption
      ).length / 5
    );
    //generates the number of pages needed
  } else if (CommentStore.filteroptiontype == 'name') {
    //take all publications that have the same name as the one chosen
    UpdatedList.value = CommentStore.commentsList
      .filter((post) => post.name == CommentStore.filteroption)
      .slice((current - 1) * 5, current * 5);
    paginationnumber.index = Math.ceil(
      CommentStore.commentsList.filter(
        (post) => post.name == CommentStore.filteroption
      ).length / 5
    );
    //generates the number of pages needed
  } else if (CommentStore.filteroptiontype == 'follow') {
    //take all publications that have been followed by the user
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
    //generates the number of pages needed
  }
}
</script>

<style>
.test {
  margin-top: 40px;
}
.white-text {
  font-size: 62px;
  color: white;
  border-radius: 20px;
  background-color: #1e252b;
  padding: 10px 20px;
}
</style>
