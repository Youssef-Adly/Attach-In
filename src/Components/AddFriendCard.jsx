import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

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
    axios
      .post(
        baseURL + "responseOnFriendshipRequest",
        { id: reqID, response: "approve" },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        window.location.reload();
      });
  };

  const rejectRequest = () => {
    axios
      .post(
        baseURL + "responseOnFriendshipRequest",
        { id: reqID, response: "reject" },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        window.location.reload();
      });
  };
  return (
    <div
      className="bg-dark-subtle position-relative"
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
        style={{ height: "30%", borderRadius: "80px 80px 0 0" }}
      >
        <div
          className="col-4 position-absolute start-50 translate-middle"
          style={{
            top: "80px",
          }}
        >
          <div className="h-100 d-block">
            <img
              className="avatar-img rounded-circle"
              src={baseImgURL + profile_photo}
              alt="profile_photo"
              style={{ height: "100px" }}
            />
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="p-5 mt-4" style={{ color: "var(--text-main-color)" }}>
        <h4 className="card-title mb-0">{full_name}</h4>
        <p className="mb-0 small">{bio}</p>
      </div>
    </div>
  );
};

export default AddFriendCard;
