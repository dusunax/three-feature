import { useNavigate, useLocation } from "react-router-dom";
import { css } from "@emotion/css";

import Item from "../components/molecules/item/item";

const Post = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state.item;

  return (
    <div
      className={css`
        margin: 3rem 0;
        padding: 0 2.5rem;
      `}
    >
      <div
        className={css`
          padding: 1.25rem;
          border-radius: 0.375rem;

          border: 1px solid #eee;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

          text-align: center;

          h4 {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .num {
            display: none;
          }
        `}
      >
        <Item itemProps={item} />
      </div>
      <button
        className={css`
          border: none;
          border-radius: 0.3rem;

          margin-top: 1rem;
          padding: 1rem 1.5rem;

          color: #fff;
          background-color: #3b82f6;

          font-size: 12px;

          cursor: pointer;
          :hover {
            opacity: 0.9;
          }
        `}
        onClick={() => navigate(-1)}
      >
        뒤로 가기
      </button>
    </div>
  );
};

export default Post;
