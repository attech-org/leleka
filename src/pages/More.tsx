import { useTranslation } from "react-i18next";

import Layout from "../containers/Layout";

const MorePage: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Layout data-testId="MorePage" title={t("pageTitles:morePage")}>
      More
    </Layout>
  );
};

export default MorePage;
