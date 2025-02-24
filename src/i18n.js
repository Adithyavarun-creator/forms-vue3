import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import it from "./locales/it.json";

// function loadLocaled() {
//   const locales = [{ en: en }, { it: it }];

//   const messages = {};
//   locales.forEach((lang) => {
//     const key = Object.keys(lang);
//     messages[key] = lang[key];
//   });
//   return messages;
// }

export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: en,
    it: it,
  },
  legacy: false,
  globalInjection: true,
});
