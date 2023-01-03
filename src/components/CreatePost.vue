<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input
        outlined
        dark
        v-model="NewPost.title_probl"
        color="white"
        text-color="white"
        label-color="white"
        label="Résumé votre problème"
      />
    </div>
    <q-select
      dark
      filled
      v-model="NewPost.model"
      :options="branches"
      label="Filled"
    />
    <div style="top-margin: 0px">
      <h5 style="color: white">Décrivez votre problème:</h5>
      <q-editor
        dark
        v-model="NewPost.qeditor"
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
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
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
    </div>
    <div class="q-gutter-sm row items-start">
      <!--
      <q-uploader
        url="http://localhost:4444/upload"
        label="Individual upload"
        multiple
        style="max-width: 600px"
      />
      -->
      <q-btn
        color="primary"
        icon="mail"
        icon-right="send"
        label="Envoyez"
        @click="
          addPost(NewPost);
          $emit(`finished`, id);
        "
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const branches = JSON.parse(localStorage.getItem('Branches'));

const NewPost = reactive({
  title_probl: '',
  qeditor: '',
  model: '',
});

function addPost(NewPost) {
  let oldItems = JSON.parse(localStorage.getItem('data'));
  let index = Math.max(...oldItems.map((o) => o.id));
  index++;
  alert(1);
  alert(JSON.parse(localStorage.getItem('profil')).name);
  alert(localStorage.getItem('date'));
  alert(NewPost.qeditor);
  alert(localStorage.getItem('pp_profil'));
  alert(index);
  alert(NewPost.model);
  oldItems.unshift({
    title: NewPost.title_probl,
    name: JSON.parse(localStorage.getItem('profil')).name,
    date: localStorage.getItem('date'),
    description: NewPost.qeditor,
    pp_profil: localStorage.getItem('pp_profil'),
    id: index,
    branche: NewPost.model,
    comment: [],
  });
  alert(2);
  localStorage.setItem('data', JSON.stringify(oldItems));
  NewPost.title_probl = '';
  NewPost.qeditor = '';
  NewPost.model = '';
  alert(3);
}
</script>
