import { defineStore } from 'pinia';
import { date } from 'quasar';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    commentsList: [],
  }),

  actions: {
    async loadComments(location) {},

    async addComment(comment, location) {},

    deleteComment(id, location) {},
  },
});
