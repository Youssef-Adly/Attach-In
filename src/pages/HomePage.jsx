import React from "react";
import HomeLayout from "../Components/HomeLayout";
import Post from "../Components/Post";
import AddPost from "../Components/AddPost";

const HomePage = () => {
  return (
    <HomeLayout>
      {/* ========================== */}
      {/* Add Post */}
      <AddPost />
      <Post />
      <Post />
      <Post />
    </HomeLayout>
  );
};

export default HomePage;
