import { css } from "@emotion/css";

const Tab = (props: { textContent: string; id: number; on: boolean }) => {
  const { textContent, id, on = false } = props;
  const tabStyle = css`
    all: unset;
    padding: 0.75rem;
    border-radius: 0.25rem;

    font-size: 14px;
    font-weight: 500;

    cursor: pointer;

    .on {
      color: #3b84f6;
    }
    :hover {
      background-color: #f3f4f6;
      color: #93c5fd;
    }
  `;

  return (
    <button data-tab={id} className={tabStyle}>
      <span className={on ? "on" : ""}>{textContent}</span>
    </button>
  );
};

export default Tab;
