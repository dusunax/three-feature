import { useState, useEffect } from "react";
import { css } from "@emotion/css";

import MemoSectionTitle from "../components/organisms/section/section-title";
import { MemoSearchBar } from "../components/organisms/bar/search-bar";
import TabBar from "../components/organisms/bar/tab-bar";
import ItemContainer from "../components/organisms/container/item-container";

import {
  sessionGetItemObj,
  sessionStoreItemObj,
} from "../utils/session-store-item-obj";

const Posts = () => {
  const [loaded, setLoaded] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [itemEnd, setItemEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState();
  const defaultValue = {
    itemType: "a",
  };
  const [itemProps, setItemProps] = useState({ itemType: "a" });
  const { itemType } = itemProps;

  const [scrollY, setScrollY] = useState(0);

  const postsMountHandler = (stateObj, defaultObj, storageObj) => {
    const currentCase = isMatchTwoObj(stateObj, storageObj);
    const defaultCase = storageObj.itemType === undefined;
    const storageCase = false === isMatchTwoObj(stateObj, storageObj);

    setLoaded(true);

    if (currentCase) {
      return;
    } else if (defaultCase) {
      stateToDefault(defaultObj);
      return;
    } else if (storageCase) {
      console.log("스토리지의 데이터를 가져왔습니다.");
      storageToState(storageObj);

      if (storageObj.scrollY) {
        setTimeout(() => {
          document.documentElement.scrollTo({
            top: storageObj.scrollY,
          });
          console.log(storageObj.scrollY);
        }, 100);
      }
    }
  };

  const isMatchTwoObj = (objA, objB) => {
    for (const key in objA) {
      if (objA[key] !== objB[key]) return false;
    }
    if (objA.itemType === undefined) return false;
    return true;
  };

  const stateToDefault = (defaultObj) => {
    sessionStoreItemObj(defaultObj);
    console.log("세션에 데이터 기본값 저장 완료");
  };

  // const stateToStorage = (stateObj) => {
  //   sessionStoreItemObj(stateObj);
  //   console.log("세션에 데이터를 저장 완료");
  // };

  const storageToState = (storageObj) => {
    setItemProps((prev) => ({
      ...prev,
      itemType: storageObj.itemType,
    }));
    setPage(storageObj.page);
    setKeyword(storageObj.keyword);
    setScrollY(storageObj.scrollY);
    console.log("스토리지로부터 데이터 패치 완료");
  };

  const fetchItems = async (args) => {
    if (itemEnd) return;

    console.log("api요청");
    const { itemType = "a", keyword = "", page } = args;
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
      setItemList((prev) => [...prev, ...resList]);
      setPage((prev) => prev + 1);
    } else if (resList === []) {
      setItemEnd(true);
    }
  };

  useEffect(() => {
    // window
    const prevObj = sessionGetItemObj();
    console.log("리랜더링", itemList);

    postsMountHandler(itemProps, defaultValue, prevObj);
  }, [keyword, loaded]);

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
        <MemoSectionTitle />

        {loaded && (
          <>
            <MemoSearchBar
              fetchItems={fetchItems}
              setKeyword={setKeyword}
              keyword={keyword}
              itemType={itemType}
            />
            <TabBar
              setItemProps={setItemProps}
              itemType={itemType}
              setPage={setPage}
            />
            <ItemContainer
              fetchItems={fetchItems}
              itemList={itemList}
              itemProps={itemProps}
              page={page}
              setPage={setPage}
              setItemProps={setItemProps}
              setScrollY={setScrollY}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
