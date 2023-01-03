<template style="background-color: #181818">
  <div>
    <h1
      class="row justify-center text-center align-center"
      style="
        margin: 50px auto;
        width: 350px;
        border-radius: 20px;
        background-color: #1e252b;
        color: white;
        padding: 5px 10px;
      "
    >
      {{ branche_researched }}
    </h1>
    <PostLayer
      v-for="post in thePostList.data"
      :key="post.title"
      v-bind="post"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import PostLayer from 'components/PostLayer.vue';
const branche_researched = ref(localStorage.getItem('branche_research'));

const thePostList = reactive({
  data: JSON.parse(localStorage.getItem('data')).filter(
    (post) => post.branche == branche_researched.value
  ),
});
</script>
