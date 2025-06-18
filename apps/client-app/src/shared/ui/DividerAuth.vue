<template>
  <Divider align="center" type="solid">
    <span class=""> {{ title }} </span>
  </Divider>
</template>
<script setup lang="ts">
import { Divider } from 'primevue';

interface TProps {
  title: string;
}
const { title } = defineProps<TProps>();
</script>
<style scoped></style>
