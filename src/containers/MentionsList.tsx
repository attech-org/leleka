import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import FeedSingleTweet from "../components/FeedSingleTweet";
import { tweetsActions } from "../redux/reducers/tweets";
import { AppDispatch, RootState } from "../redux/store";
import { Tweet2 } from "../types";
import InfiniteList from "./InfiniteList";

const MentionsList = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector<RootState, RootState["user"]>((store) => store.user);

  const mentions = useSelector<RootState, RootState["tweets"]["myMentions"]>(
    (store) => store.tweets.myMentions
  );

  useEffect(() => {
    dispatch(
      tweetsActions.fetchMentions({
        limit: mentions.limit,
        nextPage: mentions.nextPage,
        searchString: `@${user.username}`,
      })
    );
  }, []);

  const handleShowMore = () => {
    return (
      !mentions.isLoading &&
      dispatch(
        tweetsActions.fetchMentions({
          limit: mentions.limit,
          nextPage: mentions.nextPage,
          searchString: `@${user.username}`,
        })
      )
    );
  };

  return (
    <>
      {user._id ? (
        mentions.docs.length ? (
          <InfiniteList<Tweet2>
            showMore={handleShowMore}
            data={mentions}
            itemComponent={(itemData) => (
              <FeedSingleTweet key={itemData._id} {...itemData} />
            )}
          />
        ) : (
          t("mentionsList.noMentions")
        )
      ) : (
        t("notAuthorized")
      )}
    </>
  );
};

export default memo(MentionsList);
