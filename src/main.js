import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VeeValidatePlugin from "./includes/validation";
import i18n from "./i18n";
import "vue3-toastify/dist/index.css";

createApp(App).use(VeeValidatePlugin).use(i18n).mount("#app");
