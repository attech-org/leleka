import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import TweetCreationForm from "../components/TweetCreationForm";
import ModalUniversal from "./ModalUniversal";

const ModalTweetCreationForm: React.FC = () => {
  const { t } = useTranslation();
  const TweetCreatinForm = <TweetCreationForm />;

  const tweetButton = (
    <div>
      <Button variant="primary" className="rounded-5 my-2 py-2 fw-semibold">
        {t("tweetCreationForm.tweetButton")}
      </Button>
    </div>
  );

  return (
    <>
      <ModalUniversal button={tweetButton} content={TweetCreatinForm} />
    </>
  );
};

export default ModalTweetCreationForm;
