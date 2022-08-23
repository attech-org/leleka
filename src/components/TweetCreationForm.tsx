import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  EmojiSmile,
  Image as ImageIcon,
  Globe2,
  CheckLg,
  PersonCheck,
  At,
} from "react-bootstrap-icons";
import styled from "styled-components";

const StyledCloseButton = styled.button`
  border: none;
  &:hover {
    background-color: rgb(128, 128, 128, 0.2);
  }
`;
const StyledTextArea = styled.textarea`
  &:focus {
    box-shadow: none;
  }
`;
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

const TweetCreationForm = () => {
  const whoCanAnswer = "Усі можуть відповідати";
  const handleTweetButton = () => {
    console.log("Tweeted");
  };
  const handleImgUpload = () => {
    console.log("Img Upload");
  };
  const handleEmojiPaste = () => {
    console.log("Emoji paste");
  };
  return (
    <div>
      <div className="d-flex mx-2">
        <StyledCloseButton className="btn p-1 rounded-circle">
          <div className="btn-close" />
        </StyledCloseButton>
      </div>
      <div className="border-0 p-3 d-flex text-start justify-content-start">
        <div className="">
          <img
            className="rounded-circle"
            src="http://dummyimage.com/105x100.png/5fa2dd/ffffff"
            width="48px"
            height="48px"
          />
        </div>
        <div className="flex-grow-1 ms-2">
          <StyledTextArea
            className="form-control form-control-lg border-0 fs-5"
            placeholder="Що відбувається?"
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
                      Хто може відповідати?
                    </div>
                    <div className="px-3 fs-6 lh-sm">
                      Визначте, хто може відповідати на цей твіт. Згадані особи
                      завжди можуть відповідати.
                    </div>
                    <div className="d-flex flex-column">
                      <StyledPopoverButton className="btn py-0 px-3 py-2 d-flex align-items-center secondary rounded-0 text-primary border-0">
                        <div className="bg-primary me-2 p-2 d-flex justify-content-center align-items-center rounded-circle">
                          <Globe2 className="text-white fs-5 m-1" />
                        </div>
                        <div className="text-start text-black-50">Усі</div>
                        <div className="flex-grow-1 text-end fs-4">
                          <CheckLg />
                        </div>
                      </StyledPopoverButton>
                      <StyledPopoverButton className="btn py-0 px-3 py-2 d-flex align-items-center secondary rounded-0 text-primary border-0">
                        <div className="bg-primary me-2 p-2 d-flex justify-content-center align-items-center rounded-circle">
                          <PersonCheck className="text-white fs-5 m-1" />
                        </div>
                        <div className="text-start text-black-50">
                          Люди, котрих ви читаєте
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
                          Лише особи яких ви згадали
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
              <StyledIcon className="rounded-circle" onClick={handleEmojiPaste}>
                <EmojiSmile className="m-2 fs-5" />
              </StyledIcon>
            </div>
            <button
              className="btn btn-primary rounded-5 d-flex align-items-center m-2"
              onClick={handleTweetButton}
            >
              Твітнути
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCreationForm;
