import React from "react";
import { Link } from "react-router-dom";

const Notification = (props) => {
  const baseImgURL = "https://attachin.com/";

  return (
    <>
      <div
        style={{ transition: "0" }}
        className="col-11 col-sm-8 col-md-6 col-x-5 mx-aut ms-3 bg-secondary-subtle rounded-pill"
      >
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
              <h5 className="card-title mb-0">
                <Link
                  to={"/profile/" + props.from_user.id}
                  className="text-decoration-none"
                  style={{
                    color: "var(--text-main-color)",
                  }}
                >
                  {props.from_user?.full_name}
                </Link>
              </h5>
              {/* <span className="nav-item small"> 2hr</span> */}
            </div>
            <p className="mb-0 small">
              {/* {props.from_user?.bio || props.from_user?.type} */}
              {props.body}
            </p>
          </div>
        </div>
        {/* <p className="p-3">{props.body}</p> */}
      </div>
      <hr className="col-12" />
    </>
  );
};

export default Notification;
