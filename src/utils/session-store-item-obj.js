const sessionStoreItemObj = (itemObj) => {
  for (const item in itemObj) {
    sessionStorage.setItem(item, itemObj[item]);
  }
};

const sessionGetItemObj = () => {
  const { itemType, page, keyword } = sessionStorage;
  return { itemType, page: +page, keyword };
};

export { sessionStoreItemObj, sessionGetItemObj };
