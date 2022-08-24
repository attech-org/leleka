import { useTranslation } from "react-i18next";

import FeedPost from "../components/FeedPost";
import TweetCreationForm from "../components/TweetCreationForm";

const HomeContainer: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>Home container</div>
      <p>{t("test")}</p>
      <TweetCreationForm />
      <FeedPost />
    </>
  );
};

export default HomeContainer;
