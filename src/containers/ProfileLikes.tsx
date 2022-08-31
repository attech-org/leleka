import SingleTweet from "../components/SingleTweet";
import dataProfileLikes from "../MOCKS/dataProfileLikes.json";
import { Tweet } from "../types";
import InfiniteList from "./InfiniteList";

const mockPagination = {
  docs: dataProfileLikes,
  page: 1,
  limit: 10,
  hasNextPage: false,
};

const Likes = () => {
  return (
    <InfiniteList<Tweet>
      showMore={() => {}}
      data={mockPagination}
      itemComponent={(itemData) => <SingleTweet {...itemData} />}
    />
  );
};

export default Likes;
