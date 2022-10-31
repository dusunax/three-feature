import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Posts from "../pages/posts";
import Post from "../pages/post";

const Router = () => {
  const [loaded, setLoaded] = useState(false);
  const [itemList, setItemList] = useState([]);
  const itemProps = { itemList, setItemList, loaded, setLoaded };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts itemProps={itemProps} />} />
        <Route path="/post" element={<Post itemProps={itemProps} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
