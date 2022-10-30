import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";

import Item from "../../molecules/item/item";
import { throttle } from "../../../utils/throttle-func";
import { debounce } from "../../../utils/debounce-func";
import { sessionStoreItemObj } from "../../../utils/session-store-item-obj";

const itemContainerStyle = css`
  padding: 1.25rem;
  border-radius: 0.375rem;

  border: 1px solid #eee;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

const ItemContainer = ({
  fetchItems,
  itemList,
  itemProps,
  setItemProps,
  page,
  setPage,
  setScrollY,
}) => {
  const { itemType } = itemProps;
  const navigate = useNavigate();
  const itemContainerRef = useRef();

  const timeout = useRef(null);
  const timerOpt = { delay: 500, timeout };

  const itemContainerHandler = (item) => {
    navigate("/post", { state: { item } });
  };

  // 함수 분리
  // 1. 높이값을 가져오기
  // 2. 높이값 비교하기
  // 3. api 요청 => state에 data반영

  const handleScroll = debounce(() => {
    console.log("스크롤 핸들러");
    const { offsetTop, offsetHeight } = itemContainerRef.current;
    const o_bottom = offsetTop + offsetHeight;
    const { scrollY, innerHeight } = window;
    const w_bottom = scrollY + innerHeight;
    const threshold = 300;
    sessionStoreItemObj({ scrollY });

    if (w_bottom > o_bottom - threshold) {
      console.log("fetching!");
      const newPage = { itemType, page: page + 1 };

      getItemList(newPage);
      setPage((prev) => prev + 1);
      sessionStoreItemObj(newPage);
    }
  }, timerOpt);

  const getItemList = (newPage) => {
    fetchItems(newPage);
  };

  useEffect(() => {
    getItemList({ itemType, page });

    window.addEventListener("scroll", handleScroll);
    return () => {
      if (timeout.current) clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [itemType]);

  return (
    <div ref={itemContainerRef} className={itemContainerStyle}>
      {itemList.map((item) => {
        return (
          <Item
            key={Math.random().toFixed(5) + item.id}
            itemProps={{ ...item }}
            itemContainerHandler={itemContainerHandler}
          />
        );
      })}
    </div>
  );
};

export default ItemContainer;
