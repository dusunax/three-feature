import { useState, useEffect } from "react";
import { css } from "@emotion/css";

import SectionTitle from "../components/organisms/section/section-title";
import SearchBar from "../components/organisms/bar/search-bar";
import TabBar from "../components/organisms/bar/tab-bar";
import ItemContainer from "../components/organisms/container/item-container";

import {
  sessionGetItemObj,
  sessionStoreItemObj,
} from "../utils/session-store-item-obj";

const Posts = () => {
  const [itemList, setItemList] = useState([]);
  const defaultValue = {
    itemType: "a",
    page: 0,
    keyword: "",
  };
  const [itemProps, setItemProps] = useState(defaultValue);
  const { itemType, page, keyword } = itemProps;

  const compareValues = (prevStorage, currState) => {
    if (prevStorage === currState) return;
    if (currState === {}) setItemProps(defaultValue);

    let isDefault = true;
    for (const key in currState) {
      if (currState[key] !== defaultValue[key]) {
        isDefault = false;
        break;
      }
    }
    if (isDefault) {
      sessionStoreItemObj(defaultValue);
      return;
    }

    loadPrevState(prevStorage);
  };

  const loadPrevState = (prevStorage) => {
    setItemProps((prev) => ({
      ...prev,
      ...prevStorage,
    }));
  };

  const fetchItems = async (args) => {
    const { itemType = "a", keyword = "", page = 0 } = args;
    const API_URL = process.env.REACT_APP_API;
    let api = `${API_URL}/${itemType}-posts?`;

    if (page >= 0) {
      api += `page=${page}`;
    }
    if (keyword) api += `&search=${keyword}`;

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    let resList = await (
      await fetch(api, options).catch((err) => console.log(err))
    ).json();

    if (resList) {
      setItemList(resList);
      setItemProps((prev) => ({ ...prev, page: prev.page++ }));
    }
  };

  useEffect(() => {
    const prevObj = sessionGetItemObj();
    compareValues(prevObj, itemProps);
  }, []);

  return (
    <>
      <div
        className={css`
          padding: 2.5rem;
          .border-bottom {
            margin-bottom: 0.5rem;
            border-bottom: 1px solid #e5e7eb;
          }
        `}
      >
        <SectionTitle />
        <SearchBar
          fetchItems={fetchItems}
          setItemProps={setItemProps}
          itemProps={itemProps}
        />
        <TabBar setItemProps={setItemProps} />
        <ItemContainer
          fetchItems={fetchItems}
          itemList={itemList}
          itemProps={itemProps}
        />
      </div>
    </>
  );
};

export default Posts;
