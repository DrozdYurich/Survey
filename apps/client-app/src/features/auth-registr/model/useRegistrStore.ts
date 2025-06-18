import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { RegistrData } from '@/entities/User';

export const useRegistrStore = defineStore('RegistrStore', () => {
  const dataRegistr = ref<RegistrData>({
    birthDate: null,
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    nickName: '',
    patronymic: '',
  });
  function setDataRegistr(data: RegistrData) {
    dataRegistr.value = data;
  }
  const getDataRegistr = computed(() => dataRegistr.value);
  async function registr(data: RegistrData) {
    try {
      // Запрос на бэк
      setDataRegistr(data);
      console.log(dataRegistr.value);
    } catch (error) {
      console.log(error);
    }
  }
  return { setDataRegistr, getDataRegistr, registr };
});
