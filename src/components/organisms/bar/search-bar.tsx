import { useRef } from "react";
import SearchInput from "../../atoms/input/search-input";

import { debounce } from "../../../utils/debounce-func";
import { sessionStoreItemObj } from "../../../utils/session-store-item-obj";

import ItemObj from "../../../models/item-obj";

const SearchBar = ({
  fetchItems,
  stateObj,
  keyword,
  setKeyword,
  itemList,
  setPage,
}: {
  fetchItems: (obj: ItemObj) => void;
  stateObj: ItemObj;
  keyword: string;
  setKeyword: (arg0: string) => void;
  setPage: (arg0: number) => void;
  itemList: { content: string; id: number; title: string }[];
}) => {
  const timeout = useRef(null);
  const timerOpt = { delay: 150, timeout };

  const queryStringify = (value: string) => {
    while (value.indexOf(" ") > -1) {
      value = value.replace(" ", "+");
    }
    return value;
  };

  const inputChangeHandler = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputText = queryStringify(e.target.value);
      if (keyword === "") setPage(0);

      setKeyword(inputText);
      sessionStoreItemObj({ keyword: inputText });
    },
    timerOpt
  );

  return (
    <>
      <SearchInput inputChangeHandler={inputChangeHandler} keyword={keyword} />
    </>
  );
};

export default SearchBar;
