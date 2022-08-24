import { useTranslation } from "react-i18next";

import FeedPosts from "./FeedPosts";

const HomeContainer: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>Home container</div>
      <p>{t("test")}</p>
      <FeedPosts />
    </>
  );
};

export default HomeContainer;
