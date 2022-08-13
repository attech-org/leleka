import FormValidationSample from "../components/FormValidationSample";
import SingleTweet from "../components/SingleTweet";
import HomeContainer from "../containers/Home";
import Layout from "../containers/Layout";

const HomePage: React.FunctionComponent = () => {
  return (
    <Layout>
      <HomeContainer />
      <FormValidationSample />
      <SingleTweet />
    </Layout>
  );
};

export default HomePage;
