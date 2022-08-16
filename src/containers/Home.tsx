import { useTranslation } from "react-i18next";

const HomeContainer: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>Home container</div>
      <p>{t("validation:userName.required")}</p>
    </>
  );
};

export default HomeContainer;
