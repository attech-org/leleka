import HomeContainer from "../containers/Home";
import Layout from "../containers/Layout";
import LoginForm from "../containers/LoginForm";

const HomePage: React.FunctionComponent = () => {
  return (
    <>
      <Layout>
        <HomeContainer />
        <LoginForm />
      </Layout>
    </>
  );
};

export default HomePage;
