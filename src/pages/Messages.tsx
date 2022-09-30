import { useTranslation } from "react-i18next";

import Layout from "../containers/Layout";

const MessagesPage: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Layout data-testId="MessagesPage" title={t("pageTitles:messagesPage")}>
      Messages
    </Layout>
  );
};

export default MessagesPage;
