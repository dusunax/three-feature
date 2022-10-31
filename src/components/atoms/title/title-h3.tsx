import { css } from "@emotion/css";

const TitleThree = () => {
  return (
    <h3
      className={css`
        font-size: 1.5rem;
        line-height: 1;
        font-weight: 400;

        color: #6b7280;
        margin-top: 1rem;
      `}
    >
      페이지 게시글에 대한 설명입니다.
    </h3>
  );
};

export default TitleThree;
