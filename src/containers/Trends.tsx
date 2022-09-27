import { useEffect } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { TrendItem } from "../components/TrendItem";
import { tagsActions } from "../redux/reducers/tags";
import { AppDispatch, RootState } from "../redux/store";
import { Tag } from "../types";
import InfiniteList from "./InfiniteList";
import { LinkWithLanguageQueryParam } from "./LinkWithLanguageQueryParam";

const StyledLink = styled(LinkWithLanguageQueryParam)`
  transition: 0.3s;
  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const LiWrapper = styled(ListGroupItem)`
  width: 100%;
  text-align: start;
  &:hover {
    background-color: rgb(247, 247, 247);
    cursor: pointer;
  }
  border: 0;
`;

const Trends = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tags = useSelector<RootState, RootState["tags"]["tags"]>(
    (store) => store.tags.tags
  );

  useEffect(() => {
    dispatch(tagsActions.fetchTagsList());
  }, []);

  const handleShowMore = () => {
    return !tags.isLoading && dispatch(tagsActions.fetchTagsList());
  };

  const { t } = useTranslation();
  return (
    <div className="bg-light my-3 mx-1 rounded-3">
      <div className="py-3 px-3 fs-5 fw-bold">{t("trends.windowTitle")}</div>
      {tags.docs.length ? (
        <ListGroup>
          <InfiniteList<Tag>
            showMore={handleShowMore}
            data={tags}
            itemComponent={(itemData) => (
              <LiWrapper>
                <TrendItem key={itemData._id} {...itemData} />
              </LiWrapper>
            )}
          />
        </ListGroup>
      ) : (
        t("trends.search")
      )}
      <StyledLink
        to="/trends"
        className="text-decoration-none text-reset d-flex flex-row py-2"
      >
        <Container className="py-2 px-3">
          <p className="py-1 text-info">{t("common.showMore")}</p>
        </Container>
      </StyledLink>
    </div>
  );
};

export default Trends;
