import React from "react";
import styled from "styled-components";

const Content = styled.div`
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ContentImage = styled.img`
  width: ${(props: { fullImg: boolean }) =>
    props.fullImg ? "100%" : "calc(50% - 1px)"};
  margin-bottom: 2px;
`;

const ContentVideo = styled.video`
  width: 100%;
`;
const AttachedContent: React.FC = () => {
  const content: string[] = [];
  const RandomizerContent = (): void => {
    const amountContent: number = Math.floor(Math.random() * 5 + 1);
    for (let i = 0; i < amountContent; i++) {
      content.push(
        `https://picsum.photos/${Math.floor(
          Math.random() * 300 + 200
        )}/${Math.floor(Math.random() * 200 + 100)}`
      );
    }
  };
  RandomizerContent();

  return (
    <Content>
      {content.map((cont, index, arr) => {
        return (
          <ContentImage
            src={cont}
            key={index}
            fullImg={arr.length == index + 1 && arr.length % 2 ? true : false}
          />
        );
      })}

      <ContentVideo
        src="https://video.twimg.com/ext_tw_video/1506247688261537793/pu/vid/640x360/EbN6H4_tATC8RFxc.mp4?tag=12"
        controls
      />
    </Content>
  );
};

export default AttachedContent;
