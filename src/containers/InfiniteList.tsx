import { ListGroup } from "react-bootstrap";

import ListItemWoFooter from "../components/FollowUserItem";
import { MockUser } from "../types/mock-api-types";

const ContentList = (prop: { arr: Array<MockUser> }) => {
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
