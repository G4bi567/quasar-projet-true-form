<template>
  <div class="q-pa-md">
    <div class="column items-start" style="height: 150px">
      <div class="col">
        <q-btn
          style="margin: 0; width: 150px; background: secondary; color: white"
          label="Profil"
        />
      </div>
      <div class="col">
        <q-btn
          @click="$emit(`logout`)"
          style="width: 150px; margin: 0; background: secondary; color: white"
          label="Se déconnecter"
          to="/"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>
