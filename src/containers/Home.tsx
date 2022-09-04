import { memo } from "react";

import FeedPosts from "./FeedPosts";
const HomeContainer: React.FunctionComponent = () => {
  return (
    <>
      <div>Home container</div>
      <FeedPosts />
    </>
  );
};

export default memo(HomeContainer);
