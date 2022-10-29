import SearchInput from "../../atoms/input/search-input";

const SearchBar = ({ fetchItems, itemType }) => {
  const searchItemList = (keyword) => {
    const args = { keyword, itemType };
    fetchItems(args);
  };

  const inputChangeHandler = (e) => {
    const inputText = e.target.value;
    searchItemList(inputText);
  };

  return (
    <>
      <SearchInput inputChangeHandler={inputChangeHandler} />
    </>
  );
};

export default SearchBar;
