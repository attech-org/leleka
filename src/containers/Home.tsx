import { useTranslation } from "react-i18next";

import { CommentsList } from "./CommentsList";
import { TweetPage } from "./TweetPage";

const HomeContainer: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>Home container</div>
      <p>{t("test")}</p>
      <TweetPage />
      <CommentsList />
    </>
  );
};

export default HomeContainer;
