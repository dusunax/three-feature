import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";

import Item from "../../molecules/item/item";
import { debounce } from "../../../utils/debounce-func";
import { sessionStoreItemObj } from "../../../utils/session-store-item-obj";

import ItemObj from "../../../models/item-obj";

const itemContainerStyle = css`
  padding: 1.25rem;
  border-radius: 0.375rem;

  border: 1px solid #eee;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

const ItemContainer = ({
  fetchItems,
  itemList,
  page,
  setPage,
  itemType,
  itemEnd,
  keyword,
}: {
  fetchItems: (obj: ItemObj) => void;
  itemList: { content: string; id: number; title: string }[];
  page: number;
  setPage: (arg0: number) => void;
  itemType: string;
  itemEnd: boolean;
  keyword: string;
}) => {
  const navigate = useNavigate();
  const itemContainerRef = useRef(null);

  const timeout = useRef<(id: string | number | undefined) => void>(null);
  const timerOpt = { delay: 150, timeout };

  const itemContainerHandler = (item: {}) => {
    navigate("/post", { state: { item } });
  };

  // 함수 분리
  // 1. 높이값을 가져오기
  // 2. 높이값 비교하기
  // 3. api 요청 => state에 data반영

  const onscrollHandler = debounce(() => {
    console.log("스크롤 핸들러");
    if (itemContainerRef.current) {
      const { offsetTop, offsetHeight } = itemContainerRef.current;
      const o_bottom = offsetTop + offsetHeight;
      const { scrollY, innerHeight } = window;
      const w_bottom = scrollY + innerHeight;
      const threshold = 300;
      sessionStoreItemObj({ scrollY });

      // if (w_bottom > o_bottom - threshold && !itemEnd) {
      if (w_bottom > o_bottom - threshold) {
        console.log("fetching!");

        setPage(page + 1);
        sessionStoreItemObj({ page: page + 1 });
      }
    }
  }, timerOpt);

  const getItemList = (newPage: ItemObj) => {
    fetchItems(newPage);
  };

  useEffect(() => {
    getItemList({ itemType, page, keyword });

    window.addEventListener("scroll", onscrollHandler);
    return () => {
      window.removeEventListener("scroll", onscrollHandler);
    };
  }, [itemType, page, keyword]);

  return (
    <div ref={itemContainerRef} className={itemContainerStyle}>
      {itemList.map((item) => {
        return (
          <Item
            key={Math.random().toFixed(5) + item.id}
            itemProps={{ ...item }}
            itemContainerHandler={itemContainerHandler}
            clip={true}
          />
        );
      })}
    </div>
  );
};

export default ItemContainer;
