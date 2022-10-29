import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";

import Item from "../../molecules/item/item";

const itemContainerStyle = css`
  padding: 1.25rem;
  border-radius: 0.375rem;

  border: 1px solid #eee;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

const ItemContainer = ({ fetchItems, itemList, itemType }) => {
  const navigate = useNavigate();
  const itemContainerRef = useRef();

  const itemContainerHandler = (item) => {
    navigate("/post", { state: { item } });
  };

  // 함수 분리
  // 1. 높이값을 가져오기
  // 2. 높이값 비교하기
  // 3. api 요청 => state에 data반영

  const handleScroll = () => {
    const { offsetTop, offsetHeight } = itemContainerRef.current;
    const o_bottom = offsetTop + offsetHeight;
    const { scrollY, innerHeight } = window;
    const w_bottom = scrollY + innerHeight;
    const threshold = 200;

    if (w_bottom > o_bottom - threshold) {
      console.log("fetching!");
    }
  };

  const getItemList = () => {
    const args = { itemType };
    fetchItems(args);
  };

  useEffect(() => {
    getItemList();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [itemType]);

  return (
    <div ref={itemContainerRef} className={itemContainerStyle}>
      {itemList.map((item) => {
        return (
          <Item
            key={item.id}
            itemProps={{ ...item }}
            itemContainerHandler={itemContainerHandler}
          />
        );
      })}
    </div>
  );
};

export default ItemContainer;
