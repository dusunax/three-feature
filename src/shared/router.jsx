import { BrowserRouter, Route, Routes } from "react-router-dom";

import Posts from "../pages/posts";
import Post from "../pages/post";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
