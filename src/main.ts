import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { createI18n } from 'vue-i18n';
import ru from './locales/ru.json';

const i18n = createI18n({
   locale: 'ru',
   fallbackLocale: 'ru',
   messages: { ru },
});

createApp(App).use(i18n).mount('#app');
