import React from "react";
import Post from "../Components/Post";

const UniversityNews = () => {
  return (
    <>
      <div className="d-flex flex-column gap-3">
        {/* Add Post */}
        {/* <AddPost /> */}
        {/* ============== */}
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
};

export default UniversityNews;
