import { defineStore } from 'pinia';
import { date } from 'quasar';

export const useCommentStore = defineStore('commentStore', {
  state: () => ({
    commentsList: [],
  }),

  actions: {
    async loadComments(location) {
      if (location === 'localStorage') {
        // On récupère les données du localStorage
        this.commentsList = JSON.parse(localStorage.getItem('data'));

        // Si le localStorage ne contient pas de commentaire, on charge des commentaires fictifs
        if (JSON.parse(localStorage.getItem('data')) === null) {
          this.commentsList = [
            {
              title: 'Problème de grammaire et de syntaxe',
              date: '29-11-22',
              name: 'Jonathan',
              description:
                'Bonjour à tous, je voudrais savoir comment je pourrais améliorer ma grammaire et les formulation de mes pharses. Car je perds très souvent des points à causes de ça, mais je ne sais pas comment y remédier. Merci pour vos futurs réponses. ',
              branche: 'Français',
              pp_profil:
                'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
              id: 1,
              comment: [
                {
                  date: '30-11-22',
                  name: 'François',
                  description:
                    "Salut, je comprends ce que tu dis, ce que j'ai fait c'est d'écrire très souvent et de donner les feuilles à ton professeur de langue afin qu'il corrige(je suis sûr il le fera)",
                  pp_profil:
                    'https://th.bing.com/th/id/OIP.yxV37VJ70Fy4_GyhctJprwHaJX?pid=ImgDet&rs=1',
                  id: 1,
                  comment: [
                    {
                      date: '30-11-22',
                      name: 'Steve',
                      description:
                        'Je voudrais juste rajouter que tu peux demander aussi des cours supplémentaires pour revoir les erreurs que tu comprends pas dans tes rédactions.',
                      branche: 'fr',
                      pp_profil:
                        'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg',
                      id: 1,
                      comment: [],
                    },
                  ],
                },
                {
                  date: '29-11-22',
                  description:
                    'Salut, je te dirais de repérer les erreurs que tu fais dans tes évaluations, et après tu vas lire les règles de celle-ci.',
                  pp_profil:
                    'https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg',
                  id: 2,
                  name: 'jonathan',
                  comment: [],
                },
              ],
            },
            {
              title: 'Résolution de problèmes',
              date: '22-11-22',
              description:
                "Bonjour, ça fait longtemps j'ai un problème avec les résolutions de problèmes en Maths, car je ne vois pas où commencer, quoi utiliser... etc. Merci de votre aide",
              branche: 'Mathématiques',
              pp_profil:
                'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
              id: 2,
              name: 'Joel',
              comment: [],
            },
          ];
        }
      } else {
        // Utilisation de fetch pour aller récupérer les données du backend à l'aide d'une API
        // try {
        //     await fetch('https://your-backend-url.com/comments', {
        //         method: 'GET',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(comment),
        //     })
        //     commentsList = [...this.comments, comment]
        // } catch (error) {
        //     console.error(error)
        // }
      }
    },

    async addComment(comment, location) {
      // Mise à jour état local (il ne faudra plus utiliser le localStorage pour la photo de profi et le profil mais il faudra créer un autre store 'user')

      comment.name = JSON.parse(localStorage.getItem('profil')).name;
      comment.date = date.formatDate(Date.now(), 'DD-MM-YYYY');
      comment.pp_profil = localStorage.getItem('pp_profil');

      // comment.id = Math.max.apply(Math, this.commentsList.map(function(object) { return object.id; }))+1;
      // if (!comment.id){
      //   comment.id = 0;
      // }
      var maxId = 0;
      comment.id = maxId;
      if (this.commentsList.length !== 0) {
        let maxId = -1;
        for (let i = 0; i < this.commentsList.length; i++) {
          console.log(this.commentsList[i].id);
          if (this.commentsList[i].id === null) {
            this.commentsList[i].id = 0;
          }
          if (this.commentsList[i].id >= maxId) {
            maxId = parseInt(this.commentsList[i].id);
            comment.id = maxId + 1;
          }
        }
      }

      this.commentsList.unshift({ ...comment });

      if (location === 'localStorage') {
        localStorage.setItem(
          'data',
          JSON.stringify(this.commentsList.concat([comment]))
        );
      } else {
        // Sauvegarder dans le backend
        // Utilisation de fetch pour aller récupérer les données du backend à l'aide d'une API
        // try {
        //     await fetch('https://your-backend-url.com/comments', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(comment),
        //     })
        // } catch (error) {
        //     console.error(error)
        // }
      }
    },

    deleteComment(id, location) {
      // Suppression locale
      let index = this.commentsList
        .map((x) => {
          return x.id;
        })
        .indexOf(id);
      this.commentsList.splice(index, 1);

      // Suppression db/localStorage
      if (location === 'localStorage') {
        localStorage.removeItem('data');
        localStorage.setItem('data', JSON.stringify(this.commentsList));
      } else {
        //Suppression dans le backend en utilisant une API
      }
    },
  },
});
