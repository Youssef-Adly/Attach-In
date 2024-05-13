import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import {
  faBookmark,
  faEllipsis,
  faEnvelope,
  // faFaceSmile,
  faImage,
  faPenToSquare,
  // faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";

const AddPost = () => {
  return (
    <div className="card card-body rounded-5">
      <div className="d-flex mb-3">
        {/* Avatar */}
        <div className="avatar avatar-xs me-2">
          <Link to="">
            <img
              className="avatar-img rounded-circle"
              src="https://github.com/mdo.png"
              alt=""
            />
          </Link>
        </div>
        {/* Post input */}
        <form className="w-100">
          <textarea
            className="form-control pe-4 border-0"
            rows={2}
            data-autoresize
            placeholder="Share your thoughts..."
            defaultValue={""}
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
            Photo
          </Link>
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
        <li className="nav-item dropdown">
          <Link
            className="nav-link bg-light py-1 px-2 mb-0"
            to=""
            id="feedActionShare"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </Link>
          {/* Dropdown menu */}
          {/* added justify-content-end for lake of other btns */}
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
        </li>
      </ul>
      {/* Share feed toolbar END */}
    </div>
  );
};

export default AddPost;
