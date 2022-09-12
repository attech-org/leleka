import { useTranslation } from "react-i18next";

import Layout from "../containers/Layout";

const ExplorePage: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return <Layout title={t("pageTitles:explorePage")}>Explore</Layout>;
};

export default ExplorePage;
