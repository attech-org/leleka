import React, { useEffect } from "react";
import { ListGroup, ListGroupItem, TabContainer } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { SinglePageHeader } from "../components/PageHeader";
import { TrendItem } from "../components/TrendItem";
import InfiniteList from "../containers/InfiniteList";
import Layout from "../containers/Layout";
import { tagsActions } from "../redux/reducers/tags";
import { AppDispatch, RootState } from "../redux/store";
import { Tag } from "../types";

const LiWrapper = styled(ListGroupItem)`
  width: 100%;
  text-align: start;
  &:hover {
    background-color: rgb(247, 247, 247);
    cursor: pointer;
  }
  border: 0;
`;

const RecomendedFollowsPage: React.FunctionComponent = () => {
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
    <Layout title={t("pageTitles:trendsPage")}>
      <SinglePageHeader pageName={t("trends.pageTitle")} />
      <TabContainer />
      {tags.docs.length && (
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
      )}
    </Layout>
  );
};

export default RecomendedFollowsPage;
