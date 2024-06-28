import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FriendCard from "../Components/FriendCard";
import { useTranslation } from "react-i18next";
import LoadingSuspese from "../Components/LoadingSuspense";

const NetworkPage = () => {
  const [t] = useTranslation();
  const baseURL = "https://attachin.com/api/";
  const user = useSelector((state) => state.Auth.user);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "getAllMyFriends", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setFriends(res.data.data);
        // console.log("res.data.data: ", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.token]);

  return (
    <>
      {/* Header Title */}
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("Friends")}
      </h1>
      <hr />
      {friends ? (
        <div className="d-flex flex-wrap row-cols-2 justify-content-center gap-4 mb-5">
          {friends.length > 0 ? (
            friends.map((f, idx) => <FriendCard {...f} key={idx} />)
          ) : (
            <p
              className="fs-3 text-center"
              style={{
                color: "var(--text-main-color)",
              }}
            >
              No Friends Yet
            </p>
          )}
        </div>
      ) : (
        <LoadingSuspese />
      )}
    </>
  );
};

export default NetworkPage;
