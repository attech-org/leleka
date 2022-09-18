import { useState } from "react";
import { Chat } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "./animation.css";

interface ReplyButtonInterface {
  replyCount: number;
}

const blue = "rgb(0, 0, 248)";
const IconBg = styled.div`
  display: flex;
  width: 32px;
  justify-content: center;
  background-color: transparent;
  &:hover {
    background: rgb(225, 225, 248);
    transition-duration: 0.2s;
  }
`;

const Reply = styled.div`
  display: flex;
  align-items: center;
  height: 38.5px;
  &:hover {
    color: ${blue};
  }
`;

const ReplyButton: React.FC<ReplyButtonInterface> = ({ replyCount }) => {
  const [replyСounter, setReplyСounter] = useState(replyCount);
  const [countAnimation, setCountAnimation] = useState("static");
  const clickReplyAnimation = () => {
    setCountAnimation("move down");
    setTimeout(() => setReplyСounter(replyСounter + 1), 100);
    setTimeout(() => setCountAnimation("up"), 100);
    setTimeout(() => setCountAnimation("static"), 150);
  };

  if (replyCount != replyСounter) {
    clickReplyAnimation();
    setReplyСounter(replyCount);
  }
  const { t } = useTranslation();

  return (
    <Reply>
      <IconBg title={t("reply.tooltip")}>
        <Chat />
      </IconBg>
      <p className={countAnimation}>{replyСounter}</p>
    </Reply>
  );
};
export default ReplyButton;
