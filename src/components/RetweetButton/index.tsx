import { useState } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { ArrowRepeat, Pencil } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "./animation.css";

interface RetweetButtonInterface {
  // isRetweeted: boolean;
  retweetCount: number;
  // onRetweet: () => void;
}

const bgGreen = "rgb(0, 186, 124, 0.1)";
const Green = "rgb(0, 186, 124)";
const IconBg = styled.button`
  height: 32px;
  width: 32px;
  border: none;
  background-color: transparent;
  &:hover {
    background-color: ${bgGreen};
    color: ${Green};
  }
`;

const Retweet = styled.div`
  display: flex;
  align-items: center;
  height: 38.5px;
  &:hover {
    color: ${Green};
  }
`;

const NonRetweeted = styled(ArrowRepeat)``;
const Retweeted = styled(ArrowRepeat)`
  color: ${Green};
`;

const StyledPopover = styled(Popover)`
  --bs-popover-max-width: 300px;
  inset: 45px -45px auto auto !important;
  .popover-arrow {
    display: none;
  }
  .popover-body {
    padding: 0;
  }
`;

const StyledLink = styled.a`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
    cursor: pointer;
  }
`;

const RetweetButton: React.FC<RetweetButtonInterface> = ({
  // isRetweeted,
  retweetCount,
  // onRetweet,
}) => {
  const [show, setShow] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [retweetСounter, setRetweetСounter] = useState(retweetCount);
  const [countAnimation, setCountAnimation] = useState("static");
  const clickRetweet = () => {
    if (isRetweeted) {
      setIsRetweeted(!isRetweeted);
      setCountAnimation("move up");
      setTimeout(() => setRetweetСounter(retweetСounter - 1), 100);
      setTimeout(() => setCountAnimation("down"), 100);
      setTimeout(() => setCountAnimation("static"), 150);
    } else {
      setIsRetweeted(!isRetweeted);
      setCountAnimation("move down");
      setTimeout(() => setRetweetСounter(retweetСounter + 1), 100);
      setTimeout(() => setCountAnimation("up"), 100);
      setTimeout(() => setCountAnimation("static retweeted"), 150);
    }
  };
  const { t } = useTranslation();

  return (
    <Retweet>
      <div
        onClick={() => setShow(!show)}
        className="align-items-start align-top"
      >
        <OverlayTrigger
          transition
          rootClose
          trigger="click"
          key="left"
          placement="left"
          show={show}
          overlay={
            <StyledPopover id="popover-positioned-left">
              <Popover.Body>
                <p onClick={() => clickRetweet()}>
                  <StyledLink
                    className="text-decoration-none text-reset d-flex flex-row p-1 pe-2 fs-6"
                    // href="#"
                  >
                    <span className="px-2">
                      <ArrowRepeat />
                    </span>
                    {isRetweeted
                      ? t("retweetButton.popover.undoRetweet")
                      : t("retweetButton.popover.retweet")}
                  </StyledLink>
                </p>
                <p>
                  <StyledLink
                    className="text-decoration-none text-reset d-flex flex-row p-1 pe-2 fs-6"
                    // href="#"
                  >
                    <span className="px-2">
                      <Pencil />
                    </span>
                    {t("retweetButton.popover.quote")}
                  </StyledLink>
                </p>
              </Popover.Body>
            </StyledPopover>
          }
        >
          <IconBg
            className="m-0 p-0 rounded-circle align-items-center justify-content-center)"
            data-bs-toggle="tooltip-primary"
            data-bs-placement="bottom"
            data-bs-custom-class="red-tooltip"
            title={
              isRetweeted
                ? t("retweetButton.undoRetweet")
                : t("retweetButton.retweet")
            }
          >
            <label htmlFor="toggle-tweet">
              {isRetweeted ? (
                <Retweeted className="p-0 m-0" />
              ) : (
                <NonRetweeted className="p-0 m-0" />
              )}
            </label>
          </IconBg>
        </OverlayTrigger>
      </div>
      <p className={countAnimation}>{retweetСounter}</p>
    </Retweet>
  );
};

export default RetweetButton;
