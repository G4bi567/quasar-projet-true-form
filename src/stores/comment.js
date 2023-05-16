import { assertWrappingType } from "graphql/type";
import { defineStore } from "pinia";
import { date } from "quasar";
import { useQuery, useMutation, createClient, defaultPlugins } from "villus";
import { ref, reactive } from "vue";
import { gql } from "graphql-tag";
import { watch, defineExpose, toRaw } from "vue";
import { computed } from "vue";

function authPlugin({ opContext }) {
  opContext.headers["Content-Type"] = "application/json";
  opContext.headers["x-hasura-admin-secret"] =
    "Il0IFkTm1C3SgZPk1y1hrp4hsidxML2uNyswlzrMH3l0kRQLxQnWNfFIzE1IJ9cy";
}

// Create a new client
const client = createClient({
  url: "https://pleased-spaniel-49.hasura.app/v1/graphql",
  use: [authPlugin, ...defaultPlugins()],
});

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    commentsList: [],
    commentstomodify: [],
    filteroption: null,
    filteroptiontitle: null,
    filteroptiontype: null,
    isAvailableVar: true,
    tab: "Home Page",
    branches_id: {
      "Allemand": 1,
      "Anglais": 2,
      "Appl. des math.": 3,
      "Arts visuels": 4,
      "Biologie": 5,
      "Chimie": 6,
      "Economie et droit": 7,
      "Education physique": 8,
      "Français": 9,
      "Géographie": 10,
      "Grec": 11,
      "Histoire": 12,
      "Informatique": 13,
      "Italien": 14,
      "Latin": 15,
      "Mathématiques": 16,
      "Musique": 17,
      "Philosophie": 18,
      "Physique": 19,
      "Sciences religieuses": 20,
    },
  }),

  actions: {
    async loadComments(location) {
      if (location === "localStorage") {
        // We get the data from the localStorage
        this.commentsList = JSON.parse(localStorage.getItem("data"));

        // If the localStorage does not contain any comments, we load fictitious comments
        if (JSON.parse(localStorage.getItem("data")) === null) {
          this.commentsList = [
            {
              title: "Problème de grammaire et de syntaxe",
              date: "29-11-22",
              name: "Jonathan",
              description:
                "Bonjour à tous, je voudrais savoir comment je pourrais améliorer ma grammaire et les formulation de mes pharses. Car je perds très souvent des points à causes de ça, mais je ne sais pas comment y remédier. Merci pour vos futurs réponses. ",
              branche: "Français",
              pp_profile:
                "https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
              id: 1,
              comment: [
                {
                  date: "30-11-22",
                  name: "François",
                  description:
                    "Salut, je comprends ce que tu dis, ce que j'ai fait c'est d'écrire très souvent et de donner les feuilles à ton professeur de langue afin qu'il corrige(je suis sûr il le fera)",
                  pp_profile:
                    "https://th.bing.com/th/id/OIP.yxV37VJ70Fy4_GyhctJprwHaJX?pid=ImgDet&rs=1",
                  id: 1,
                  comment: [
                    {
                      date: "30-11-22",
                      name: "Steve",
                      description:
                        "Je voudrais juste rajouter que tu peux demander aussi des cours supplémentaires pour revoir les erreurs que tu comprends pas dans tes rédactions.",
                      branche: "fr",
                      pp_profile:
                        "https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg",
                      id: 1,
                      comment: [],
                    },
                  ],
                },
                {
                  date: "29-11-22",
                  description:
                    "Salut, je te dirais de repérer les erreurs que tu fais dans tes évaluations, et après tu vas lire les règles de celle-ci.",
                  pp_profile:
                    "https://www.floridaorthosurgeons.com/wp-content/uploads/2016/09/no-image.jpg",
                  id: 2,
                  name: "jonathan",
                  comment: [],
                },
              ],
            },
            {
              title: "Résolution de problèmes",
              date: "22-11-22",
              description:
                "Bonjour, ça fait longtemps j'ai un problème avec les résolutions de problèmes en Maths, car je ne vois pas où commencer, quoi utiliser... etc. Merci de votre aide",
              branche: "Mathématiques",
              pp_profile:
                "https://th.bing.com/th/id/R.5a537e0b861eb2177ae056f26c87c097?rik=OaqK6FPDWti%2f4g&riu=http%3a%2f%2fwww.magicalmaths.org%2fwp-content%2fuploads%2f2012%2f11%2fmaths_image.jpg&ehk=Ef%2fTZg08YV4z5c1PxaQy1rYcsmjGbiEAxH3L6ifAk3o%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
              id: 2,
              name: "Joel",
              comment: [],
            },
          ];
          localStorage.setItem("data", JSON.stringify(this.commentsList));
        }
      } else {
        const GetAllQuestions = gql`
        query GetAllQuestions  {
          questions {
            id
            title
            description
            created_at
            deepth
            questions_subjects {
              subject
            }
            questions_user {
              id
              username
              profil_photo
            }
            replies {
                user {
                  username
                  profil_photo
                }
                id
                parent_id
                description
                deepth
                replies_replies {
                    id
                    parent_id
                    user {
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
            parent_id: reply.parent_id,
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

          let comment = question.replies
            ? question.replies.map(processReplies)
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
        localStorage.setItem("data", JSON.stringify(this.commentsList));
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
      parent_id,
      user_id,
      comment,
      nameprofile,
      mailprofile,
      passwordprofile,
      pp_profile,
      location
    ) {
      // save personal information and add new information
      if (location == "localStoage") {
        comment.name = nameprofile;
        comment.mail = mailprofile;
        comment.password = passwordprofile;
        comment.date = date.formatDate(Date.now(), "DD-MM-YYYY");
        comment.pp_profile = pp_profile;
        comment.comment = [];

        //define the list on which you want to add something
        if (type == "comment") {
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
        if (type == "comment") {
          this.commentsList
            .filter((post) => post.id == id)[0]
            .comment.unshift({ ...comment });
        } else {
          this.commentsList.unshift({ ...comment });
        }

        if (location === "localStorage") {
          //save the list in the localStorage
          localStorage.setItem("data", JSON.stringify(this.commentsList));
        }
      }
    },
    async addCommentserver(
      deepth,
      parent_id,
      user_id,
      title,
      branche,
      description
    ) {
      let newdata = {};
      deepth = deepth + 1;
      alert(parent_id);
      if (deepth > 0) {
        newdata.parent_id = parent_id;
      } else {
        alert(branche);
        newdata.subject_id = this.branches_id[branche];
        newdata.title = title;
      }
      newdata.user_id = user_id;
      newdata.description = description;
      console.log(newdata);
      const createQuestion = gql`
          mutation createQuestion($title: String!, $description: String!, $subject_id: Int!, $user_id: uuid!) {
            insert_questions(objects: {title: $title, description: $description, subject_id: $subject_id, user_id: $user_id}) {
              affected_rows
            }
          }
        `;

      const createReply = gql`
          mutation createReplies($user_id: uuid!, $parent_id: uuid!, $description: String!) {
            insert_replies(objects: {user_id: $user_id, parent_id: $parent_id, description: $description}) {
              affected_rows
            }
          }
        `;

      const createReplyReply = gql`
          mutation createReplyReply($user_id: uuid!, $parent_id: uuid!, $description: String!) {
            insert_replies_replies(objects: {user_id: $user_id, parent_id: $parent_id, description: $description}) {
              affected_rows
            }
          }
        `;

      const { execute: mutateCreateQuestion } = useMutation(createQuestion, {
        manualClient: client,
      });
      const { execute } = useMutation(createReply, {
        manualClient: client,
      });
      const { execute: mutateCreateReplyReply } = useMutation(
        createReplyReply,
        {
          manualClient: client,
        }
      );

      let result;

      if (deepth == 0) {
        result = await mutateCreateQuestion(newdata);
      }
      if (deepth == 1) {
        alert(1);
        alert(newdata);
        console.log(newdata);
        result = await execute(newdata);
        console.log(result);
      }
      if (deepth == 2) {
        result = await mutateCreateReplyReply(newdata);
      }

      if (result && result.error) {
        alert(`${result.error}`);
      } else {
        alert(`User created successfully!`);
        // Optionally, update the store state with the created user's data
      }

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
    },
    async deleteComment(id, deepth, location) {
      // Local deletion
      if (confirm("Êtes-vous sûr de voulour supprimer ? ")) {
        if (location != "localStorage") {
          let result;
          if (deepth == 0) {
            const DeleteQuestion = gql`
            mutation DeleteQuestion($id: uuid!) {
              delete_questions(where: {id: {_eq: $id}}) {
                affected_rows
              }
            }`;
            const { execute } = useMutation(DeleteQuestion, {
              manualClient: client,
            });
            let variable = {};
            variable.id = id;
            result = await execute(variable);
          }
          if (deepth == 1) {
            const DeleteReply = gql`
            mutation DeleteQuestion($id: uuid!) {
              delete_replies(where: {id: {_eq: $id}}) {
                affected_rows
              }
            }`;
            const { execute } = useMutation(DeleteReply, {
              manualClient: client,
            });
            let variable = {};
            variable.id = id;
            result = await execute(variable);
          }
          if (deepth == 2) {
            const DeleteReplyReply = gql`
            mutation DeleteQuestion($id: uuid!) {
              delete_replies_replies(where: {id: {_eq: $id}}) {
                affected_rows
              }
            }`;
            const { execute } = useMutation(DeleteReplyReply, {
              manualClient: client,
            });
            let variable = {};
            variable.id = id;
            result = await execute(variable);
          }
          alert(4);
          if (result && result.error) {
            alert(`${result.error}`);
            alert(5);
          } else {
            alert(`Post deleted successfully!`);
            // Optionally, update the store state with the created user's data
          }
        }

        // Delete db/localStorage
        if (location === "localStorage") {
          let index = this.commentsList
            .map((x) => {
              return x.id;
            })
            .indexOf(id);
          this.commentsList.splice(index, 1);

          localStorage.setItem("data", JSON.stringify(this.commentsList));
        } else {
          //Deletion in the backend using an API
        }
      }
    },
    resetComment(location) {
      // Delete db/localStorage
      if (location === "localStorage") {
        localStorage.removeItem("data");
      }
    },
  },
});
