import { useState } from "react";
import { sessionStoreItemObj } from "../../../utils/session-store-item-obj";

import Tab from "../../atoms/tab/tab";

const TabBar = ({ setItemType, itemType, setPage }) => {
  const charCodeGap = 97;
  const itemIndex = itemType.charCodeAt() - charCodeGap;
  const [tabIdx, setTabIdx] = useState(itemIndex);

  const tabs = [
    { name: "A Post", id: 0 },
    { name: "B Post", id: 1 },
  ];

  const onclickHandler = (e) => {
    const target = e.target;
    if (target.className === "btn-box") return;

    const idx = +target.closest("button").dataset.tab;
    if (idx !== undefined && idx !== tabIdx) {
      setPage(0);
      setTabIdx(idx);
      setItemType(String.fromCharCode(charCodeGap + idx));
      sessionStoreItemObj({ itemType: String.fromCharCode(97 + idx), page: 0 });
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
