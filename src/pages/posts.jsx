import { useState, useEffect } from "react";
import { css } from "@emotion/css";

import MemoSectionTitle from "../components/organisms/section/section-title";
import SearchBar from "../components/organisms/bar/search-bar";
import TabBar from "../components/organisms/bar/tab-bar";
import ItemContainer from "../components/organisms/container/item-container";

import {
  sessionGetItemObj,
  sessionStoreItemObj,
} from "../utils/session-store-item-obj";

const defaultObj = {
  page: 0,
  keyword: "",
  itemType: "a",
  scrollY: 0,
};

const Posts = ({ itemProps }) => {
  const { itemList, setItemList, loaded, setLoaded } = itemProps;
  const [itemEnd, setItemEnd] = useState(false);

  // 세션 스토리지에 저장할 값
  const [page, setPage] = useState(defaultObj.page);
  const [keyword, setKeyword] = useState(defaultObj.keyword);
  const [itemType, setItemType] = useState(defaultObj.itemType);
  const [scrollY, setScrollY] = useState(defaultObj.scrollY);

  const stateObj = {
    page,
    keyword,
    itemType,
  };

  /**
   * Posts가 onmount될 때 실행
   * @param {*} stateObj 현재 상태 State 객체
   * @param {*} defaultObj 기본값 객체
   * @param {*} storageObj Session Storage 객체
   * @returns void
   */
  const onmountHandler = (stateObj, defaultObj, storageObj) => {
    const currentCase = isMatchTwoObj(stateObj, storageObj);
    const defaultCase = storageObj.itemType === undefined;
    const storageCase = false === isMatchTwoObj(stateObj, storageObj);

    if (currentCase) {
      setLoaded(true);
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
    setLoaded(true);
  };

  const storageToState = (storageObj) => {
    setItemType(storageObj.itemType);
    setPage(storageObj.page);
    setKeyword(storageObj.keyword);
    setScrollY(storageObj.scrollY);
    console.log("스토리지로부터 데이터 패치 완료");
    setLoaded(true);
  };

  /** -posts/에서 fetch한 response 배열을 itemList에 저장 */
  const fetchItems = async (obj) => {
    if (itemEnd) return;

    const API_URL = process.env.REACT_APP_API;
    const api = setApiUri(API_URL, obj);
    console.log(api);

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    let resList = await (
      await fetch(api, options).catch((err) => console.log(err))
    ).json();

    if (resList.length === 0) {
      setItemEnd(true);
    } else if (page === 0) {
      setItemList(resList);
    } else if (resList) {
      setItemList((prev) => [...prev, ...resList]);
    }
  };

  const setApiUri = (API_URL, obj) => {
    const { itemType = "a", keyword = "", page } = obj;

    let api = `${API_URL}/${itemType}-posts?page=${page}`;
    if (keyword) api += `&search=${keyword}`;

    return api;
  };

  useEffect(() => {
    const prevObj = sessionGetItemObj();
    onmountHandler(stateObj, defaultObj, prevObj);

    return () => setLoaded(false);
  }, [itemType, keyword]);

  return (
    <>
      <div
        className={css`
          margin: 3rem 0;
          padding: 0 2.5rem;

          .border-bottom {
            margin-bottom: 0.5rem;
            border-bottom: 1px solid #e5e7eb;
          }
        `}
      >
        <MemoSectionTitle />

        {loaded && (
          <>
            <SearchBar
              fetchItems={fetchItems}
              keyword={keyword}
              setKeyword={setKeyword}
              setItemList={setItemList}
              setLoaded={setLoaded}
            />
            <TabBar
              setItemType={setItemType}
              itemType={itemType}
              setPage={setPage}
            />
            <ItemContainer
              fetchItems={fetchItems}
              itemList={itemList}
              page={page}
              setPage={setPage}
              itemType={itemType}
              setItemType={setItemType}
              setScrollY={setScrollY}
              itemEnd={itemEnd}
              keyword={keyword}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
