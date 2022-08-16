import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationUA from "./locales/ua.json";

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    debug: true,
    resources: {
      en: {
        translation: translationEN,
      },
      ua: {
        translation: translationUA,
      },
    },
    load: "languageOnly",
    fallbackLng: "en",
    // backend: {
    //   loadPath: "./locales/{{lng}}.json",
    // },
  });
