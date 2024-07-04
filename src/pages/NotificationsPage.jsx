import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Notification from "../Components/Notification";
import AddFriendCard from "../Components/AddFriendCard";
import { useTranslation } from "react-i18next";
import LoadingSuspese from "../Components/LoadingSuspense";
import { showLoadingToast, toastError } from "../utils/ToastsFunctions";

const NotificationsPage = () => {
  const [t] = useTranslation();
  const baseURL = "https://attachin.com/api/";
  const user = useSelector((state) => state.Auth.user);
  const [friendRequests, setFriendRequests] = useState(null);
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    // let toastID = showLoadingToast("Submitting.....");
    //friendRequests
    axios
      .get(baseURL + "getFriendshipRequestsToMe", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setFriendRequests(res.data.data);
      })
      .catch((err) => {
        console.log("error getting friends requests " + err);
        toastError("Network Error");
      });

    //notifications
    axios
      .post(
        baseURL + "getMyUserNotifications",
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        // setNotifications([]);
        setNotifications(res.data.data.filter((e) => e.from_user !== null));
      })
      .catch((err) => {
        console.log(err);
        toastError("Network Error");
      });
  }, []);

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
            {notifications && friendRequests ? (
              <>
                {notifications.length > 0 ? (
                  notifications
                    .reverse()
                    // .slice(0, 4)
                    .map((n, idx) => <Notification {...n} key={idx} />)
                ) : (
                  <p
                    className="fs-3 text-center"
                    style={{
                      color: "var(--text-main-color)",
                    }}
                  >
                    No New Notifications
                  </p>
                )}
                <hr className="col-6 mx-auto" />
                {/* Friend Requests */}
                {friendRequests ? (
                  <div className="d-flex flex-wrap row-cols-2 justify-content-center gap-4 mb-5">
                    {friendRequests.length > 0 ? (
                      friendRequests.map((req, idx) => (
                        <AddFriendCard {...req.user} reqID={req.id} key={idx} />
                      ))
                    ) : (
                      <p
                        className="fs-3 text-center"
                        style={{
                          color: "var(--text-main-color)",
                        }}
                      >
                        No New Friend Requests
                      </p>
                    )}
                  </div>
                ) : (
                  <LoadingSuspese />
                )}
              </>
            ) : (
              <LoadingSuspese />
            )}
          </div>

          {/* Notifications*/}
          <div
            className="tab-pane fade mb-5"
            id="pills-Posts"
            role="tabpanel"
            aria-labelledby="pills-Posts-tab"
            tabIndex={0}
          >
            {/* Notifications */}
            {notifications ? (
              <>
                {notifications.length > 0 ? (
                  notifications.map((n, idx) => (
                    <Notification {...n} key={idx} />
                  ))
                ) : (
                  <p
                    className="fs-3 text-center"
                    style={{
                      color: "var(--text-main-color)",
                    }}
                  >
                    No New Notifications
                  </p>
                )}
              </>
            ) : (
              <LoadingSuspese />
            )}
          </div>

          {/* Friends Requests */}
          <div
            className="tab-pane fade mb-5"
            id="pills-Requests"
            role="tabpanel"
            aria-labelledby="pills-Requests-tab"
            tabIndex={0}
          >
            {friendRequests ? (
              <div className="d-flex flex-wrap row-cols-2 justify-content-center gap-4 mb-5">
                {friendRequests.length > 0 ? (
                  friendRequests.map((req, idx) => (
                    <AddFriendCard {...req.user} reqID={req.id} key={idx} />
                  ))
                ) : (
                  <p
                    className="fs-3 text-center"
                    style={{
                      color: "var(--text-main-color)",
                    }}
                  >
                    No New Friend Requests
                  </p>
                )}
              </div>
            ) : (
              <LoadingSuspese />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
