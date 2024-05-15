import React from "react";
import HomeLayout from "../Components/HomeLayout";
// import { Link } from "react-router-dom";
import Notification from "../Components/Notification";
import AddFriendCard from "../Components/AddFriendCard";

const NotificationsPage = () => {
  const notificationData = {
    avatar: "https://github.com/mdo.png",
    name: "Lori Ferguson",
    job: "Web Developer at Webestica",
    notification:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia assumenda laborum vel quidem.",
  };
  return (
    <HomeLayout>
      <div className="notifications">
        <ul
          className="nav nav-pills gap-sm-3 my-3"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-4 px-sm-4 active"
              id="pills-All-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-All"
              type="button"
              role="tab"
              aria-controls="pills-All"
              aria-selected="true"
            >
              All
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-4"
              id="pills-Posts-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-Posts"
              type="button"
              role="tab"
              aria-controls="pills-Posts"
              aria-selected="false"
            >
              My Posts
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-4"
              id="pills-Requests-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-Requests"
              type="button"
              role="tab"
              aria-controls="pills-Requests"
              aria-selected="false"
            >
              Friend Requests
            </button>
          </li>
        </ul>
        <hr />

        {/* Content */}
        <div className="tab-content mb-5" id="pills-tabContent">
          {/* All */}
          <div
            className="tab-pane fade show active mb-5"
            id="pills-All"
            role="tabpanel"
            aria-labelledby="pills-All-tab"
            tabIndex={0}
          >
            {/* All notifications */}
            <Notification {...notificationData} />
            <Notification {...notificationData} />
            <Notification {...notificationData} />
            {/* F Requests */}
            <div className="d-flex flex-wrap row-cols-2 justify-content-center gap-4 mb-5">
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
            </div>
          </div>

          {/* My Posts */}
          <div
            className="tab-pane fade mb-5"
            id="pills-Posts"
            role="tabpanel"
            aria-labelledby="pills-Posts-tab"
            tabIndex={0}
          >
            {/* notifications */}
            <Notification {...notificationData} />
            <Notification {...notificationData} />
            <Notification {...notificationData} />
          </div>

          {/* Friends Requests */}
          <div
            className="tab-pane fade mb-5"
            id="pills-Requests"
            role="tabpanel"
            aria-labelledby="pills-Requests-tab"
            tabIndex={0}
          >
            <div className="d-flex flex-wrap row-cols-2 justify-content-around gap-4 mb-5">
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
              <AddFriendCard />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default NotificationsPage;
