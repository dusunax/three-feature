import { css } from "@emotion/css";

import TitleOne from "../../atoms/title/title-h1";
import TitleThree from "../../atoms/title/title-h3";

const SectionTitle = () => {
  return (
    <div
      className={css`
        margin: 35px 0;

        text-align: center;
      `}
    >
      <TitleOne />
      <TitleThree />
    </div>
  );
};

export default SectionTitle;
