import BookmarksList from "../containers/BookmarksList";
import Layout from "../containers/Layout";
// import InfiniteList from "../containers/InfiniteList";

const BookmarksPage: React.FunctionComponent = () => {
  return (
    <Layout>
      <BookmarksList />
    </Layout>
  );
};

export default BookmarksPage;
