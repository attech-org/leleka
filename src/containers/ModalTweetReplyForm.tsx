import { Chat } from "react-bootstrap-icons";

import TweetReplyForm from "../components/TweetReplyForm";
import ModalUniversal from "./ModalUniversal";

const ModalTweetReplyForm: React.FC = () => {
  const TweetRepForm = <TweetReplyForm />;
  return (
    <>
      <ModalUniversal button={<Chat />} title="" content={TweetRepForm} />
    </>
  );
};

export default ModalTweetReplyForm;
