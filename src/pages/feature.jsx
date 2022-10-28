import { css } from "@emotion/css";

import GradientBar from "../components/atoms/bar/gradient-bar";
import SectionTitle from "../components/organisms/section/section-title";
import SearchBar from "../components/organisms/bar/search-bar";
import TabBar from "../components/organisms/bar/tab-bar";
import ItemContainer from "../components/organisms/container/item-container";

const Feature = () => {
  return (
    <>
      <GradientBar />

      <div
        className={css`
          padding: 2.5rem;
          .border-bottom {
            margin-bottom: 0.5rem;
            border-bottom: 1px solid #e5e7eb;
          }
        `}
      >
        <SectionTitle />
        <SearchBar />
        <TabBar />
        <ItemContainer />
      </div>
    </>
  );
};

export default Feature;
