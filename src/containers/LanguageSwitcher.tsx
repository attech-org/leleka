import { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";

const lngs: Record<string, string> = {
  en: "English",
  ua: "Українська",
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languageSwitchHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Form.Select
      size="sm"
      value={i18n.resolvedLanguage}
      onChange={languageSwitchHandler}
    >
      {Object.keys(lngs).map((lng: string) => (
        <option key={lng} value={lng}>
          {lngs[lng]}
        </option>
      ))}
    </Form.Select>
  );
};

export default LanguageSwitcher;
