import { css } from "@emotion/css";

const stSearchInput = css`
  text-align: center;
  position: relative;
  margin-bottom: 2rem;

  .icon {
    position: absolute;
    top: 50%;
    transform: translate(0.8rem, -50%);
  }

  input {
    width: 100%;
    max-width: 21rem;

    padding: 1rem 1rem 1rem 2.7rem;
    border-radius: 0.25rem;

    border: 1px solid #e5e7eb;
    outline: none;

    transition: 0.15s;
  }

  input::placeholder {
    color: #aaa;
  }

  input:focus {
    border-color: #3b82f6;
  }
`;

const SearchInput = ({ inputChangeHandler, keyword }) => {
  return (
    <div className={stSearchInput}>
      <label htmlFor="search" className="icon">
        🔍
      </label>
      <input
        id="search"
        onChange={inputChangeHandler}
        type="search"
        placeholder="검색어를 입력하세요"
        defaultValue={keyword ? keyword : ""}
        autoComplete="off"
      />
    </div>
  );
};

export default SearchInput;
