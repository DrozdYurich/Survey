import './styles/styles.css';
import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.mount('#root');
