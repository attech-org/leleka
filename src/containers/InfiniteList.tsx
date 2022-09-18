import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";

import { Pagination } from "../types/mock-api-types";
export interface InfiniteScrollerListProps<T> {
  showMore: (page: number) => void;
  data: Pagination<T>;
  itemComponent: (item: T) => JSX.Element;
}
const InfiniteList = <T extends object>({
  data,
  itemComponent,
  showMore,
}: InfiniteScrollerListProps<T>) => {
  return (
    <InfiniteScroll
      loadMore={showMore}
      hasMore={data.hasNextPage}
      loader={
        <div key="infinite_scroll_spinner" className="m-2 d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      }
    >
      {data.docs.map((elem) => itemComponent(elem))}
    </InfiniteScroll>
  );
};
export default InfiniteList;
