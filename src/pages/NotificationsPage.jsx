import React from "react";
// import HomeLayout from "../Components/HomeLayout";
import Notification from "../Components/Notification";
import AddFriendCard from "../Components/AddFriendCard";
import { useTranslation } from "react-i18next";

const NotificationsPage = () => {
  const [t] = useTranslation();

  const notificationData = {
    avatar: "https://github.com/mdo.png",
    name: "Lori Ferguson",
    job: "Web Developer at Webestica",
    notification:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia assumenda laborum vel quidem.",
  };

  return (
    <>
      <div className="notifications">
        <ul
          className="nav nav-pills gap-sm-3 my-3 dir"
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
              {t("All")}
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
              {t("My Posts")}
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
              {t("Friend Requests")}
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
            {/* Friend Requests */}
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
    </>
  );
};

export default NotificationsPage;
