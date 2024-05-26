import React from "react";
import { useTranslation } from "react-i18next";

const Notification = ({ avatar, name, job, notification }) => {
  const [t, i18n] = useTranslation();

  return (
    <>
      <div className="col-11 mx-auto">
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="position-relative ">
            {/* <Link to=""> */}
            <img
              className="avatar-img rounded-circle"
              src={avatar}
              style={{ width: "70px", height: "auto" }}
              alt=""
            />
            {/* </Link> */}
          </div>
          {/* Info */}
          <div className="">
            <div className="nav nav-divider">
              <h5 className="card-title mb-0">{name}</h5>
              {/* <span className="nav-item small"> 2hr</span> */}
            </div>
            <p className="mb-0 small">{job}</p>
          </div>
        </div>
        <p className="p-3">{notification}</p>
      </div>
      <hr className="col-12" />
    </>
  );
};

export default Notification;
