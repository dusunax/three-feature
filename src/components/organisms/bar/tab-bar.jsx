import { useState } from "react";
import { sessionStoreItemObj } from "../../../utils/session-store-item-obj";

import Tab from "../../atoms/tab/tab";

const TabBar = ({ setItemProps, itemType, setPage }) => {
  const itemIndex = itemType.charCodeAt() - 97;
  const [tabIdx, setTabIdx] = useState(itemIndex);

  const tabs = [
    { name: "A Post", id: 0 },
    { name: "B Post", id: 1 },
  ];

  const onClickHandler = (e) => {
    const target = e.target;
    if (target.className === "btn-box") return;

    const idx = +target.closest("button").dataset.tab;
    if (idx !== undefined && idx !== tabIdx) {
      setTabIdx(idx);
      setItemProps((prev) => ({
        ...prev,
        itemType: String.fromCharCode(97 + idx),
      }));
      setPage(0);
      sessionStoreItemObj({ itemType: String.fromCharCode(97 + idx), page: 0 });
    }
  };

  return (
    <div className="btn-box border-bottom" onClick={onClickHandler}>
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
