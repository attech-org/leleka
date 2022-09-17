import Picker, { IEmojiData } from "emoji-picker-react";
import { memo, MouseEvent, useRef, useState } from "react";
import Avatar from "react-avatar";
import { OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import {
  EmojiSmile,
  Image as ImageIcon,
  Globe2,
  CheckLg,
  PersonCheck,
  At,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { tweetsActions } from "../redux/reducers/tweets";
import { RootState, AppDispatch } from "../redux/store";

import "react-quill/dist/quill.snow.css";

const StyledButton = styled.button`
  &:hover {
    background-color: rgb(0, 0, 255, 0.1);
  }
`;
const StyledPopoverButton = styled.button`
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;
const StyledIcon = styled.div`
  color: rgb(0, 0, 255, 0.6);
  &:hover {
    background-color: rgb(0, 0, 255, 0.1);
    cursor: pointer;
  }
`;
const StyledPopover = styled(Popover)`
  .popover-arrow {
    display: none;
  }
`;

const TweetCreationForm: React.FC = () => {
  const editor = useRef<ReactQuill>(null);
  const [content, setContent] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector<RootState, boolean | undefined>(
    (store) => store.tweets.singleTweet.isLoading
  );

  const avatar = useSelector<RootState, RootState["user"]["profile"]["avatar"]>(
    (store) => store.user.profile.avatar
  );

  const { t } = useTranslation();
  const whoCanAnswer = t(
    "translation:tweetCreationForm.whoCanAnswer.button.all"
  );

  const handleTweetButton = (): void => {
    dispatch(tweetsActions.createTweet({ content: content }));
    setContent("");
  };
  const handleImgUpload = (): void => {
    console.warn("Img Upload");
  };

  const onEmojiClick = (_event: MouseEvent, emojiObject: IEmojiData): void => {
    const editorInstance = editor.current?.getEditor();
    const position =
      editor.current?.selection?.index ||
      (editorInstance?.getLength() || 0) - 1 ||
      0;
    editorInstance?.insertText(position, emojiObject.emoji);
  };

  return (
    <div>
      <div className="border-0 p-3 d-flex text-start justify-content-start">
        <Avatar
          size="48"
          round="50%"
          twitterHandle="sitebase"
          name="Artem Ligerko"
          src={avatar}
        />
        <div className="flex-grow-1 ms-2">
          <ReactQuill
            ref={editor}
            placeholder="What's happening?"
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
              setContent(val);
            }}
          />
          <div className="border-bottom py-1">
            <div>
              <OverlayTrigger
                rootClose
                trigger="click"
                key="bottom"
                placement="bottom"
                overlay={
                  <StyledPopover className="py-2 rounded-4">
                    <div className="fs-6 fw-bold px-3 lh-sm">
                      {t(
                        "translation:tweetCreationForm.whoCanAnswer.popover.header"
                      )}
                    </div>
                    <div className="px-3 fs-6 lh-sm">
                      {t(
                        "translation:tweetCreationForm.whoCanAnswer.popover.text"
                      )}
                    </div>
                    <div className="d-flex flex-column">
                      <StyledPopoverButton className="btn py-0 px-3 py-2 d-flex align-items-center secondary rounded-0 text-primary border-0">
                        <div className="bg-primary me-2 p-2 d-flex justify-content-center align-items-center rounded-circle">
                          <Globe2 className="text-white fs-5 m-1" />
                        </div>
                        <div className="text-start text-black-50">
                          {t(
                            "translation:tweetCreationForm.whoCanAnswer.popover.all"
                          )}
                        </div>
                        <div className="flex-grow-1 text-end fs-4">
                          <CheckLg />
                        </div>
                      </StyledPopoverButton>
                      <StyledPopoverButton className="btn py-0 px-3 py-2 d-flex align-items-center secondary rounded-0 text-primary border-0">
                        <div className="bg-primary me-2 p-2 d-flex justify-content-center align-items-center rounded-circle">
                          <PersonCheck className="text-white fs-5 m-1" />
                        </div>
                        <div className="text-start text-black-50">
                          {t(
                            "translation:tweetCreationForm.whoCanAnswer.popover.follow"
                          )}
                        </div>
                        <div className="flex-grow-1 text-end fs-4">
                          <CheckLg />
                        </div>
                      </StyledPopoverButton>
                      <StyledPopoverButton className="btn py-0 px-3 py-2 d-flex align-items-center secondary rounded-0 text-primary border-0">
                        <div className="bg-primary me-2 p-2 d-flex justify-content-center align-items-center rounded-circle">
                          <At className="text-white fs-5 m-1" />
                        </div>
                        <div className="text-start text-black-50">
                          {t(
                            "translation:tweetCreationForm.whoCanAnswer.popover.mention"
                          )}
                        </div>
                        <div className="flex-grow-1 text-end fs-4">
                          <CheckLg />
                        </div>
                      </StyledPopoverButton>
                    </div>
                  </StyledPopover>
                }
              >
                <StyledButton className="btn py-0 px-2 my-2 d-flex align-items-center secondary rounded-5 fw-bold text-primary border-0">
                  <Globe2 className="me-1" />
                  <span>{whoCanAnswer}</span>
                </StyledButton>
              </OverlayTrigger>
            </div>
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
              onClick={handleTweetButton}
              disabled={isLoading}
            >
              {t("translation:tweetCreationForm.tweetButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TweetCreationForm);
