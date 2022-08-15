import { Dropdown } from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 598px;
  padding: 0 16px;
  text-align: left;
`;
const Author = styled.div`
  height: 48px;
  margin-top: 12px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
`;
const Logo = styled.img`
  margin-right: 12px;
  border-radius: 50%;
`;
const NameSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const NameWrapper = styled.div``;
const Name = styled.div`
  font-weight: bold;
  font-size: 16px;
  height: 20px;
  display: flex;
  align-items: center;
`;
const NickName = styled.div`
  font-size: 16px;
  height: 20px;
  display: flex;
  align-items: center;
`;
const SDropdownToggle = styled(Dropdown.Toggle)`
  border-radius: 50%;
  background-color: white;
  width: 18.75px;
  height: 18.75px;
  padding: 0;
  border: none;
  margin-left: 20px;
  &:hover {
    background-color: white;
  }
`;
const Text = styled.div`
  font-size: 1.4rem;
  letter-spacing: -0.02em;
  line-height: 1.6rem;
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
  font-size: 14px;
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
const IconRow = styled.div`
  border-bottom: solid 1.5px #e6e6e6;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const IconBg = styled.div`
  height: 38.5px;
  width: 38.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
const IconChatBg = styled(IconBg)`
  &:hover {
    background-color: rgb(29, 155, 240, 0.1);
  }
`;
const IconMessegeBg = styled(IconBg)`
  &:hover {
    background-color: rgb(0, 186, 124, 0.1);
  }
`;
const IconLikeBg = styled(IconBg)`
  &:hover {
    background-color: rgb(249, 24, 128, 0.1);
  }
`;
const IconUploadBg = styled(IconBg)`
  &:hover {
    background-color: rgb(29, 155, 240, 0.1);
  }
`;

const Icons = styled.svg`
  width: 22.5px;
  height: 22.5px;
  fill: rgb(83, 100, 113);
  padding: 0;
  transition-duration: 0.2s;
  border-radius: 50%;
`;
const IconChat = styled(Icons)`
  &:hover {
    fill: rgb(29, 155, 240);
  }
`;
const IconMessege = styled(Icons)`
  &:hover {
    fill: rgb(0, 186, 124);
  }
`;
const IconLike = styled(Icons)`
  &:hover {
    fill: rgb(249, 24, 128);
  }
`;
const IconUpload = styled(Icons)`
  &:hover {
    fill: rgb(29, 155, 240);
  }
`;

const SingleTweet = () => {
  return (
    <div>
      <Wrapper>
        <Author>
          <Logo src="https://pbs.twimg.com/profile_images/2204738923/justlviv_normal.jpg" />
          <NameSection>
            <NameWrapper>
              <Name>Ярослав Львівський</Name>
              <NickName>@justlviv</NickName>
            </NameWrapper>
            <Dropdown>
              <SDropdownToggle variant="success" id="dropdown-basic">
                <svg viewBox="0 0 24 24">
                  <g stroke="grey">
                    <circle cx="5" cy="10" r="2" />
                    <circle cx="12" cy="10" r="2" />
                    <circle cx="19" cy="10" r="2" />
                  </g>
                </svg>
              </SDropdownToggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Почати читати</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Додати/Видалити</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Ігнорувати</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </NameSection>
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
        <IconRow>
          <IconChatBg>
            <IconChat>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                </g>
              </svg>
            </IconChat>
          </IconChatBg>
          <IconMessegeBg>
            <IconMessege>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
                </g>
              </svg>
            </IconMessege>
          </IconMessegeBg>
          <IconLikeBg>
            <IconLike>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
                </g>
              </svg>
            </IconLike>
          </IconLikeBg>
          <IconUploadBg>
            <IconUpload>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z" />
                  <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z" />
                </g>
              </svg>
            </IconUpload>
          </IconUploadBg>
        </IconRow>
      </Wrapper>
    </div>
  );
};

export default SingleTweet;
