import { useState } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import styled from "styled-components";
import "./animationLike.css";

interface ILikeButton {
  //     isLiked: boolean;
  likesCount: number;
  //     onLike: () => void;
}

const bgRed = "rgb(249, 24, 128, 0.1)";
const Red = "rgb(249, 24, 128)";
const IconBg = styled.button`
  height: 38.5px;
  width: 38.5px;
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
  { likesCount }
) => {
  const [isLiked, setisLiked] = useState(false);
  const [temporaryСounter, setlikesCount] = useState(likesCount);
  const [countAnimation, setcountAnimation] = useState("static");
  const clickLike = () => {
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
      setTimeout(() => setcountAnimation("static"), 150);
    }
  };
  return (
    <Like>
      <IconBg
        className="m-0 p-0 rounded-circle row align-items-center justify-content-center)"
        data-bs-toggle="tooltip-primary"
        data-bs-placement="bottom"
        data-bs-custom-class="red-tooltip"
        title={isLiked ? "Unlike" : "Like"}
      >
        <input
          id="toggle-heart"
          type="checkbox"
          checked={isLiked ? true : false}
          onClick={() => clickLike()}
        />
        <label htmlFor="toggle-heart">
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
