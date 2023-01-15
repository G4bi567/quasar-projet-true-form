<template>
  <head> </head>
  <div
    style="
      margin: 10px 15px;
      border-radius: 20px;
      background-color: #1e252b;
      color: white;
    "
  >
    <div style="padding: 5px 10px">
      <div class="row justify-between">
        <q-item clickable v-ripple @click="insertName(name)" to="/person">
          <q-item-section side>
            <q-avatar rounded size="30px">
              <img :src="pp_profil" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label style="color: white">{{ name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-section side>
          <q-btn-dropdown color="primary">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick(id)">
                <q-item-section>
                  <q-item-label>Supprimer</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item-section>
      </div>
      <div style="margin: 7px 0px 10px 10px">
        <q-btn
          class="bg-primary"
          outline
          color="white"
          rounded
          @click="insertBranche(branche)"
          :label="branche"
          to="/branche"
        />
        <h5 style="width: 90%; margin: 7px 0px 13px 0px; word-wrap: break-word">
          {{ title }}
        </h5>
        <div style="width: 95%; margin-left: 5px; word-wrap: break-word">
          <p v-html="description"></p>
        </div>
      </div>
      <div class="row justify-end">
        {{ date }}
      </div>
    </div>
    <div
      style="
        background-color: #080808;
        padding: 5px 10px;
        border-radius: 0px 0px 20px 20px;
      "
    >
      <q-btn @click="commentOn" icon="fa-regular fa-comment" />
      <div v-show="commentView" style="margin-top: 10px">
        <q-editor
          dark
          v-model="qeditor"
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
            ['print', 'fullscreen'],
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
              'removeFormat',
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
        <q-btn
          style="margin-top: 10px"
          color="primary"
          icon="mail"
          icon-right="send"
          label="ne fonctionne pas encore"
          @click="addComment(qeditor, id)"
        />
        <div v-if="comment.length" style="margin: 20px">
          <CommentLayer v-for="co in comment" :key="co.id" v-bind="co" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref } from 'vue';
import CommentLayer from 'components/CommentLayer.vue';

// pour l'instant avec les outils utilisés
// je ne peux pas ajouter/supprimer les commentaires dans les comemntaires
// mais avec une base de données, ceci sera possible
const commentView = ref(false);
const datapost = ref(localStorage.getItem('data'));
function commentOn() {
  commentView.value = !commentView.value;
}
function onItemClick(id) {
  var oldItems = JSON.parse(localStorage.getItem('data'));
  const index = oldItems.findIndex((ThepostList) => ThepostList.id === id);
  oldItems.splice(index, 1);
  localStorage.setItem('data', JSON.stringify(oldItems));
}
const props = defineProps({
  title: String,
  name: String,
  date: String,
  description: String,
  pp_profil: String,
  id: Number,
  comment: Object,
  branche: String,
});

function insertName(name) {
  localStorage.setItem('name_research', name);
}

function insertBranche(branche) {
  localStorage.setItem('branche_research', branche);
}

const qeditor = ref('');
// ne fonctionne pas encore
function addComment(qeditor, id) {
  let oldItems = JSON.parse(localStorage.getItem('data')).filter(
    (post) => post.id == id
  );

  oldItems.comment.unshift({
    name: JSON.parse(localStorage.getItem('profil')).name,
    date: localStorage.getItem('date'),
    description: qeditor,
    pp_profil: localStorage.getItem('pp_profil'),
    comment: [],
  });

  localStorage.setItem('data', JSON.stringify(oldItems));
  NewPost.title_probl = '';
  NewPost.qeditor = '';
  NewPost.model = '';
}
</script>
