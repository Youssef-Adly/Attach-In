import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  showLoadingToast,
  updateError,
  updateSuccess,
} from "../utils/ToastsFunctions";

const AddPost = ({ setPosts }) => {
  const baseURL = "https://attachin.com/";
  const [t] = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.user);
  const postBox = useRef();

  const addPostWithoutImage = async (e) => {
    e.preventDefault();
    const postValue = postBox.current.value;
    if (postValue.trim().length > 0) {
      let toastID = showLoadingToast("Posting.....");
      await axios
        .post(
          "https://attachin.com/api/addUserPost",
          { title: postValue },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data.data);
          postBox.current.value = "";
          postBox.current.rows = 2;
          setPosts((old) => [
            { user, comments: [], lovers: [], ...res.data.data },
            ...old,
          ]);
          updateSuccess(toastID, "Posted Successfully");
        })
        .catch((err) => {
          if (err.response.data.errors[0] === "Unauthenticated") {
            console.log(err.response.data.errors[0]);
            updateError(toastID, err.response?.data?.errors[0]);
            navigate("/login");
          } else {
            updateError(toastID, "Network Error");
            console.log(err);
          }
        });
    } /*  else {
      postBox.current.rows = postBox.current.value.split("\n").length;
      return;
    } */
  };

  return (
    <div className="card card-body rounded-5">
      <div className="d-flex mb-3">
        {/* Avatar */}
        <div className="avatar avatar-xs me-2">
          <Link to="">
            <img
              className="avatar-img rounded-circle"
              src={
                user.profile_photo
                  ? baseURL + user.profile_photo
                  : "/profile.png"
              }
              // src="https://github.com/mdo.png"
              alt={user.full_name}
              title={user.full_name}
            />
          </Link>
        </div>
        {/* Post input */}
        <form className="w-100">
          <textarea
            className="form-control pe-4 border-0 dir"
            rows={2}
            data-autoresize
            placeholder={t("Share Your thoughts") + "..."}
            defaultValue={""}
            ref={postBox}
            onKeyUp={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                postBox.current.value.trim().length > 0
              ) {
                addPostWithoutImage(e);
              } else {
                postBox.current.rows =
                  postBox.current.value.split("\n").length + 1;
              }
            }}
          />
        </form>
      </div>
      {/* Share feed toolbar START */}
      <ul className="nav nav-pills nav-stack small justify-content-end fw-normal">
        <li className="nav-item">
          <Link
            className="nav-link bg-light py-1 px-2 mb-0"
            to=""
            data-bs-toggle="modal"
            data-bs-target="#feedActionPhoto"
          >
            <FontAwesomeIcon icon={faImage} className="text-success pe-2" />
            {t("Photo")}
          </Link>
        </li>
        <li className="nav-item list-unstyled mb-auto ms-3">
          <button
            onClick={(e) => addPostWithoutImage(e)}
            type="button"
            className="btn btn-outline-success"
            style={{
              // background: "var(--pink-color)",
              color: "var(--text-main-color)",
              paddingInline: "20px",
              marginRight: "5px",
            }}
          >
            {t("Post")}
          </button>
        </li>
        {/* <li className="nav-item">
          <Link
            className="nav-link bg-light py-1 px-2 mb-0"
            to=""
            data-bs-toggle="modal"
            data-bs-target="#feedActionVideo"
          >
            <FontAwesomeIcon icon={faVideoCamera} className="text-info pe-2" />
            Video
          </Link>
        </li> */}
        {/* <li className="nav-item">
                <Link
                  to=""
                  className="nav-link bg-light py-1 px-2 mb-0"
                  data-bs-toggle="modal"
                  data-bs-target="#modalCreateEvents"
                >
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-danger pe-2"
                  />
                  Event
                </Link>
              </li> */}
        {/* <li className="nav-item">
          <Link
            className="nav-link bg-light py-1 px-2 mb-0"
            to=""
            data-bs-toggle="modal"
            data-bs-target="#modalCreateFeed"
          >
            <i className="bi bi-emoji-smile-fill text-warning pe-2" />
            <FontAwesomeIcon icon={faFaceSmile} className="text-warning pe-2" />
            Feeling /Activity
          </Link>
        </li> */}
        {/* removed ms-lg-auto for lake of other btns */}
        {/* <li className="nav-item dropdown">
          <Link
            className="nav-link bg-light py-1 px-2 mb-0"
            to=""
            id="feedActionShare"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="feedActionShare"
          >
            <li>
              <Link className="dropdown-item" to="">
                <FontAwesomeIcon icon={faEnvelope} className="pe-2" />
                Create a poll
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="">
                <FontAwesomeIcon icon={faBookmark} className="pe-2" />
                Ask a question
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="">
                <FontAwesomeIcon icon={faPenToSquare} className="pe-2" />
                Help
              </Link>
            </li>
          </ul>
        </li> */}
      </ul>
      {/* Share feed toolbar END */}
    </div>
  );
};

export default memo(AddPost);
