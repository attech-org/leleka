/* eslint-disable */
import { Form, InputGroup, Image } from "react-bootstrap";
import { Search as SearchIcon } from "react-bootstrap-icons";
import styled from "styled-components";

import { useState } from "react";
import AsyncTypeahead from "react-bootstrap-typeahead/types/components/AsyncTypeahead";
import { Option } from "react-bootstrap-typeahead/types/types";
import { MockUser } from "../types/mock-api-types";
import { useTranslation } from "react-i18next";

import users from "../MOCKS/users";
const StyledForm = styled(Form)`
  border: 2px solid transparent;
  :focus-within {
    color: rgb(29, 155, 240);
    border-color: rgb(29, 155, 240);
  }
`;

const StyledInputGroup = styled(InputGroup)`
  input:focus {
    box-shadow: none;
  }
`;
const UserItem = ({ user }: { user: MockUser }) => {
  return (
    //TODO: add router push to user details page when created
    <div className="d-flex align-items-center">
      <div className="p-1">
        <Image width={50} height={50} roundedCircle src={user.userPhotoUrl} />
      </div>
      <div className="p-1">
        <p className="fw-bold">{user.userFirstName + user.userLastName}</p>
        <p>@{user.userName}</p>
        <p>{user.userCaption}</p>
      </div>
    </div>
  );
};
export const AsyncSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Array<MockUser>>([]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    const arr = users;
    const searchResult: Array<MockUser> = [];
    arr.map((user: MockUser) => {
      if (user.userName.includes(query)) searchResult.push(user);
    });
    const res = searchResult || [];
    setOptions(res);
    setIsLoading(false);
  };
  const { t } = useTranslation();
  return (
    <StyledForm className="justify-content-center align-items-center mx-1 my-2 rounded-pill bg-light px-3 py-1">
      <StyledInputGroup
        className="align-items-center bg-light"
        id="basic-addon1"
      >
        <div style={{ width: "10%" }}>
          <SearchIcon size={18} className="ms-1" />
        </div>
        <div style={{ width: "90%" }}>
          <AsyncTypeahead
            filterBy={["userName", "userFirstName", "userLastName"]}
            id="async-example"
            isLoading={isLoading}
            labelKey="userName"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            delay={300}
            inputProps={{
              className: "form-control border-0 bg-light px-3 fs-6  ",
              type: "text",
              placeholder: t("search.placeholder"),
            }}
            size="sm"
            renderMenuItemChildren={(option: Option, props) => (
              <UserItem user={{ ...(option as MockUser) }} />
            )}
          />
        </div>
      </StyledInputGroup>
    </StyledForm>
  );
};
