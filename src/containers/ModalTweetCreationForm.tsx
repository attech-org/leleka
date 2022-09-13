import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";

import TweetCreationForm from "../components/TweetCreationForm";
// import { RootState } from "../redux/store";
import ModalUniversal from "./ModalUniversal";

const ModalTweetCreationForm: React.FC = () => {
  // const newTweetIsLoading = useSelector<
  //   RootState,
  //   RootState["tweets"]["singleTweet"]["isLoading"]
  // >((store) => store.tweets.singleTweet.isLoading);
  const { t } = useTranslation();

  const tweetButton = (
    <div className="d-grid gap-2">
      <Button
        type="submit"
        variant="primary"
        className="rounded-5 my-2 py-2 fw-semibold"
      >
        {t("tweetCreationForm.tweetButton")}
      </Button>
    </div>
  );

  return (
    <ModalUniversal button={tweetButton} content={<TweetCreationForm />} />
  );
};

export default ModalTweetCreationForm;
