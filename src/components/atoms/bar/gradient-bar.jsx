import { css } from "@emotion/css";

const GradientBar = () => {
  return (
    <div
      className={css`
        height: 1rem;
        background: linear-gradient(to right, #3b82f6, #10b981);
      `}
    />
  );
};

export default GradientBar;
