import { useTranslation } from "react-i18next";

import TweetCreationForm from "../components/TweetCreationForm";
import ModalUniversal from "./ModalUniversal";

const ModalTweetCreationForm: React.FC = () => {
  const { t } = useTranslation();
  const TweetCreatinForm = <TweetCreationForm />;
  return (
    <>
      <ModalUniversal
        button={t("tweetCreationForm.tweetButton")}
        title=""
        content={TweetCreatinForm}
      />
    </>
  );
};

export default ModalTweetCreationForm;
