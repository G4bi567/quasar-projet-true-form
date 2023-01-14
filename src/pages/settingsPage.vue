<template>
  <div class="q-pa-md">
    <div class="flew row" style="color: white">
      <div class="column items-start" style="height: 150px">
        <div class="col">
          <q-btn
            style="margin: 0; width: 150px; background: secondary"
            label="Profil"
          />
        </div>
        <div class="col">
          <q-btn
            @click="$emit(`logout`)"
            style="width: 150px; margin: 0; background: secondary"
            label="Se déconnecter"
            to="/"
          />
        </div>
      </div>
      <div style="margin: 10px">
        Ici vous pourrez changer votre photo de profil et changer les couleurs
        de votre site
      </div>
    </div>
  </div>
</template>

<script setup></script>
