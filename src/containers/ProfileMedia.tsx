import SingleTweet from "../components/SingleTweet";
import dataProfileMediaContainer from "../MOCKS/dataProfileMediaContainer.json";
import { Tweet } from "../types";
import InfiniteList from "./InfiniteList";

const mockPagination = {
  docs: dataProfileMediaContainer,
  page: 1,
  limit: 10,
  hasNextPage: false,
};

const Media = () => {
  return (
    <InfiniteList<Tweet>
      showMore={() => {}}
      data={mockPagination}
      itemComponent={(itemData) => <SingleTweet {...itemData} />}
    />
  );
};

export default Media;
