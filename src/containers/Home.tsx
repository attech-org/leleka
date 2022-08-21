import { useTranslation } from "react-i18next";

import FeedPost from "../components/FeedPost";

const HomeContainer: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>Home container</div>
      <p>{t("test")}</p>
      <FeedPost />
    </>
  );
};

export default HomeContainer;
