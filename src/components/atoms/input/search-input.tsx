import { css } from "@emotion/css";

const searchInputStyle = css`
  text-align: center;
  position: relative;
  margin-bottom: 2rem;

  .icon {
    position: absolute;
    top: 50%;
    transform: translate(1rem, -50%);

    img {
      width: 15px;
      opacity: 0.5;
    }
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

const SearchInput = ({
  inputChangeHandler,
  keyword,
}: {
  inputChangeHandler: () => void;
  keyword: string;
}) => {
  return (
    <div className={searchInputStyle}>
      <label htmlFor="search" className="icon">
        <img srcSet="/icons/search.svg" alt="검색 아이콘" />
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
