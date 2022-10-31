import { useState, SetStateAction, Dispatch } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Posts from "../pages/posts";
import Post from "../pages/post";

import ItemObj from "../models/item-obj";

const defaultObj: ItemObj = {
  page: -1,
  keyword: "",
  itemType: "a",
  scrollY: 0,
};

type Item = { content: string; id: number; title: string };

const Router = () => {
  const [loaded, setLoaded] = useState<true | false>(false);
  const [itemList, setItemList] = useState<Item[]>([]);
  const itemProps: {
    itemList: [] | Item[];
    setItemList: Dispatch<SetStateAction<Item[]>>;
    loaded: boolean;
    setLoaded: Dispatch<SetStateAction<boolean>>;
  } = {
    itemList,
    setItemList,
    loaded,
    setLoaded,
  };

  // 세션 스토리지에 저장할 값
  const [page, setPage] = useState(defaultObj.page);
  const [keyword, setKeyword] = useState(defaultObj.keyword);
  const [itemType, setItemType] = useState(defaultObj.itemType);
  const [scrollY, setScrollY] = useState(defaultObj.scrollY);
  const renderProps: {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    keyword: string;
    setKeyword: Dispatch<SetStateAction<string>>;
    itemType: string;
    setItemType: Dispatch<SetStateAction<string>>;
    scrollY: number | undefined;
    setScrollY: Dispatch<SetStateAction<number | undefined>>;
  } = {
    page,
    setPage,
    keyword,
    setKeyword,
    itemType,
    setItemType,
    scrollY,
    setScrollY,
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Posts itemProps={itemProps} renderProps={renderProps} />}
        />
        <Route path="/post" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
