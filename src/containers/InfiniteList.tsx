import InfiniteScroll from "react-infinite-scroller";

import { PaginationParamsResult } from "../types/mock-api-types";
export interface InfiniteScrollerListProps<T> {
  showMore(page: number): void;
  data: PaginationParamsResult<T>;
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
      loader={<div className="loader"> Loading... </div>}
    >
      {data.docs.map((elem) => itemComponent(elem))}
    </InfiniteScroll>
  );
};
export default InfiniteList;
