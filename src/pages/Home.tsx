import FormValidationSample from "../components/FormValidationSample";
import SingleTweet from "../components/SingleTweet";
import SingleTweetComment from "../components/SingleTweetComment";
import HomeContainer from "../containers/Home";
import Layout from "../containers/Layout";

const HomePage: React.FunctionComponent = () => {
  return (
    <Layout>
      <HomeContainer />
      <FormValidationSample />
      <SingleTweet />
      <SingleTweetComment />
    </Layout>
  );
};

export default HomePage;
