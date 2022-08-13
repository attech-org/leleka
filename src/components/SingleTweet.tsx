import { Button } from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  max-width: 598px;
  height: 334px;
  padding: 0 16px;
  border: solid 1px;
  text-align: left;
`;
const Author = styled.div`
  height: 48px;
  background-color: #d4ffc7;
  margin-top: 12px;
  margin-bottom: 4px;
  display: flex;
`;
const Logo = styled.div``;
const NameWrapper = styled.div``;
const Name = styled.div`
  font-weight: bold;
  font-size: 14px;
`;
const NickName = styled.div`
  font-size: 14px;
`;
const Text = styled.div`
  font-size: 1.4rem;
  margin-top: 12px;
`;
const DateRow = styled.div`
  border-bottom: solid 1.5px #e6e6e6;
`;
const Date = styled.div`
  color: rgb(83, 100, 113);
  height: 20px;
  margin: 16px 0;
  display: flex;
  align-items: center;
`;
const StatisticRow = styled.div`
  border-bottom: solid 1.5px #e6e6e6;
`;
const Statistic = styled.div`
  height: 20px;
  font-size: 12px;
  color: gray;
  margin: 16px 0;
  display: flex;
  align-items: center;
`;
const Bold = styled.b`
  font-weight: bold;
  color: black;
`;
const Span = styled.span`
  margin-right: 12px;
`;
const Buttons = styled.div`
  border-bottom: solid 1.5px #e6e6e6;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const SButton = styled(Button)`
  width: 22.5px;
  height: 22.5px;
  background-color: white;
  color: black;
  padding: 0;
`;

const SingleTweet = () => {
  return (
    <div>
      <Wrapper>
        <Author>
          <Logo>Logo</Logo>
          <NameWrapper>
            <Name>Ярослав Львівський</Name>
            <NickName>@justlviv</NickName>
          </NameWrapper>
          <SButton>...</SButton>
        </Author>
        <Text>
          "Все, бля, я поняв, як блокування дальності знімати" - Андрій,
          мобілізований it-спеціаліст, член екіпажу HIMARS. 9 серпня 2022.
        </Text>
        <DateRow>
          <Date>10:00 AM · 10 сер. 2022 р. - Leleka Web App</Date>
        </DateRow>
        <StatisticRow>
          <Statistic>
            <Span>
              <Bold> 1 215</Bold> рекурликів
            </Span>
            <Span>
              <Bold> 44</Bold> курлика с цитатами
            </Span>
            <Span>
              <Bold> 11,8 тис.</Bold> відміток «Подобається»
            </Span>
          </Statistic>
        </StatisticRow>
        <Buttons>
          <SButton>1</SButton>
          <SButton>2</SButton>
          <SButton>3</SButton>
          <SButton>4</SButton>
        </Buttons>
      </Wrapper>
    </div>
  );
};

export default SingleTweet;
