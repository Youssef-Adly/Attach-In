import React from "react";

const AddFriendCard = () => {
  return (
    <div
      className="bg-dark-subtle position-relative"
      style={{ width: "300px", height: "250px", borderRadius: "80px" }}
    >
      <img
        src="deny.svg"
        alt="deny"
        className="position-absolute hoverTwo"
        style={{
          left: "20px",
          top: "25%",
          zIndex: "999",
          cursor: "pointer",
        }}
      />
      <img
        src="accept.svg"
        alt="accept"
        className="position-absolute hoverTwo"
        style={{
          right: "20px",
          top: "25%",
          zIndex: "999",
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
              src="https://github.com/mdo.png"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="p-5 mt-4" style={{ color: "var(--text-main-color)" }}>
        <h4 className="card-title mb-0">Lori Ferguson</h4>
        <p className="mb-0 small">Web Developer at Webestica</p>
      </div>
    </div>
  );
};

export default AddFriendCard;
