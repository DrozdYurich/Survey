import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { LoginData } from '@/entities/User';

export const useLoginStore = defineStore('LoginStore', () => {
  const dataLogin = ref<LoginData>({ identifier: '', password: '' });
  function setDataLogin(data: LoginData) {
    dataLogin.value = data;
    
  }
  const getDataLogin = computed(() => dataLogin.value);
  async function login(data: LoginData) {
    try {
      // Запрос на бэк
      setDataLogin(data);
      console.log(dataLogin.value);
    } catch (error) {
      console.log(error);
    }
  }
  return { setDataLogin, getDataLogin, login };
});
