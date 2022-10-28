import { css } from "@emotion/css";

const itemStyle = css`
  padding: 1.25rem;
  transition: 0.15s;

  :hover {
    background-color: #f3f4f6;
  }

  * {
    margin: 0;
  }

  .num {
    color: #3b82f6;
  }

  .title {
    font-weight: 500;
  }

  p {
    height: 3.8rem;

    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const Item = () => {
  return (
    <div className={itemStyle}>
      <h4 className="title">
        <span className="num">0.</span> title
      </h4>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima quidem,
        aspernatur suscipit eaque, laboriosam nisi itaque totam quibusdam ipsum
        similique temporibus eos saepe! Distinctio molestias necessitatibus
      </p>
    </div>
  );
};

export default Item;
