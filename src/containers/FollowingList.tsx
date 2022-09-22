import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import FollowerUserItem from "../components/FollowUserItem";
import { followingActions } from "../redux/reducers/following";
import { UserStore } from "../redux/reducers/user";
import { AppDispatch, RootState } from "../redux/store";
import { LE, User } from "../types";
import { Pagination } from "../types/mock-api-types";
import InfiniteList from "./InfiniteList";

const LiWrapper = styled(ListGroupItem)`
  width: 100%;
  text-align: start;
  &:hover {
    background-color: rgb(247, 247, 247);
    cursor: pointer;
  }
  border: 0;
`;

const FollowingList: React.FunctionComponent = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState>(
    (store) => store.user.authUser
  ) as UserStore;
  const following = useSelector<RootState>(
    (store) => store.following.list
  ) as LE<Pagination<User>>;

  const handleShowMore = () => {
    return (
      !following.isLoading &&
      dispatch(
        followingActions.fetchFollowing({
          limit: following.limit,
          nextPage: following.nextPage,
          userId: user.authUser._id,
          userAccessToken: user.authUser.auth?.local?.accessToken || "",
        })
      )
    );
  };

  return (
    <>
      {user.authUser._id ? (
        following.docs.length ? (
          <ListGroup>
            <InfiniteList
              showMore={handleShowMore}
              data={following}
              itemComponent={(itemData) => (
                <LiWrapper>
                  <FollowerUserItem key={itemData._id} user={itemData} />
                </LiWrapper>
              )}
            />
          </ListGroup>
        ) : (
          t("followingList.noFollowing")
        )
      ) : (
        t("followersList.noFollowers")
      )}
    </>
  );
};

export default FollowingList;
