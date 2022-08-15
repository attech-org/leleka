// import FormValidationSample from "../components/FormValidationSample";
import HomeContainer from "../containers/Home";
import Layout from "../containers/Layout";
import Registration from "../containers/Registration";

const HomePage: React.FunctionComponent = () => {
  return (
    <>
      <Layout>
        <HomeContainer />
        {/* <FormValidationSample /> */}
        <Registration />
      </Layout>
    </>
  );
};

export default HomePage;
