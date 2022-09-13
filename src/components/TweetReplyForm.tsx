import Avatar from "react-avatar";
import { EmojiSmile, Chat, Image as ImageIcon } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import ModalUniversal from "../containers/ModalUniversal";

const StyledIcon = styled.div`
  color: rgb(0, 0, 255, 0.6);
  &:hover {
    background-color: rgb(0, 0, 255, 0.1);
    cursor: pointer;
  }
`;
const StyledInput = styled.input`
  width: 100%;
  margin-top: 10px;
  border: none;
`;

const StyledDiv = styled.div`
  width: 100%;
`;

const TweetReplyForm: React.FC = () => {
  const { t } = useTranslation();

  const handleReplyButton = (): void => {
    console.warn("Replied");
  };
  const handleImgUpload = (): void => {
    console.warn("Img Upload");
  };
  const handleEmojiPaste = (): void => {
    console.warn("Emoji paste");
  };

  const ReplyFormContainer = (
    <div>
      <div className="border-0 p-3 d-flex text-start justify-content-start">
        <div className="">
          <Avatar
            size="48"
            round="50%"
            twitterHandle="sitebase"
            name="username"
            src=""
          />
        </div>
        <div className="flex-grow-1 ms-2">
          <StyledDiv>Xiaomi</StyledDiv>
          <StyledDiv>@Xiaomi</StyledDiv>
          <br />
          <StyledDiv>
            "Phasellus sit amet erat. undefineda tempus. Vivamus in felis eu
            sapien cursus vestibulum.\n\nProin eu mi. undefineda ac enim. In
            tempor, turpis nec euismod scelerisque, quam turpis adipiscing
            lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis
            nunc. Proin at turpis a pede posuere nonummy. Integer non velit."
          </StyledDiv>
          <br />
          <StyledInput placeholder={t("tweet your reply")} />
          <div className="d-flex justify-content-between">
            <div className="d-flex p-2">
              <StyledIcon className="rounded-circle" onClick={handleImgUpload}>
                <ImageIcon className="m-2 fs-5" />
              </StyledIcon>
              <StyledIcon className="rounded-circle" onClick={handleEmojiPaste}>
                <EmojiSmile className="m-2 fs-5" />
              </StyledIcon>
            </div>
            <button
              className="btn btn-primary rounded-5 d-flex align-items-center m-2"
              onClick={handleReplyButton}
            >
              {t("translation:Reply")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ModalUniversal button={<Chat />} title="" content={ReplyFormContainer} />
  );
};

export default TweetReplyForm;
