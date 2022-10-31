class ItemObj {
  page: number;
  keyword: string;
  itemType: string;
  scrollY?: number;

  constructor(
    page: number,
    keyword: string,
    itemType: string,
    scrollY: number
  ) {
    this.page = -1;
    this.keyword = "";
    this.itemType = "a";
    this.scrollY = 0;
  }
}

export default ItemObj;
