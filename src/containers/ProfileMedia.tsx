
import SingleTweet, { SingleTweetInterface } from "../components/SingleTweet";
import dataProfileMediaContainer from "../MOCKS/dataProfileMediaContainer.json";
import InfiniteList from "./InfiniteList";

const Media = () => {
  return (

    <InfiniteList
      showMore={() => { }}
      data={dataProfileMediaContainer}
      itemComponent={(itemData) => <SingleTweet {...itemData} />}
    />
  )
}

export default Media;
