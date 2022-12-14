import { useTranslation } from "react-i18next";

import Layout from "../containers/Layout";

const ListsPage: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return <Layout title={t("pageTitles:listsPage")}>Lists</Layout>;
};

export default ListsPage;
