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
`;

const clipStyle = css`
  height: 3.8rem;

  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Item = ({ itemContainerHandler, itemProps, clip = false }) => {
  const { content, createdAt, id, title, type } = itemProps;

  return (
    <div className={itemStyle} onClick={() => itemContainerHandler(itemProps)}>
      <h4>
        <strong className="num">{id}.</strong>
        <span className="title">{title}</span>
      </h4>
      <p className={clip ? clipStyle : ""}>{content}</p>
    </div>
  );
};

export default Item;
