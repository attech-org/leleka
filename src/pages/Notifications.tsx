import Layout from "../containers/Layout";
import NotificationsList from "../containers/Notifications";
import { TabKeyProps } from "../types/tabs-types";

const NotificationsPage = ({ tabKey }: TabKeyProps) => {
  return (
    <Layout>
      <NotificationsList tabKey={tabKey} />
    </Layout>
  );
};

export default NotificationsPage;
