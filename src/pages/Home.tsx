import FormValidationSample from "../components/FormValidationSample";
import HomeContainer from "../containers/Home";
import Layout from "../containers/Layout";

const HomePage: React.FunctionComponent = () => {
  return (
    <Layout>
      <HomeContainer />
      <FormValidationSample />
    </Layout>
  );
};

export default HomePage;
