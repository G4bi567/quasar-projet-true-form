import { assertWrappingType } from 'graphql/type';
import { defineStore } from 'pinia';
import { date } from 'quasar';
import { useQuery, useMutation, createClient, defaultPlugins } from 'villus';
import { ref, reactive } from 'vue';
import { gql } from 'graphql-tag';
import { watch, defineExpose, toRaw } from 'vue';
import { computed } from 'vue';

function authPlugin({ opContext }) {
  opContext.headers['Content-Type'] = 'application/json';
  opContext.headers['x-hasura-admin-secret'] =
    'Il0IFkTm1C3SgZPk1y1hrp4hsidxML2uNyswlzrMH3l0kRQLxQnWNfFIzE1IJ9cy';
}

// Create a new client
const client = createClient({
  url: 'https://pleased-spaniel-49.hasura.app/v1/graphql',
  use: [authPlugin, ...defaultPlugins()],
});

export const useCommentStore = defineStore('commentStore', {
  state: () => ({
    commentsList: [],
    commentstomodify: [],
    filteroption: null,
    filteroptiontitle: null,
    filteroptiontype: null,
    isAvailableVar: true,
    tab: 'Home Page',
  }),

  actions: {
    async loadComments(location) {
      if (location === 'localStorage') {
        // We get the data from the localStorage
        this.commentsList = JSON.parse(localStorage.getItem('data'));

        // If the localStorage does not contain any comments, we load fictitious comments
        if (JSON.parse(localStorage.getItem('data')) === null) {
          this.commentsList = [
            {
              title: 'Problème de grammaire et de syntaxe',
              date: '29-11-22',
              name: 'Jonathan',
              description:
                'Bonjour à tous, je voudrais savoir comment je pourrais améliorer ma grammaire et les formulation de mes pharses. Car je perds très souvent des points à causes de ça, mais je ne sais pas comment y remédier. Merci pour vos futurs réponses. ',
              branche: 'Français',
              pp_profile:
                'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
              id: 1,
              comment: [
                {
                  date: '30-11-22',
                  name: 'François',
                  description:
                    "Salut, je comprends ce que tu dis, ce que j'ai fait c'est d'écrire très souvent et de donner les feuilles à ton professeur de langue afin qu'il corrige(je suis sûr il le fera)",
                  pp_profile:
                    'https://th.bing.com/th/id/OIP.yxV37VJ70Fy4_GyhctJprwHaJX?pid=ImgDet&rs=1',
                  id: 1,
                  comment: [
                    {
                      date: '30-11-22',
                      name: 'Steve',
                      description:
                        'Je voudrais juste rajouter que tu peux demander aussi des cours supplémentaires pour revoir les erreurs que tu comprends pas dans tes rédactions.',
                      branche: 'fr',
                      pp_profile:
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
                  pp_profile:
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
              pp_profile:
                'https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
              id: 2,
              name: 'Joel',
              comment: [],
            },
          ];
          localStorage.setItem('data', JSON.stringify(this.commentsList));
        }
      } else {
        const GetAllQuestions = gql`
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

        const { execute } = useQuery({
          query: GetAllQuestions,
        });

        const { data, error } = await execute();
        console.log(data);
        console.log(data.questions);

        function processReplies(reply) {
          if (!reply) {
            return [];
          }
          let date = reply.created_at
            ? reply.created_at.substring(0, 10)
            : null;
          let processedReply = {
            date: date,
            description: reply.description,
            pp_profile: reply.user.profil_photo,
            id: reply.id,
            name: reply.user.username,
            deepth: reply.deepth,
            comment: [],
          };

          if (reply.replies_replies && Array.isArray(reply.replies_replies)) {
            processedReply.comment = reply.replies_replies.map(processReplies);
          }

          return processedReply;
        }

        let transformedData = data.questions.map((question) => {
          let date = question.created_at
            ? question.created_at.substring(0, 10)
            : null;

          let comment = question.questions_replies
            ? [processReplies(question.questions_replies)]
            : [];

          return {
            title: question.title,
            date: date,
            description: question.description,
            branche: question.questions_subjects.subject,
            pp_profile: question.questions_user.profil_photo,
            id: question.id,
            name: question.questions_user.username,
            deepth: question.deepth,
            comment: comment,
          };
        });

        console.log(transformedData);
        this.commentsList = transformedData;
        localStorage.setItem('data', JSON.stringify(this.commentsList));
        // Use of fetch to retrieve data from the backend using an API
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

    async addComment(
      type,
      id,
      deepth,
      comment,
      nameprofile,
      mailprofile,
      passwordprofile,
      pp_profile,
      location
    ) {
      // save personal information and add new information
      comment.name = nameprofile;
      comment.mail = mailprofile;
      comment.password = passwordprofile;
      comment.date = date.formatDate(Date.now(), 'DD-MM-YYYY');
      comment.pp_profile = pp_profile;
      comment.comment = [];

      //define the list on which you want to add something
      if (type == 'comment') {
        this.commentstomodify = this.commentsList.filter(
          (post) => post.id == id
        )[0].comment;
      } else {
        this.commentstomodify = this.commentsList;
      }
      // find the max index of the comment/publication in the list of publications
      var maxId = 0;
      comment.id = maxId;
      if (this.commentstomodify.length !== 0) {
        let maxId = -1;
        for (let i = 0; i < this.commentstomodify.length; i++) {
          if (this.commentstomodify[i].id >= maxId) {
            maxId = parseInt(this.commentstomodify[i].id);
            comment.id = maxId + 1;
          }
        }
      }

      //save the list in the variable commentsList
      if (type == 'comment') {
        this.commentsList
          .filter((post) => post.id == id)[0]
          .comment.unshift({ ...comment });
      } else {
        this.commentsList.unshift({ ...comment });
      }

      if (location === 'localStorage') {
        //save the list in the localStorage
        localStorage.setItem('data', JSON.stringify(this.commentsList));
      } else {
        const CreateUserAndInsertReview = `
          mutation CreateUserAndInsertReview(
            $username: String!,
            $email: String!,
            $password_hash: String!,
          ) {
            insert_user_one(object: { username: $username, email: $email, password_hash: $password_hash}) {
              id
              username
              email
              password_hash
              profil_photo
            }
          }
        `;

        const { execute } = useMutation(CreateUserAndInsertReview, {
          manualClient: client,
        });

        const variables = {
          username: this.Profile.name,
          email: this.Profile.mail,
          password_hash: this.Profile.password,
        };

        const result = await execute(variables);

        // Save in the backend
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
      // Local deletion
      if (confirm('Êtes-vous sûr de voulour supprimer ? ')) {
        let index = this.commentsList
          .map((x) => {
            return x.id;
          })
          .indexOf(id);
        this.commentsList.splice(index, 1);

        // Delete db/localStorage
        if (location === 'localStorage') {
          localStorage.setItem('data', JSON.stringify(this.commentsList));
        } else {
          //Deletion in the backend using an API
        }
      }
    },
    resetComment(location) {
      // Delete db/localStorage
      if (location === 'localStorage') {
        localStorage.removeItem('data');
      }
    },
  },
});
