import InfiniteScroll from "react-infinite-scroller";

import { PaginationParamsResult } from "../types/mock-api-types";
export interface InfiniteScrollerListProps {
  // eslint-disable-next-line
  showMore(page: number): any;
  data: PaginationParamsResult;
  // eslint-disable-next-line
  itemComponent: (item: any) => JSX.Element;
}
const InfiniteList = ({
  data,
  itemComponent,
  showMore,
}: InfiniteScrollerListProps) => {
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
