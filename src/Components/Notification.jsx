import React from "react";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Notification = (props) => {
  // const [t, i18n] = useTranslation();
  // const baseURL = "https://attachin.com/api/";
  const baseImgURL = "https://attachin.com/";
  // const user = useSelector((state) => state.Auth.user);

  return (
    <>
      <div className="col-11 mx-auto">
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="position-relative ">
            <Link to={"/profile/" + props.from_user.id}>
              <img
                className="avatar-img rounded-circle"
                src={
                  props.from_user?.profile_photo
                    ? baseImgURL + props.from_user?.profile_photo
                    : "/profile.png"
                }
                style={{ width: "70px", height: "70px" }}
                alt=""
              />
            </Link>
          </div>
          {/* Info */}
          <div className="">
            <div className="nav nav-divider">
              <h5 className="card-title mb-0">{props.from_user?.full_name}</h5>
              {/* <span className="nav-item small"> 2hr</span> */}
            </div>
            <p className="mb-0 small">
              {props.from_user?.bio || props.from_user?.type}
            </p>
          </div>
        </div>
        <p className="p-3">{props.body}</p>
      </div>
      <hr className="col-12" />
    </>
  );
};

export default Notification;
