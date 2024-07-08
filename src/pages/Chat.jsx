import axios from "axios";
import React, { memo, useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingSuspese from "../Components/LoadingSuspense";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { toastError } from "../utils/ToastsFunctions";

const Chat = () => {
  const baseURL = "https://attachin.com/api/";
  const baseImgURL = "https://attachin.com/";
  // const [t] = useTranslation();
  const { id } = useParams();
  const msgInput = useRef();
  const bottomRef = useRef(null);
  let user = useSelector((state) => state.Auth.user);
  let [msgs, setMsgs] = useState(null);
  let [msgsTo, setmsgsTo] = useState(null);
  // console.log('msgsTo: ', msgsTo);
  let [sending, setsending] = useState(false);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom(); // Optionally, scroll to bottom on component mount
  }, []);

  useEffect(() => {
    axios
      .get(baseURL + "getMyConversationMessages?conversation_id=" + id, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setMsgs(res.data.data.reverse());
      })
      .catch((err) => {
        toastError("Network Error");
        console.log(err);
      });
    /////////////////
    axios
      .get(baseURL + "getAllMyConversation", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        let reciver = res.data.data.filter((m) => +m.id === +id)[0];
        let reciverObj =
          reciver.user1.id === user.id ? reciver.user2 : reciver.user1;
        setmsgsTo(reciverObj);
        scrollToBottom();
      })
      .catch((err) => {
        toastError("Network Error");
        console.log(err);
      });
  }, [user.token, user.id, id]);

  const sendMsg = async (e) => {
    let message = msgInput.current.value;

    if (message.trim().length > 0) {
      setsending(true);

      let formData = {
        conversation_id: id,
        // sender_id: user.id,
        receiver_id: msgsTo.id,
        message: message,
      };

      await axios
        .post(baseURL + "saveConversationMessage", formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setMsgs((old) => [...old, res.data.data]);
          if (msgs.length > 6) {
            window.scrollTo(0, document.body.scrollHeight);
          }
          msgInput.current.value = "";
          msgInput.current.rows = 1;
          setsending(false);
        })
        .catch((err) => {
          setsending(false);
          toastError("Network Error");
          console.log(err);
        });
    }
  };

  return (
    <>
      {/* Header Title */}
      {/* <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("Chat")}
      </h1> */}
      {/* Header Title */}
      <div className="d-flex align-items-center gap-4 text-light">
        <Link
          to={"/messages"}
          // onClick={(e) => {
          //   navigate(-1);
          //   navigate.reload();
          // }}
        >
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            fontSize={27}
            style={{
              color: "var(--text-main-color)",
              marginBottom: "7px",
            }}
          />
        </Link>
        <h2
          className="text-left d-flex align-items-center"
          style={{
            color: "var(--text-main-color)",
          }}
        >
          <Link to={"/profile/" + msgsTo?.id} className="nav-link">
            {msgsTo?.profile_photo ? (
              <img
                className="avatar-img me-2 rounded-circle"
                src={baseImgURL + msgsTo.profile_photo}
                style={{ width: "40px", height: "auto", aspectRatio: "1" }}
                alt="profile_photo"
              />
            ) : (
              <img
                className="avatar-img me-2 rounded-circle"
                src="/profile2.svg"
                style={{ width: "40px", height: "auto" }}
                alt="profile_photo"
              />
            )}
            {msgsTo && msgsTo.full_name}
          </Link>
        </h2>
      </div>

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
                    className="position-relative bg-primary rounded-start-pill rounded-top-pill px-3 py-2 align-self-end"
                    style={
                      {
                        // minWidth: "10vw",
                        // maxWidth: "70vw",
                        // marginRight: "35px",
                      }
                    }
                  >
                    <h6 className="d-inline">{m.message}</h6>
                    {/* {m.sender.profile_photo ? (
                      <img
                        className="avatar-img ms-2 rounded-circle position-absolute"
                        src={baseImgURL + m.sender.profile_photo}
                        style={{ width: "30px", height: "auto", right:"-40px" }}
                        // alt="profile_photo"
                      />
                    ) : (
                      <img
                        className="avatar-img ms-2 rounded-circle"
                        src="/profile2.svg"
                        style={{ width: "40px", height: "auto" }}
                        // alt=""
                      />
                    )} */}
                  </div>
                );
              } else {
                return (
                  <div
                    key={uuid()}
                    className="bg-success rounded-end-pill rounded-top-pill px-3 py-2 align-self-start"
                    style={
                      {
                        // minWidth: "10vw",
                        // maxWidth: "70vw",
                      }
                    }
                  >
                    {/* {m.sender.profile_photo ? (
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
                    )} */}
                    <h6 className="d-inline">{m.message}</h6>
                  </div>
                );
              }
            })
          ) : (
            <LoadingSuspese />
          )}

          {/*  */}
        </div>
        {/* Text Input */}
        <div className="col-10 position-sticky mx-auto start-0 chatBox">
          <textarea
            // data-autoresize
            className="form-control pe-5"
            ref={msgInput}
            rows={1}
            placeholder={"Write Your Message"}
            defaultValue={""}
            disabled={sending}
            onKeyUp={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                msgInput.current.value.trim().length > 0
              ) {
                sendMsg(e);
                msgInput.current.value = msgInput.current.value.trim();
              } else {
                msgInput.current.rows =
                  msgInput.current.value.split("\n").length;
              }
            }}
            style={{ resize: "none" }}
          />
          <button
            className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
            onClick={(e) => sendMsg(e)}
            disabled={sending}
            style={{
              cursor: sending ? "not-allowed" : "",
            }}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
      <div ref={bottomRef} style={{ height: 0 }} />
    </>
  );
};

export default memo(Chat);
