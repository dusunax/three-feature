import { useState } from "react";
import { sessionStoreItemObj } from "../../../utils/session-store-item-obj";

import Tab from "../../atoms/tab/tab";
import ItemObj from "../../../models/item-obj";

const TabBar = ({
  fetchItems,
  stateObj,
  setItemType,
  itemType,
  setPage,
}: {
  fetchItems: (obj: ItemObj) => void;
  stateObj: ItemObj;
  setItemType: (arg0: string) => void;
  itemType: string;
  setPage: (arg0: number) => void;
}) => {
  const charCodeGap = 97;
  const itemIndex = itemType.charCodeAt(0) - charCodeGap;
  const [tabIdx, setTabIdx] = useState(itemIndex);

  const tabs = [
    { name: "A Post", id: 0 },
    { name: "B Post", id: 1 },
  ];

  const onclickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement;
    if (target?.className === "btn-box") return;

    const idx = +target.closest("button")!.dataset!.tab!;
    if (idx !== undefined && idx !== tabIdx) {
      setPage(0);
      setTabIdx(idx);
      setItemType(String.fromCharCode(charCodeGap + idx));
      sessionStoreItemObj({ itemType: String.fromCharCode(97 + idx), page: 0 });

      fetchItems(stateObj);
    }
  };

  return (
    <div className="btn-box border-bottom" onClick={onclickHandler}>
      {tabs.map((tab) => {
        const isTabOn = tabIdx === tab.id;
        return (
          <Tab key={tab.name} textContent={tab.name} id={tab.id} on={isTabOn} />
        );
      })}
    </div>
  );
};

export default TabBar;
