import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingSuspese from "../Components/LoadingSuspense";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  const baseURL = "https://attachin.com/api/";
  const baseImgURL = "https://attachin.com/";
  const [t] = useTranslation();
  const { id } = useParams();
  let msgInput = useRef();
  let user = useSelector((state) => state.Auth.user);
  console.log("user: ", user.id);
  let [msgs, setMsgs] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "getMyConversationMessages?conversation_id=" + id, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setMsgs(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.token, id]);

  const sendMsg = (e) => {
    if (msgInput.current.value.length > 0) {
      console.log(msgInput.current.value);
      console.log(e);
    }
  };

  return (
    <>
      {/* Header Title */}
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("Chat")}
      </h1>
      <hr />
      <div
        className="d-flex flex-column gap-3 position-relative justify-content-between"
        style={{
          minHeight: "65vh",
        }}
      >
        <div
          className="d-flex flex-column gap-3"
          style={{
            minHeight: "65vh",
          }}
        >
          {msgs ? (
            msgs.map((m, idx) => {
              if (m.sender_id === user.id) {
                return (
                  <div
                    key={uuid()}
                    className="bg-primary rounded-start-pill rounded-top-pill p-3 align-self-end"
                    style={{
                      minWidth: "10vw",
                      maxWidth: "70vw",
                    }}
                  >
                    <h6 className="d-inline">{m.message}</h6>
                    {m.sender.profile_photo ? (
                      <img
                        className="avatar-img ms-2 rounded-circle"
                        src={baseImgURL + m.sender.profile_photo}
                        style={{ width: "40px", height: "auto" }}
                        // alt="profile_photo"
                      />
                    ) : (
                      <img
                        className="avatar-img ms-2 rounded-circle"
                        src="/profile2.svg"
                        style={{ width: "40px", height: "auto" }}
                        // alt=""
                      />
                    )}
                  </div>
                );
              } else {
                return (
                  <div
                    key={uuid()}
                    className="bg-success rounded-end-pill rounded-top-pill p-3 align-self-start"
                    style={{
                      minWidth: "10vw",
                      maxWidth: "70vw",
                    }}
                  >
                    {m.sender.profile_photo ? (
                      <img
                        className="avatar-img me-2 rounded-circle"
                        src={baseImgURL + m.sender.profile_photo}
                        style={{ width: "40px", height: "auto" }}
                        // alt="profile_photo"
                      />
                    ) : (
                      <img
                        className="avatar-img me-2 rounded-circle"
                        src="/profile2.svg"
                        style={{ width: "40px", height: "auto" }}
                        // alt=""
                      />
                    )}
                    <h6 className="d-inline">{m.message}</h6>
                  </div>
                );
              }
            })
          ) : (
            <LoadingSuspese />
          )}
        </div>
        {/* Text Input */}
        <div className="col-12 position-relative">
          <textarea
            // data-autoresize
            className="form-control pe-5"
            ref={msgInput}
            rows={1}
            placeholder={"Write Your Message"}
            defaultValue={""}
            // disabled={turnOffComment}
            onKeyUp={(e) => {
              // console.log(commentBox.current.value.split("\n").length);
              // commentBox.current.rows =
              //   commentBox.current.value.split("\n").length;
              if (e.key === "Enter" && !e.shiftKey) {
                // addComment(e);
              }
            }}
            style={{ resize: "none" }}
          />
          <button
            className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
            onClick={(e) => sendMsg(e)}
            // disabled={turnOffComment}
            // style={{
            //   cursor: turnOffComment ? "not-allowed" : "",
            // }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
