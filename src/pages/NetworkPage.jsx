import React from "react";
import FriendCard from "../Components/FriendCard";
// import HomeLayout from "../Components/HomeLayout";

const NetworkPage = () => {
  return (
    <>
      <div className="d-flex flex-wrap row-cols-2 justify-content-center gap-4 mb-5">
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
      </div>
    </>
  );
};

export default NetworkPage;
