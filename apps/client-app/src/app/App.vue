<script setup lang="ts">
import { Button } from 'primevue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const a = ref();
</script>

<template>
  {{ a }}
  <RouterView />
  <Button label="sss" />
</template>

<style scoped lang="css"></style>
