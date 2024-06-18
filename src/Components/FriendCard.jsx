import React from "react";
import { Link } from "react-router-dom";

const FriendCard = ({
  id,
  full_name,
  bio,
  profile_photo,
  profile_cover,
  user_type,
}) => {
  // const baseURL = "https://attachin.com/api/";
  const baseImgURL = "https://attachin.com/";

  return (
    <Link
      to={"/profile/" + id}
      className="bg-dark-subtle nav-link"
      style={{ width: "300px", height: "250px", borderRadius: "80px" }}
    >
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
          <div className="h-100 d-block position-relative">
            <img
              className="avatar-img rounded-circle"
              // src="https://github.com/mdo.png"
              src={baseImgURL + profile_photo}
              alt="profile_photo"
              style={{ height: "100px" }}
            />
            <div className="position-absolute bottom-0 end-0 hoverOne">
              <img
                className=""
                src="chatIcon.svg"
                alt="icon4"
                style={{ width: "30px" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="p-5 mt-4" style={{ color: "var(--text-main-color)" }}>
        {/* <div className="nav nav-divider"> */}
        <h4 className="card-title mb-0">{full_name}</h4>
        {/* </div> */}
        <p className="mb-0 small">{bio}</p>
      </div>
    </Link>
  );
};

export default FriendCard;
