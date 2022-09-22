import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import Avatar from "react-avatar";
import { EmojiSmile, Image as ImageIcon } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ModalUniversal from "../containers/ModalUniversal";
import { tweetsActions } from "../redux/reducers/tweets";
import { RootState, AppDispatch } from "../redux/store";
import { User } from "../types";
import ReplyButton from "./ReplyButton";

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
  const dispatch = useDispatch<AppDispatch>();
  const [comment, setComment] = useState("");
  const [replyCount, setReplyCount] = useState(commentsCount || 0);
  const handleCommentButton = (): void => {
    dispatch(tweetsActions.createTweet({ content: comment, repliedTo: id }));
    setReplyCount(replyCount + 1);
  };
  const { t } = useTranslation();

  const handleImgUpload = (): void => {
    console.warn("Img Upload");
  };
  const handleEmojiPaste = (): void => {
    console.warn("Emoji paste");
  };
  const avatar = useSelector<
    RootState,
    RootState["user"]["authUser"]["profile"]["avatar"]
  >((store) => store.user.authUser.profile.avatar);

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
              <ReactQuill
                value={comment}
                placeholder={t("translation:reply.placeholder")}
                modules={{
                  toolbar: false,
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "color",
                  "background",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "video",
                  "image",
                  "code-block",
                  "align",
                ]}
                onChange={(val) => {
                  setComment(val);
                }}
              />
            </StyledDiv>
          </div>
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
              onClick={handleCommentButton}
            >
              {t("translation:Reply")}
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
