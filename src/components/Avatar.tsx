import React from "react";
import styled from "styled-components";

interface LogoProps {
  initials: string;
  colors: ColorsInterface;
}

interface ColorsInterface {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  colorDefault: string;
}

const colors: ColorsInterface = {
  color1: "#3442c7",
  color2: "#00B74A",
  color3: "#A62000",
  color4: "#FFBA00",
  colorDefault: "#b3b3b3",
};

const Logo = styled.div<LogoProps>`
  height: 48px;
  width: 48px;
  background-color: ${(props) => {
    switch (props.initials.charAt(0)) {
      case "A":
        return props.colors.color1;
      case "B":
        return props.colors.color2;
      case "C":
        return props.colors.color3;
      case "D":
        return props.colors.color4;
      case "E":
        return props.colors.color1;
      case "F":
        return props.colors.color2;
      case "G":
        return props.colors.color3;
      case "H":
        return props.colors.color4;
      case "I":
        return props.colors.color1;
      case "J":
        return props.colors.color2;
      case "K":
        return props.colors.color3;
      case "L":
        return props.colors.color4;
      case "M":
        return props.colors.color1;
      case "N":
        return props.colors.color2;
      case "O":
        return props.colors.color3;
      case "P":
        return props.colors.color4;
      case "Q":
        return props.colors.color1;
      case "R":
        return props.colors.color2;
      case "S":
        return props.colors.color3;
      case "T":
        return props.colors.color4;
      case "U":
        return props.colors.color1;
      case "V":
        return props.colors.color2;
      case "W":
        return props.colors.color3;
      case "X":
        return props.colors.color4;
      case "Y":
        return props.colors.color1;
      case "Z":
        return props.colors.color2;
      default:
        return props.colors.colorDefault;
    }
  }};
  color: ${(props) => {
    switch (props.initials.charAt(0)) {
      case "A":
        return "white";
      case "B":
        return "black";
      case "C":
        return "white";
      case "D":
        return "black";
      case "E":
        return "white";
      case "F":
        return "black";
      case "G":
        return "white";
      case "H":
        return "black";
      case "I":
        return "white";
      case "J":
        return "black";
      case "K":
        return "white";
      case "L":
        return "black";
      case "M":
        return "white";
      case "N":
        return "black";
      case "O":
        return "white";
      case "P":
        return "black";
      case "Q":
        return "white";
      case "R":
        return "black";
      case "S":
        return "white";
      case "T":
        return "black";
      case "U":
        return "white";
      case "V":
        return "black";
      case "W":
        return "white";
      case "X":
        return "black";
      case "Y":
        return "white";
      case "Z":
        return "black";
      default:
        return "white";
    }
  }};
`;

interface AvatarProps {
  src: string;
  username: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, username }) => {
  const getInitials = (name: string): string => {
    return (
      (name.split(" ")[0] ? name.split(" ")[0].charAt(0).toUpperCase() : "") +
      (name.split(" ")[1] ? name.split(" ")[1].charAt(0).toUpperCase() : "")
    );
  };

  const initials = getInitials(username);

  return (
    <>
      {src ? (
        <img
          className="rounded-circle bg-primary"
          src={src}
          width="48px"
          height="48px"
          alt="avatar"
        />
      ) : (
        <Logo
          initials={initials}
          colors={colors}
          className="mx-0 p-4 d-flex justify-content-center align-items-center rounded-circle fw-bold fs-5"
        >
          {initials}
        </Logo>
      )}
    </>
  );
};

export default Avatar;
