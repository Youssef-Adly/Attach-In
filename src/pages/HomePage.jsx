import React from "react";
import HomeLayout from "../Components/HomeLayout";
import Post from "../Components/Post";

const HomePage = () => {
  return (
    <HomeLayout>
      <Post />
      <Post />
      <Post />
    </HomeLayout>
  );
};

export default HomePage;
