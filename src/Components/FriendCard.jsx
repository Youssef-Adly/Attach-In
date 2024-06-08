import React from "react";
import { Link } from "react-router-dom";

const FriendCard = () => {
  return (
    <div
      className="bg-dark-subtle "
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
              src="https://github.com/mdo.png"
              alt=""
            />
            <Link className="position-absolute bottom-0 end-0 hoverOne">
              <img
                className=""
                src="chatIcon.svg"
                alt="icon4"
                style={{ width: "30px" }}
              />
            </Link>
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="p-5 mt-4" style={{ color: "var(--text-main-color)" }}>
        {/* <div className="nav nav-divider"> */}
        <h4 className="card-title mb-0">Lori Ferguson</h4>
        {/* </div> */}
        <p className="mb-0 small">Web Developer at Webestica</p>
      </div>
    </div>
  );
};

export default FriendCard;
