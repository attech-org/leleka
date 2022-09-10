import { useTranslation } from "react-i18next";

import Layout from "../containers/Layout";

const AboutPage: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return <Layout title={t("pageTitles:aboutPage")}>About page</Layout>;
};

export default AboutPage;
