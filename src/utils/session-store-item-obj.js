const sessionStoreItemObj = (itemObj) => {
  for (const item in itemObj) {
    sessionStorage.setItem(item, itemObj[item]);
  }
};

const sessionGetItemObj = () => {
  const { itemType, page, keyword, scrollY } = sessionStorage;
  return { itemType, page: +page, keyword, scrollY: +scrollY };
};

export { sessionStoreItemObj, sessionGetItemObj };
