import { useTranslation } from "react-i18next";

import BookmarksList from "../containers/BookmarksList";
import Layout from "../containers/Layout";

const BookmarksPage: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Layout data-testId="BookmarksPage" title={t("pageTitles:bookmarksPage")}>
      <BookmarksList />
    </Layout>
  );
};

export default BookmarksPage;
