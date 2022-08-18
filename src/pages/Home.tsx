import FormValidationSample from "../components/FormValidationSample";
import HomeContainer from "../containers/Home";
import Layout from "../containers/Layout";
import TabsContainer from "../containers/Tabs";
const HomePage: React.FunctionComponent = () => {
  return (
    <Layout>
      <HomeContainer />
      <FormValidationSample />
      <TabsContainer />
    </Layout>
  );
};

export default HomePage;
