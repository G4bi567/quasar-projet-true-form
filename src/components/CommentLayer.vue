<template>
  <head> </head>
  <div style="color: white">
    <div style="padding: 0px 10px 0px 0px">
      <div class="row justify-between">
        <q-item clickable v-ripple @click="insertName(name)" to="/person">
          <q-item-section side>
            <q-avatar rounded size="30px">
              <img :src="pp_profil" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-section side>
          {{ date }}
          <q-btn-dropdown color="primary">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label
                    >Supprimer (Pas utilisable pour le moment)</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item-section>
      </div>

      <div style="margin-bottom: 0px 10px">
        <h7>
          <h7 v-html="description"> </h7>
        </h7>
      </div>
    </div>
    <div
      style="
        background-color: #080808;
        padding: 5px 0px 0px 0px;
        border-radius: 0px 0px 20px 20px;
      "
    >
      <q-btn @click="commentOn" icon="fa-regular fa-comment" />
      <div v-show="commentView">
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
          color="primary"
          icon="mail"
          icon-right="send"
          label="ne fonctionne pas encore"
        />
      </div>
      <div v-if="comment.length" style="margin: 0px 0px 10px 20px">
        <CommentLayer v-for="co in comment" :key="co.id" v-bind="co" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref } from 'vue';
import CommentLayer from 'components/CommentLayer.vue';

const commentView = ref(false);
const datapost = ref(localStorage.getItem('data'));
function commentOn() {
  commentView.value = !commentView.value;
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
</script>
