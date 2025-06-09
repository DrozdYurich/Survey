<template>
  <Message severity="error" size="small" variant="simple">{{
    message
  }}</Message>
</template>
<script setup lang="ts">
import { Message } from 'primevue';

interface TProps {
  message: string;
}
const { message } = defineProps<TProps>();
</script>
<style scoped></style>
