import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Search as SearchIcon } from "react-bootstrap-icons";
import AsyncTypeahead from "react-bootstrap-typeahead/types/components/AsyncTypeahead";
import { Option } from "react-bootstrap-typeahead/types/types";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { tagsActions } from "../redux/reducers/tags";
import { AppDispatch, RootState } from "../redux/store";
import { Tag } from "../types";

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

const TagItem = ({ tag }: { tag: Tag }) => {
  return (
    <div className="d-flex align-items-center">
      <div className="fs-5 my-2 p-1">
        <p>
          <SearchIcon size={24} className="me-3" />#{tag.name}
        </p>
      </div>
    </div>
  );
};

export const AsyncSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Tag[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const tags = useSelector<RootState, RootState["tags"]["tags"]>(
    (store) => store.tags.tags
  );

  // console.log("tags store", tags.docs);

  const handleSearch = (query: string) => {
    dispatch(tagsActions.fetchTags());
    setIsLoading(true);
    // console.log("search");
    const arr = tags.docs;
    const searchResult: Tag[] = [];
    arr.map((item: Tag) => {
      if (item.name.toLowerCase().includes(query.toLowerCase())) {
        searchResult.push(item);
      }
    });
    const res = searchResult || [];
    setOptions(res);
    setIsLoading(false);
    // console.log("search res", res);
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
            filterBy={() => true}
            id="async-example"
            isLoading={isLoading}
            labelKey="name"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            delay={500}
            caseSensitive={false}
            inputProps={{
              className: "form-control border-0 bg-light px-3 fs-6  ",
              type: "text",
              placeholder: t("search.placeholder"),
            }}
            size="sm"
            renderMenuItemChildren={(option: Option) => (
              <TagItem tag={{ ...(option as Tag) }} />
            )}
          />
        </div>
      </StyledInputGroup>
    </StyledForm>
  );
};
