import { useState } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import "./animationLike.css";

interface ILikeButton {
  //     isLiked: boolean;
  likesCount: number;
  onLike: () => void;
}

const bgRed = "rgb(249, 24, 128, 0.1)";
const Red = "rgb(249, 24, 128)";
const IconBg = styled.button`
  height: 32px;
  width: 32px;
  border: none;
  background-color: transparent;
  &:hover {
    background-color: ${bgRed};
    color: ${Red};
  }
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  height: 38.5px;
  &:hover {
    color: ${Red};
  }
`;

const LikeButton: React.FC<ILikeButton> = (
  // { isLiked, likesCount, onLike }
  { likesCount, onLike }
) => {
  const [isLiked, setisLiked] = useState(false);
  const [temporaryСounter, setlikesCount] = useState(likesCount);
  const [countAnimation, setcountAnimation] = useState("static");
  const clickLike = (e: React.FormEvent): void => {
    e.preventDefault();
    onLike();
    if (isLiked) {
      setisLiked(!isLiked);
      setcountAnimation("move up");
      setTimeout(() => setlikesCount(temporaryСounter - 1), 100);
      setTimeout(() => setcountAnimation("down"), 100);
      setTimeout(() => setcountAnimation("static"), 150);
    } else {
      setisLiked(!isLiked);
      setcountAnimation("move down");
      setTimeout(() => setlikesCount(temporaryСounter + 1), 100);
      setTimeout(() => setcountAnimation("up"), 100);
      setTimeout(() => setcountAnimation("static liked"), 150);
    }
  };
  const { t } = useTranslation();
  return (
    <Like>
      <IconBg
        className="m-0 p-0 rounded-circle align-items-center justify-content-center)"
        title={isLiked ? t("likeButton.unlike") : t("likeButton.like")}
      >
        <input id="toggle-heart" type="checkbox" checked={isLiked} readOnly />
        <label htmlFor="toggle-heart" onClick={(e) => clickLike(e)}>
          {isLiked ? (
            <HeartFill className="p-0 m-0" />
          ) : (
            <Heart className="p-0 m-0 " />
          )}
        </label>
      </IconBg>
      <p className={countAnimation}> {temporaryСounter} </p>
    </Like>
  );
};

export default LikeButton;
