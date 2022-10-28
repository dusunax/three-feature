import { css } from "@emotion/css";

import Item from "../../molecules/item/item";

const itemContainerStyle = css`
  padding: 1.25rem;
  border-radius: 0.375rem;

  border: 1px solid #eee;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

const ItemContainer = () => {
  return (
    <div className={itemContainerStyle}>
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default ItemContainer;
