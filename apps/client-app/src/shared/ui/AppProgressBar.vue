<template>
  <div v-if="loading">
    <ProgressBar
      class="custom-progressbar"
      mode="indeterminate"
      style="height: 5px"
    />
  </div>
</template>
<script setup lang="ts">
import { ProgressBar } from 'primevue';

interface TProps {
  loading: boolean;
}
const { loading } = defineProps<TProps>();
</script>
<style scoped></style>
