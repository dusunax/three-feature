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

const Item = (props) => {
  const { content, createdAt, id, title, type } = props.itemProps;

  return (
    <div className={itemStyle}>
      <h4 className="title">
        <span className="num">{id}.</span> {title}
      </h4>
      <p>{content}</p>
    </div>
  );
};

export default Item;
