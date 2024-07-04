import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  showLoadingToast,
  updateError,
  updateSuccess,
} from "../utils/ToastsFunctions";

const AddFriendCard = ({
  reqID,
  id,
  full_name,
  bio,
  profile_photo,
  profile_cover,
  user_type,
}) => {
  const baseURL = "https://attachin.com/api/";
  const baseImgURL = "https://attachin.com/";
  const user = useSelector((state) => state.Auth.user);

  const aproveRequest = () => {
    let toastID = showLoadingToast("Aproving Request.....");
    axios
      .post(
        baseURL + "responseOnFriendshipRequest",
        { id: reqID, response: "approve" },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        updateSuccess(toastID, "Added Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      })
      .catch((err) => {
        updateError(toastID, "Network Error");
        console.log(err);
      });
  };

  const rejectRequest = () => {
    let toastID = showLoadingToast("Rejecting Request.....");
    axios
      .post(
        baseURL + "responseOnFriendshipRequest",
        { id: reqID, response: "reject" },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        updateSuccess(toastID, "Added Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      })
      .catch((err) => {
        console.log(err);
        updateError(toastID, "Network Error");
      });
  };

  return (
    <Link
      to={"/profile/" + id}
      className="nav-link bg-dark-subtle position-relative"
      style={{ width: "300px", height: "250px", borderRadius: "80px" }}
    >
      <img
        src="deny.svg"
        alt="deny"
        onClick={rejectRequest}
        className="position-absolute hoverTwo"
        style={{
          left: "20px",
          top: "25%",
          zIndex: "2",
          cursor: "pointer",
        }}
      />
      <img
        src="accept.svg"
        alt="accept"
        onClick={aproveRequest}
        className="position-absolute hoverTwo"
        style={{
          right: "20px",
          top: "25%",
          zIndex: "2",
          cursor: "pointer",
        }}
      />

      <div
        className="bg-secondary position-relative "
        style={{
          height: "30%",
          borderRadius: "80px 80px 0 0",
          background: profile_cover
            ? `url("${baseImgURL + profile_cover}") right top / cover no-repeat`
            : `url("/banner.jpg") right top / cover no-repeat`,
        }}
      >
        <div
          className="col-4 position-absolute start-50 translate-middle"
          style={{
            top: "80px",
          }}
        >
          <div className="h-100 d-block">
            {profile_photo ? (
              <img
                className="avatar-img rounded-circle"
                src={baseImgURL + profile_photo}
                alt="profile_photo"
                style={{ height: "100px" }}
              />
            ) : (
              <img
                className="avatar-img rounded-circle"
                src="/profile.png"
                alt="profile_photo"
                style={{ height: "100px" }}
              />
            )}
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="p-5 mt-4" style={{ color: "var(--text-main-color)" }}>
        <h4 className="card-title mb-0">{full_name}</h4>
        <p className="mb-0 small">{bio}</p>
      </div>
    </Link>
  );
};

export default AddFriendCard;
