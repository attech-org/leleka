import { ListGroup } from "react-bootstrap";

import ListItemWoFooter from "../components/FollowUserItem";
import { MockUser } from "../types/mock-api-types";
//import { useLoadItems } from "../utils/loadItems";

const ContentList = (prop: { arr: Array<MockUser> }) => {
  // const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  // const [sentryRef, { rootRef }] = useInfiniteScroll({
  //   loading,
  //   hasNextPage,
  //   onLoadMore: loadMore,
  //   disabled: !!error,
  //   rootMargin: "0px 0px 400px 0px",
  // });
  // return (
  //   <div
  //     // This where we set our scrollable root component.
  //     ref={rootRef}
  //   >
  //     <ListGroup>
  //       {items.map((item:MockUser) => (
  //         <ListItemWoFooter key={item.id} user={item} ref={sentryRef}/>
  //       ))}
  //       {(loading || hasNextPage) && (
  //         <ListItemWoFooter ref={sentryRef}/>
  //       )}
  //     </ListGroup>

  //   </div>
  // );
  return prop.arr.length > 0 ? (
    <ListGroup>
      {prop.arr.map((el) => (
        <ListItemWoFooter key={el.id} user={el} />
      ))}
    </ListGroup>
  ) : (
    // TODO: research required
    <p>No data</p>
  );
};
export default ContentList;
