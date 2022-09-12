import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import pageTitlesEN from "../locales/en/pageTitles.json";
import translationEN from "../locales/en/translation.json";
import validationEN from "../locales/en/validation.json";
import pageTitlesUA from "../locales/ua/pageTitles.json";
import translationUA from "../locales/ua/translation.json";
import validationUA from "../locales/ua/validation.json";

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    debug: false,
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      lookupQuerystring: "lang",
    },
    resources: {
      en: {
        translation: translationEN,
        validation: validationEN,
        pageTitles: pageTitlesEN,
      },
      ua: {
        translation: translationUA,
        validation: validationUA,
        pageTitles: pageTitlesUA,
      },
    },
    load: "languageOnly",
    fallbackLng: "en",
  });
