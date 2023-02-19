import { defineStore } from 'pinia';
import { date } from 'quasar';

export const useCommentStore = defineStore('commentStore', {
  state: () => ({
    commentsList: [],
  }),

  actions: {
    async loadComments(location) {
    
    },

    async addComment(comment, location) {
     
    },

    deleteComment(id, location) {
     
    },
  },
});
