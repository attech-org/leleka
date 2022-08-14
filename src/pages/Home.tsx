import FormValidationSample from "../components/FormValidationSample";
import SingleTweet from "../components/SingleTweet";
import SingleTweetBS from "../components/SingleTweetBS";
import SingleTweetComment from "../components/SingleTweetComment";
import HomeContainer from "../containers/Home";
import Layout from "../containers/Layout";

const HomePage: React.FunctionComponent = () => {
  return (
    <Layout>
      <HomeContainer />
      <FormValidationSample />
      <SingleTweet />
      <SingleTweetBS />
      <SingleTweetComment />
    </Layout>
  );
};

export default HomePage;
