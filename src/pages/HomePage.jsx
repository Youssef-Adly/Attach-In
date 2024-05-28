import React from "react";
// import HomeLayout from "../Components/HomeLayout";
import Post from "../Components/Post";
import AddPost from "../Components/AddPost";

const HomePage = () => {
  return (
    <>
      <div className="d-flex flex-column gap-3">
        {/* Add Post */}
        <AddPost />
        {/* ============== */}
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
};

export default HomePage;
