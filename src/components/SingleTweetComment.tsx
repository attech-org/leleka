// import React from "react";
// import Avatar from "react-avatar";
// import { Dropdown } from "react-bootstrap";
// import { ThreeDots, Chat, Upload } from "react-bootstrap-icons";
// import { useTranslation } from "react-i18next";
// import styled from "styled-components";

// import AttachedContent from "./AttachedContent";
// import LikeButton from "./LikeButton";
// import RetweetButton from "./RetweetButton";

// const Wrapper = styled.div`
//   text-align: left;
//   display: flex;
//   flex-direction: row;
//   padding: 0 16px;
//   border-top: solid 1.5px #e6e6e6;
//   border-bottom: solid 1.5px #e6e6e6;
//   &:hover {
//     background-color: rgba(0, 0, 0, 0.03);
//   }
// `;
// const CommentWrapper = styled.div`
//   width: 100%;
// `;
// const Author = styled.div`
//   margin-top: 12px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   letter-spacing: -0.02em;
// `;
// const NameSection = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
// `;
// const NameWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
// `;
// const Username = styled.div`
//   font-weight: bold;
//   font-size: 16px;
//   height: 20px;
//   display: flex;
//   align-items: center;
// `;
// const NickName = styled.div`
//   font-size: 16px;
//   color: rgb(83, 100, 113);
//   height: 20px;
//   display: flex;
//   align-items: center;
//   /* margin-left: 4px; */
// `;
// const Date = styled.div`
//   color: rgb(83, 100, 113);
//   height: 20px;
//   display: flex;
//   align-items: center;
//   /* margin-left: 4px; */
// `;
// const SDropdownToggle = styled(Dropdown.Toggle)`
//   border-radius: 50%;
//   background-color: white;
//   width: 18.75px;
//   height: 18.75px;
//   border: none;
//   &:hover {
//     background-color: white;
//   }
// `;
// const Answer = styled.div`
//   width: 100%;
//   display: flex;
// `;
// const Answertext = styled.div`
//   font-size: 16px;
//   color: rgb(83, 100, 113);
//   height: 20px;
//   display: flex;
//   align-items: center;
// `;
// const Text = styled.div`
//   font-size: 1rem;
//   letter-spacing: -0.02em;
//   line-height: 1.6rem;
// `;

// const IconRow = styled.div`
//   height: 20px;
//   margin: 12px 0;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;
// const IconBox = styled.div`
//   display: flex;
// `;

// interface IIconBg {
//   iconBgColor: string;
//   iconColor: string;
// }
// const IconBg = styled.div<IIconBg>`
//   height: 34.75px;
//   width: 34.75px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   &:hover {
//     background-color: ${(props) => props.iconBgColor};
//     color: ${(props) => props.iconColor};
//   }
// `;

// const Count = styled.div`
//   padding: 0 4px;
//   font-size: 0.8rem;
//   color: rgb(83, 100, 113);
//   display: flex;
//   align-items: center;
// `;

interface SingleTweetCommentInterface {
  userlogo: string;
  username: string;
  userNickname: string;
  responserUserNickname: string;
  messageText: string;
  messageDate: string;
  answerCount: number;
  retweetCount: number;
  likeCount: number;
}

const SingleTweetComment: React.FC<SingleTweetCommentInterface> = (
  {
    // userlogo,
    // username,
    // userNickname,
    // responserUserNickname,
    // messageText,
    // messageDate,
    // answerCount,
    // retweetCount,
    // likeCount,
  }
) => {
  //   const bgBlue = "rgb(29, 155, 240, 0.1)";
  //   const Blue = "rgb(29, 155, 240)";

  //   const { t } = useTranslation();

  return (
    <div>
      1
      {/* <Wrapper>
        <Avatar
          size="48"
          round="50%"
          twitterHandle="sitebase"
          name={username}
          src={userlogo}
        />
        <CommentWrapper>
          <Author>
            <NameSection>
              <NameWrapper>
                <Username>{username}</Username>
                <NickName className="pl-1">{userNickname}</NickName>
                <Date className="pl-1">{messageDate}</Date>
              </NameWrapper>
              <Dropdown>
                <SDropdownToggle
                  variant="success"
                  id="dropdown-basic"
                  className="p-0"
                >
                  <ThreeDots color="black" />
                </SDropdownToggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    {t("bookmarks.menuAdd")}
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    {t("bookmarks.menuRemove")}
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    {t("bookmarks.menuMute")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </NameSection>
            <Answer>
              <Answertext>{t("bookmarks.replyingTo")}</Answertext>
              <NickName className="ms-1">{responserUserNickname}</NickName>
            </Answer>
          </Author>
          <Text>{messageText}</Text>
          <AttachedContent />
          <IconRow>
            <IconBox>
              <IconBg
                iconBgColor={bgBlue}
                iconColor={Blue}
                className="m-0 p-0 rounded-circle row align-items-center justify-content-center"
              >
                <Chat className="p-0 m-0" />
              </IconBg>
              <Count>{answerCount}</Count>
            </IconBox>
            <RetweetButton retweetCount={retweetCount} />
            <LikeButton likesCount={likeCount} />
            <IconBox>
              <IconBg
                iconBgColor={bgBlue}
                iconColor={Blue}
                className="m-0 p-0 rounded-circle row align-items-center justify-content-center"
              >
                <Upload className="p-0 m-0" />
              </IconBg>
            </IconBox>
          </IconRow>
        </CommentWrapper>
      </Wrapper> */}
    </div>
  );
};

export default SingleTweetComment;
