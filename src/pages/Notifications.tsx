import { useTranslation } from "react-i18next";

import Layout from "../containers/Layout";
import NotificationsList from "../containers/Notifications";
import { TabKeyProps } from "../types/tabs-types";

const NotificationsPage = ({ tabKey }: TabKeyProps) => {
  const { t } = useTranslation();
  return (
    <Layout title={t("pageTitles:notificationsPage")}>
      <NotificationsList tabKey={tabKey} />
    </Layout>
  );
};

export default NotificationsPage;
