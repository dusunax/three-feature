import { useRef } from "react";
import SearchInput from "../../atoms/input/search-input";

import { debounce } from "../../../utils/debounce-func";
import { sessionStoreItemObj } from "../../../utils/session-store-item-obj";

const SearchBar = ({ keyword, setKeyword }) => {
  const timeout = useRef(null);
  const timerOpt = { delay: 150, timeout };

  const queryStringify = (value) => {
    while (value.indexOf(" ") > -1) {
      value = value.replace(" ", "+");
    }
    return value;
  };

  const inputChangeHandler = debounce((e) => {
    let inputText = queryStringify(e.target.value);

    setKeyword(inputText);
    sessionStoreItemObj({ keyword: inputText });
  }, timerOpt);

  return (
    <>
      <SearchInput inputChangeHandler={inputChangeHandler} keyword={keyword} />
    </>
  );
};

export default SearchBar;
