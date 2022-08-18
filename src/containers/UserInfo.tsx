import { Card, Button, Row } from "react-bootstrap";
import { GeoAlt, Link45deg, Balloon, Calendar3 } from "react-bootstrap-icons";
import styled from "styled-components";

// const StyledImg = styled.img``;
const StyledCardBody = styled(Card.Body)`
  height: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

interface ISingleTweet {
  //   headLogo: string;
  //   userLogo: string;
  //   username: string;
  //   flagLogo: string;
  //   userNickname: string;
  //   aboutMeText: string;
  //   userLocation: string;
  //   userEmail: string;
  //   userBirthday: string;
  //   registrationDate: string;
  //   inReadersCount: number;
  //   readersCount: number;
}

const UserInfo: React.FC<ISingleTweet> = (
  {
    //   headLogo,
    //   userLogo,
    //   flagLogo,
    //   username,
    //   userNickname,
    //   aboutMeText,
    //   userLocation,
    //   userEmail,
    //   userBirthday,
    //   registrationDate,
    //   inReadersCount,
    //   readersCount,
  }
) => {
  return (
    <Card className="rounded-0 border-0">
      <Card.Img
        variant="top"
        className="rounded-0"
        src="https://pbs.twimg.com/profile_banners/1046347250056785921/1646207195/600x200"
        // src={headLogo}
      />

      <StyledCardBody className="p-0">
        <img
          className="rounded-circle ms-3"
          src="https://pbs.twimg.com/profile_images/1083307064900894720/YFIO7aEK_200x200.jpg"
          //   src={userLogo}
          height="134"
          width="134"
        />
      </StyledCardBody>

      <Card.Body>
        <Row xs="auto" className="justify-content-end m-0">
          <Button
            variant="light"
            className="p-2 justify-content-center align-items-center rounded-pill border border-1"
            type="button"
          >
            Змінити профіль
          </Button>
        </Row>
      </Card.Body>

      <Card.Body className="py-2">
        <Row xs="auto" className="align-items-center">
          <Card.Text className="fw-bold text-dark pe-1">
            alexandrtovmach
            {/* {username} */}
          </Card.Text>
          <img
            className="p-0 m-0"
            height="24"
            width="24"
            src="https://abs-0.twimg.com/emoji/v2/svg/1f1fa-1f1e6.svg"
            // src={flagLogo}
          />
        </Row>
        <Row xs="auto">
          <Card.Text>
            @alexandrtovmach
            {/* {userNickname} */}
          </Card.Text>
        </Row>
      </Card.Body>

      <Card.Body className="py-2">
        <Row xs="auto">
          <Card.Text>
            make it bette if you can
            {/* {aboutMeText} */}
          </Card.Text>
        </Row>
      </Card.Body>

      <Card.Body className="py-2">
        <Row xs="auto">
          <Card.Text className="pe-1">
            <GeoAlt />
          </Card.Text>
          <Card.Text className="p-0">
            Ukraine, Lviv
            {/* {userLocation} */}
          </Card.Text>
          <Card.Text className="pe-1">
            <Link45deg />
          </Card.Text>
          <Card.Text className="p-0">
            alexandrtovmach.com
            {/* {userEmail} */}
          </Card.Text>
        </Row>
        <Row xs="auto">
          <Card.Text className="pe-1">
            <Balloon />
          </Card.Text>
          <Card.Text className="p-0">
            {/* Дата наробження: {userBirthday} */}2 жовтня 1995 р.
          </Card.Text>
          <Card.Text className="pe-1">
            <Calendar3 />
          </Card.Text>
          <Card.Text className="p-0">
            {/* Регистрація: {registrationDate} */}
            вересень 2018 р
          </Card.Text>
        </Row>
      </Card.Body>

      <Card.Body className="py-2">
        <Row xs="auto">
          <Card.Text className="pe-1 fw-bold">
            {/* {inReadersCount} */}
            40
          </Card.Text>
          <Card.Text className="p-0">в читаємих</Card.Text>
          <Card.Text className="pe-1 fw-bold">
            {/* {readersCount} */}
            100
          </Card.Text>
          <Card.Text className="p-0">читача</Card.Text>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
