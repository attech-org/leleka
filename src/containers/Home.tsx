import { useTranslation } from "react-i18next";

const HomeContainer: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>Home container</div>
      <p>{t("test")}</p>
    </>
  );
};

export default HomeContainer;
