import { Card, Button, Row } from "react-bootstrap";
import { GeoAlt, Link45deg, Balloon, Calendar3 } from "react-bootstrap-icons";
import styled from "styled-components";

const StyledCardBody = styled(Card.Body)`
  height: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

interface UserInfoInterface {
  headLogo: string;
  userLogo: string;
  username: string;
  flagLogo?: string;
  userNickname: string;
  aboutMeText?: string;
  userLocation?: string;
  userEmail?: string;
  userBirthday?: string;
  registrationDate: string;
  inReadersCount: number;
  readersCount: number;
}

const UserInfo: React.FC<UserInfoInterface> = ({
  headLogo,
  userLogo,
  flagLogo,
  username,
  userNickname,
  aboutMeText,
  userLocation,
  userEmail,
  userBirthday,
  registrationDate,
  inReadersCount,
  readersCount,
}) => {
  return (
    <Card className="rounded-0 border-0">
      <Card.Img variant="top" className="rounded-0" src={headLogo} />

      <StyledCardBody className="p-0">
        <img
          className="rounded-circle ms-3"
          src={userLogo}
          height="134"
          width="134"
          alt="avatar"
        />
      </StyledCardBody>

      <Card.Body>
        <Row xs="auto" className="justify-content-end m-0">
          <Button
            variant="light"
            className="p-2 justify-content-center align-items-center rounded-pill border border-1 bg-white"
            type="button"
          >
            Змінити профіль
          </Button>
        </Row>
      </Card.Body>

      <Card.Body className="py-2">
        <Row xs="auto" className="align-items-center">
          <Card.Text className="fw-bold text-dark pe-1">{username}</Card.Text>
          <img
            className="p-0 m-0"
            height="24"
            width="24"
            alt="avatar"
            src={flagLogo}
          />
        </Row>
        <Row xs="auto">
          <Card.Text>{userNickname}</Card.Text>
        </Row>
      </Card.Body>

      <Card.Body className="py-2">
        <Row xs="auto">
          <Card.Text>{aboutMeText}</Card.Text>
        </Row>
      </Card.Body>

      <Card.Body className="py-2">
        <Row xs="auto">
          <Card.Text className="pe-1">
            <GeoAlt />
          </Card.Text>
          <Card.Text className="p-0">{userLocation}</Card.Text>
          <Card.Text className="pe-1">
            <Link45deg />
          </Card.Text>
          <Card.Text className="p-0">{userEmail}</Card.Text>
        </Row>
        <Row xs="auto">
          <Card.Text className="pe-1">
            <Balloon />
          </Card.Text>
          <Card.Text className="p-0">{userBirthday}</Card.Text>
          <Card.Text className="pe-1">
            <Calendar3 />
          </Card.Text>
          <Card.Text className="p-0">{registrationDate}</Card.Text>
        </Row>
      </Card.Body>

      <Card.Body className="py-2">
        <Row xs="auto">
          <Card.Text className="pe-1 fw-bold">{inReadersCount}</Card.Text>
          <Card.Text className="p-0">в читаємих</Card.Text>
          <Card.Text className="pe-1 fw-bold">{readersCount}</Card.Text>
          <Card.Text className="p-0">читача</Card.Text>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
