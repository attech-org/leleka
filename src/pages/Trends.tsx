import React, { useEffect } from "react";
import { TabContainer } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { SinglePageHeader } from "../components/PageHeader";
import { TrendItem } from "../components/TrendItem";
import Layout from "../containers/Layout";
import { tagsActions } from "../redux/reducers/tags";
import { AppDispatch, RootState } from "../redux/store";

const RecomendedFollowsPage: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tags = useSelector<RootState, RootState["tags"]["tagsList"]>(
    (store) => store.tags.tagsList
  );

  useEffect(() => {
    dispatch(tagsActions.fetchTagsList());
  }, []);

  const { t } = useTranslation();
  return (
    <Layout title={t("pageTitles:trendsPage")}>
      <SinglePageHeader pageName={t("trends.pageTitle")} />
      <TabContainer />
      {tags.docs.length &&
        tags.docs.map((itemData) => {
          return <TrendItem key={itemData._id} {...itemData} />;
        })}
    </Layout>
  );
};

export default RecomendedFollowsPage;
