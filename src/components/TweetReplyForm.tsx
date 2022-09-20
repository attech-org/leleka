import Picker, { IEmojiData } from "emoji-picker-react";
import { createRef, MouseEvent, RefObject, useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Form, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import { EmojiSmile, Image as ImageIcon } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ModalUniversal from "../containers/ModalUniversal";
import { tweetsActions } from "../redux/reducers/tweets";
import { RootState, AppDispatch } from "../redux/store";
import { User } from "../types";
import ReplyButton from "./ReplyButton";

const StyledPopover = styled(Popover)`
  .popover-arrow {
    display: none;
  }
`;

const StyledIcon = styled.div`
  color: rgb(0, 0, 255, 0.6);
  &:hover {
    background-color: rgb(0, 0, 255, 0.1);
    cursor: pointer;
  }
`;

const StyledDiv = styled.div`
  width: 100%;
`;
const StyledName = styled.div`
  font-weight: bold;
`;

const Logo = styled.img`
  height: 3rem;
  width: 3rem;
`;

const TweetReplyForm: React.FC<{
  author: Partial<User>;
  content: string;
  id: string;
  commentsCount?: number;
}> = ({ author, content, id, commentsCount }) => {
  const inputRef: RefObject<HTMLTextAreaElement> = createRef();

  const [comment, setComment] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [replyCount, setReplyCount] = useState(commentsCount || 0);

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector<RootState, boolean | undefined>(
    (store) => store.tweets.singleTweet.isLoading
  );

  const handleCommentButton = (): void => {
    dispatch(tweetsActions.createTweet({ content: comment, repliedTo: id }));
    setReplyCount(replyCount + 1);
    setComment("");
  };
  const { t } = useTranslation();

  const handleImgUpload = (): void => {
    console.warn("Img Upload");
  };
  const onEmojiClick = (_event: MouseEvent, emojiObject: IEmojiData): void => {
    if (inputRef.current) {
      const ref = inputRef.current;
      ref.focus();
      const start = comment.substring(0, ref.selectionStart);
      const end = comment.substring(ref.selectionStart);
      const message = start + emojiObject.emoji + end;
      setComment(message);
      setCursorPosition(start.length + emojiObject.emoji.length);
    }
  };
  const avatar = useSelector<RootState, RootState["user"]["profile"]["avatar"]>(
    (store) => store.user.profile.avatar
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  const ReplyFormContainer = (
    <div>
      <div className="border-0 p-3 d-flex text-start justify-content-start">
        <div className="">
          <Logo
            className="rounded-circle"
            src={author.profile?.avatar}
            alt=""
          />
        </div>
        <div className="flex-grow-1 ms-2">
          <StyledName>{author.name}</StyledName>
          <StyledDiv>@{author.username}</StyledDiv>
          <br />
          <div className="" dangerouslySetInnerHTML={{ __html: content }} />
          <br />
          <div className="border-0 p-3 d-flex text-start justify-content-start">
            <Avatar
              size="48"
              round="50%"
              twitterHandle="sitebase"
              name="username"
              src={avatar}
            />
            <StyledDiv>
              <Form.Control
                as="textarea"
                plaintext
                placeholder={t("translation:reply.placeholder")}
                ref={inputRef}
                value={comment}
                onChange={(val) => {
                  setComment(val.target.value);
                }}
              />
            </StyledDiv>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex p-2">
              <StyledIcon className="rounded-circle" onClick={handleImgUpload}>
                <ImageIcon className="m-2 fs-5" />
              </StyledIcon>

              <OverlayTrigger
                trigger="click"
                key="bottom"
                placement="bottom"
                overlay={
                  <StyledPopover>
                    {showPicker && (
                      <Picker
                        pickerStyle={{ width: "100%" }}
                        onEmojiClick={onEmojiClick}
                      />
                    )}
                  </StyledPopover>
                }
              >
                <StyledIcon
                  className="rounded-circle"
                  onClick={() => setShowPicker((val) => !val)}
                >
                  <EmojiSmile className="m-2 fs-5" />
                </StyledIcon>
              </OverlayTrigger>
            </div>
            {isLoading && (
              <Spinner animation="border" variant="primary" className="m-2" />
            )}
            <button
              type="submit"
              className="btn btn-primary rounded-5 d-flex align-items-center m-2"
              onClick={handleCommentButton}
              disabled={isLoading}
            >
              {t("translation:reply.tooltip")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ModalUniversal
      button={<ReplyButton replyCount={replyCount} />}
      title=""
      content={ReplyFormContainer}
    />
  );
};

export default TweetReplyForm;
