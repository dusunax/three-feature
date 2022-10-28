import { useState } from "react";

import Tab from "../../atoms/tab/tab";

const TabBar = () => {
  const [tabIdx, setTabIdx] = useState(0);

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
