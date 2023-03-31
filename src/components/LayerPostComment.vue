<template>
  <div class="generalLayer">
    <div class="paddLayer">
      <div class="row justify-between">
        <q-item
          clickable
          v-ripple
          @click="
            filterVariable(name);
            definetypefiltername();
          "
        >
          <q-item-section side>
            <q-avatar rounded size="30px">
              <img :src="pp_profile" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="profilename">{{ name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-section
          side
          v-if="(title !== undefined, UserStore.NewLogin.name == name)"
        >
          <q-btn-dropdown color="secondary">
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="CommentStore.deleteComment(id, 'localStorage')"
              >
                <q-item-section>
                  <q-item-label>Supprimer</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item-section>
      </div>
      <div class="positionBranche">
        <q-btn
          v-if="title !== undefined"
          class="bg-primary"
          outline
          color="white"
          rounded
          @click="
            filterVariable(branche);
            definetypefilterbranche();
          "
          :label="branche"
        />
        <h5 v-if="title !== undefined" class="positionTitle">
          {{ title }}
        </h5>
        <div class="positionDescription">
          <p v-html="description"></p>
        </div>
      </div>
      <div class="row justify-end">
        {{ date }}
      </div>
    </div>
    <div v-if="title !== undefined" class="bottomBar">
      <q-btn @click="commentOn" icon="fa-regular fa-comment" />
      <q-btn
        v-if="UserStore.followed.indexOf(id) < 0"
        @click="listFollowMake(id)"
        icon="fa-regular fa-heart"
      />
      <q-btn
        v-if="UserStore.followed.indexOf(id) >= 0"
        @click="listFollowMake(id)"
        icon="fa-solid fa-heart"
      />

      <div v-show="commentView" class="positionInputButtonComments">
        <q-editor
          dark
          v-model="NewComment.description"
          :dense="$q.screen.lt.md"
          :toolbar="[
            [
              {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                list: 'only-icons',
                options: ['left', 'center', 'right', 'justify'],
              },
            ],
            [
              'bold',
              'italic',
              'strike',
              'underline',
              'subscript',
              'superscript',
            ],
            ['token', 'hr', 'link', 'custom_btn'],
            ['fullscreen'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7',
                ],
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana',
                ],
              },
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
            ['undo', 'redo'],
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana',
          }"
        />

        <div v-if="title !== undefined">
          <q-btn
            class="positionInputButtonComments"
            color="primary"
            icon="mail"
            icon-right="send"
            label="Répondre"
            @click="
              isAvailable(NewComment, id);
              ResetNewComment();
            "
          />
          <div v-if="completed == false">Il n'y a pas de commentaire</div>
        </div>
        <div v-if="comment.length" class="positionInputButtonComments">
          <LayerPostComment v-for="co in comment" :key="co.id" v-bind="co" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref } from 'vue';
import LayerPostComment from 'components/LayerPostComment.vue';
import { useCommentStore } from 'stores/comment.js';
import { fasHeartCirclePlus } from '@quasar/extras/fontawesome-v6';
import { useUserStore } from 'stores/user.js';

//allows access to the User store
const UserStore = useUserStore();
//allows access to the User store
const CommentStore = useCommentStore();

//allows you to import data
const props = defineProps({
  title: String,
  name: String,
  date: String,
  description: String,
  pp_profile: String,
  id: Number,
  comment: Object,
  branche: String,
});

//setting of variables/objects

//variable for the display of the comment area
const commentView = ref(false);

//variable to know if the comment is filled
const completed = ref(true);

//object that stores the comment
const NewComment = reactive({
  description: '',
});

// setting of functions 

//function that allows to activate or deactivate
function commentOn() {
  commentView.value = !commentView.value;
}

//fonction qui permet de remettre le champ à zéro
function ResetNewComment() {
  NewComment.description = '';
}

//function that allows to set the variables of the dedicated pages
function filterVariable(variable) {
  CommentStore.filteroption = variable;
  CommentStore.filteroptiontitle = variable.slice(0, 20);
  CommentStore.tab = '';
}

//functions that establish the type of filtering
function definetypefilterbranche() {
  CommentStore.filteroptiontype = 'branche';
}
function definetypefiltername() {
  CommentStore.filteroptiontype = 'name';
}

//function allows you to add publications to the list of favorites
function listFollowMake(id) {
  if (UserStore.followed.indexOf(id) >= 0) {
    UserStore.followed.shift(id);
  } else {
    UserStore.followed.push(id);
  }
}

//function that allows to check if the comment is filled
function isAvailable(NewPost, id) {
  completed.value = false;
  if (NewPost.description !== '') {
    completed.value = true;
    CommentStore.addComment(
      'comment',
      id,
      NewComment,
      UserStore.NewLogin.name,
      UserStore.pp_profile,
      'localStorage'
    );
  }
}
</script>

<style scoped>
.generalLayer {
  margin: 10px 15px;
  border-radius: 20px;
  background-color: #1e252b;
  color: white;
}
.paddLayer {
  padding: 5px 10px;
}
.profilename {
  color: white;
}
.positionBranche {
  margin: 7px 0px 10px 10px;
}
.positionTitle {
  width: 90%;
  margin: 7px 0px 13px 0px;
  word-wrap: break-word;
}
.positionDescription {
  width: 95%;
  margin-left: 5px;
  word-wrap: break-word;
}
.bottomBar {
  background-color: #080808;
  padding: 5px 10px;
  border-radius: 0px 0px 20px 20px;
}
.positionInputButtonComments {
  margin-top: 10px;
}
</style>
