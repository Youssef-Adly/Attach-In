import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSuspese from "../Components/LoadingSuspense";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

const MessagesPage = () => {
  const baseURL = "https://attachin.com/api/";
  const baseImgURL = "https://attachin.com/";
  const [t] = useTranslation();
  let user = useSelector((state) => state.Auth.user);
  let [msgs, setMsgs] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "getAllMyConversation", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setMsgs(res.data.data.filter((m) => m.last_message));
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
        {t("Messages")}
      </h1>
      <hr />
      {/* Messages*/}
      {msgs?.length > 0 ? (
        msgs.map((m, idx) => (
          <Link
            to={"/chat/" + m.last_message?.conversation_id}
            className="col-11 mx-auto rounded-2 nav-link"
            key={uuid()}
            style={{ color: "var(--text-main-color)" }}
          >
            <div className="d-flex align-items-center gap-3">
              {/* Avatar */}
              <div className="position-relative">
                {/* <Link to=""> */}
                {m.user2.profile_photo ? (
                  <img
                    className="avatar-img rounded-circle"
                    src={baseImgURL + m.user2.profile_photo}
                    style={{ width: "50px", height: "auto", aspectRatio: "1" }}
                    // alt="profile_photo"
                  />
                ) : (
                  <img
                    className="avatar-img rounded-circle"
                    src="/profile2.svg"
                    style={{ width: "50px", height: "auto", aspectRatio: "1" }}
                    // alt=""
                  />
                )}
                {/* </Link> */}
              </div>
              {/* Info */}
              <div className="">
                <div className="nav nav-divider">
                  <h5 className="card-title mb-0">{m.user2.full_name}</h5>
                  {/* <span className="nav-item small"> 2hr</span> */}
                </div>
                <p className="mb-0 small">{m.last_message?.message}</p>
              </div>
            </div>
            {/* <p className="p-3">notification</p> */}
            <hr className="col-12" />
          </Link>
        ))
      ) : (
        <LoadingSuspese />
      )}
    </>
  );
};

export default MessagesPage;
