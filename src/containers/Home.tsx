import { memo } from "react";

import FeedPosts from "./FeedPosts";
const HomeContainer: React.FunctionComponent = () => {
  return (
    <>
      <FeedPosts />
    </>
  );
};

export default memo(HomeContainer);
