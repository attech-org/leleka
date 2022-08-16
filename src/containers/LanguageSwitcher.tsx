import { useTranslation } from "react-i18next";

const lngs: Record<string, string> = {
  en: "English",
  ua: "Українська",
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <div>
      {Object.keys(lngs).map((lng: string) => (
        <button
          type="submit"
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          disabled={i18n.resolvedLanguage === lng}
        >
          {lngs[lng]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
