import { useState } from "react";
import { css } from "@emotion/css";

import GradientBar from "../components/atoms/bar/gradient-bar";
import SectionTitle from "../components/organisms/section/section-title";
import SearchBar from "../components/organisms/bar/search-bar";
import TabBar from "../components/organisms/bar/tab-bar";
import ItemContainer from "../components/organisms/container/item-container";

const Feature = () => {
  const [itemType, setItemType] = useState("a");
  const [itemList, setItemList] = useState([]);
  const [page, setPage] = useState(0);

  const fetchItems = async (args) => {
    const { itemType, keyword } = args;
    const API_URL = process.env.REACT_APP_API;

    let api = `${API_URL}/${itemType}-posts?page=${page}`;
    if (keyword) api += `&search=${keyword}`;

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    let resList = await (await fetch(api, options)).json();

    if (resList) {
      setItemList(resList);
      setPage((prev) => prev++);
    }
  };

  return (
    <>
      <GradientBar />

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
        <SearchBar itemType={itemType} fetchItems={fetchItems} />
        <TabBar setItemType={setItemType} />
        <ItemContainer
          fetchItems={fetchItems}
          itemList={itemList}
          itemType={itemType}
        />
      </div>
    </>
  );
};

export default Feature;
