import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "../locales/en/translation.json";
import validationEN from "../locales/en/validation.json";
import translationUA from "../locales/ua/translation.json";
import validationUA from "../locales/ua/validation.json";

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    debug: true,
    detection: {
      lookupQuerystring: "lang",
    },
    resources: {
      en: {
        translation: translationEN,
        validation: validationEN,
      },
      ua: {
        translation: translationUA,
        validation: validationUA,
      },
    },
    load: "languageOnly",
    fallbackLng: "en",
  });
