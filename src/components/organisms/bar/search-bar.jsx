import React, { useRef } from "react";
import SearchInput from "../../atoms/input/search-input";

import { debounce } from "../../../utils/debounce-func";
import { sessionStoreItemObj } from "../../../utils/session-store-item-obj";

const SearchBar = ({ fetchItems, keyword, setKeyword }) => {
  const timeout = useRef(null);
  const timerOpt = { delay: 150, timeout };

  const searchItemList = (keyword) => {
    const args = { keyword };
    fetchItems(args);
  };

  const inputChangeHandler = debounce((e) => {
    let inputText = e.target.value;
    while (inputText.indexOf(" ") > -1) {
      inputText = inputText.replace(" ", "+");
    }
    const newKeywordObj = { keyword: inputText };

    searchItemList(inputText);
    setKeyword(inputText);

    sessionStoreItemObj(newKeywordObj);
  }, timerOpt);

  return (
    <>
      <SearchInput inputChangeHandler={inputChangeHandler} keyword={keyword} />
    </>
  );
};

export const MemoSearchBar = React.memo(SearchBar);
