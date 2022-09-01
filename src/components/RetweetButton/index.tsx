import { useState } from "react";
import styled from "styled-components";
import "./animation.css";

interface RetweetButtonInterface {
  //     isLiked: boolean;
  retweetCount: number;
  //     onLike: () => void;
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

const RetweetButton: React.FC<RetweetButtonInterface> = (
  // { isLiked, likesCount, onLike }
  { retweetCount }
) => {
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [retweetСounter, setRetweetСounter] = useState(retweetCount);
  const [countAnimation, setCountAnimation] = useState("static");
  const clickLike = () => {
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
      setTimeout(() => setCountAnimation("static"), 150);
    }
  };
  return (
    <Like>
      <IconBg
        className="m-0 p-0 rounded-circle align-items-center justify-content-center)"
        data-bs-toggle="tooltip-primary"
        data-bs-placement="bottom"
        data-bs-custom-class="red-tooltip"
        title={isRetweeted ? "Unlike" : "Like"}
      >
        <input
          id="toggle-heart"
          type="checkbox"
          checked={isRetweeted ? true : false}
          onClick={() => clickLike()}
        />
        <label htmlFor="toggle-heart">
          {isRetweeted ? (
            <RetweetButton className="p-0 m-0" />
          ) : (
            <RetweetButton className="p-0 m-0 " />
          )}
        </label>
      </IconBg>
      <p className={countAnimation}> {retweetСounter} </p>
    </Like>
  );
};

export default RetweetButton;
