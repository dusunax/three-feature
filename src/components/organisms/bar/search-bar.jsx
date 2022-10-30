import { useState } from "react";
import SearchInput from "../../atoms/input/search-input";

import { debounce } from "../../../utils/debounce-func";
import { sessionStoreItemObj } from "../../../utils/session-store-item-obj";

const SearchBar = ({ fetchItems, itemProps, setItemProps }) => {
  const { keyword, itemType } = itemProps;
  const [timer, setTimer] = useState();
  const timerOpt = { delay: 150, timer, setTimer };

  const searchItemList = (keyword) => {
    const args = { keyword, itemType };
    fetchItems(args);
  };

  const inputChangeHandler = debounce((e) => {
    let inputText = e.target.value;
    while (inputText.indexOf(" ") > -1) {
      inputText = inputText.replace(" ", "+");
    }
    const newKeywordObj = { keyword: inputText };

    searchItemList(inputText);
    setItemProps((prev) => ({ ...prev, ...newKeywordObj }));
    sessionStoreItemObj(newKeywordObj);
  }, timerOpt);

  return (
    <>
      <SearchInput inputChangeHandler={inputChangeHandler} keyword={keyword} />
    </>
  );
};

export default SearchBar;
