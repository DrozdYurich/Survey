<template>
  <Message v-if="isShow" severity="error" size="small" variant="simple">{{
    message
  }}</Message>
</template>
<script setup lang="ts">
import { Message } from 'primevue';

interface TProps {
  message: string | undefined;
  isShow: boolean;
}
const { message, isShow } = defineProps<TProps>();
</script>
<style scoped></style>
