import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { css } from "@emotion/css";

import MemoSectionTitle from "../components/organisms/section/section-title";
import SearchBar from "../components/organisms/bar/search-bar";
import TabBar from "../components/organisms/bar/tab-bar";
import ItemContainer from "../components/organisms/container/item-container";

import ItemObj from "../models/item-obj";
import ItemModel from "../models/item";

import {
  sessionGetItemObj,
  sessionStoreItemObj,
} from "../utils/session-store-item-obj";

const defaultObj: ItemObj = {
  page: -1,
  keyword: "",
  itemType: "a",
  scrollY: 0,
};

const Posts = ({
  itemProps,
  renderProps,
}: {
  itemProps: {
    itemList: ItemModel[];
    setItemList: Dispatch<SetStateAction<ItemModel[]>>;
    loaded: boolean;
    setLoaded: Dispatch<SetStateAction<boolean>>;
  };
  renderProps: {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    keyword: string;
    setKeyword: Dispatch<SetStateAction<string>>;
    itemType: string;
    setItemType: Dispatch<SetStateAction<string>>;
    scrollY: number | undefined;
    setScrollY: Dispatch<SetStateAction<number | undefined>>;
  };
}) => {
  const { itemList, setItemList, loaded, setLoaded } = itemProps;
  const [itemEnd, setItemEnd] = useState(false);

  const {
    page,
    setPage,
    keyword,
    setKeyword,
    itemType,
    setItemType,
    scrollY,
    setScrollY,
  } = renderProps;
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
  const onmountHandler = (
    stateObj: ItemObj,
    defaultObj: ItemObj,
    storageObj: ItemObj
  ) => {
    const currentCase = isMatchTwoObj(stateObj, storageObj);
    const defaultCase = page === -1;
    const storageCase = false === isMatchTwoObj(stateObj, storageObj);

    if (currentCase) {
      setLoaded(true);
      return;
    } else if (defaultCase) {
      stateToDefault({ ...defaultObj, page: 0 });
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

  const isMatchTwoObj = (objA: any, objB: any) => {
    for (const key in objA) {
      if (objA[key] !== objB[key]) return false;
    }
    if (objA.itemType === undefined) return false;
    return true;
  };

  const stateToDefault = (defaultObj: ItemObj) => {
    sessionStoreItemObj(defaultObj);
    setPage(0);
    console.log("세션에 데이터 기본값 저장 완료");
    setLoaded(true);
  };

  const storageToState = (storageObj: ItemObj) => {
    setItemType(storageObj.itemType);
    setPage(storageObj.page);
    setKeyword(storageObj.keyword);
    setScrollY(storageObj.scrollY);
    console.log("스토리지로부터 데이터 패치 완료");
    setLoaded(true);
  };

  /** -posts/에서 fetch한 response 배열을 itemList에 저장 */
  const fetchItems = async (obj: ItemObj) => {
    const API_URL = process.env.REACT_APP_API!;
    const api = setApiUri(API_URL, obj);
    console.log(api);

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    let resList: ItemModel[] = await (await fetch(api, options).catch((err) =>
      console.log(err)
    ))!.json();

    if (resList.length === 0) {
      setItemEnd(true);
    } else if (page === 0) {
      setItemList(resList);
    } else if (resList) {
      setItemList((prev: ItemModel[]) => [...prev, ...resList]);
    }
  };

  const setApiUri = (API_URL: string, obj: ItemObj): string => {
    if (obj.itemType === undefined) return "";
    const { itemType = "a", keyword = "", page } = obj;

    let api: string = `${API_URL}/${itemType}-posts?page=${page}`;
    if (keyword) api += `&search=${keyword}`;

    return api;
  };

  useEffect(() => {
    const prevObj = sessionGetItemObj();
    onmountHandler(stateObj, defaultObj, prevObj);

    return () => setLoaded(false);
  }, [itemType, keyword, itemType]);

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
              stateObj={stateObj}
              keyword={keyword}
              setKeyword={setKeyword}
              itemList={itemList}
              setPage={setPage}
            />
            <TabBar
              fetchItems={fetchItems}
              stateObj={stateObj}
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
