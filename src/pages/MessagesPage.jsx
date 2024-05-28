import React from "react";
// import HomeLayout from "../Components/HomeLayout";
import { useTranslation } from "react-i18next";

const MessagesPage = () => {
  const [t] = useTranslation();

  return (
    <>
      {/* Header Title */}
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("Messages")}
      </h1>
      <hr />
      {/* #1 */}
      <div
        className="col-11 mx-auto p-2 rounded-2"
        style={{ backgroundColor: "#97AEDA" }}
      >
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="position-relative ">
            {/* <Link to=""> */}
            <img
              className="avatar-img rounded-circle"
              src="/profile.svg"
              style={{ width: "50px", height: "auto" }}
              alt=""
            />
            {/* </Link> */}
          </div>
          {/* Info */}
          <div className="">
            <div className="nav nav-divider">
              <h5 className="card-title mb-0">Fady Ezat</h5>
              {/* <span className="nav-item small"> 2hr</span> */}
            </div>
            <p className="mb-0 small">Last Message from fady</p>
          </div>
        </div>
        {/* <p className="p-3">notification</p> */}
      </div>
      <hr className="col-12" />
      {/* #2 */}
      <div className="col-11 mx-auto rounded-2">
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="position-relative">
            {/* <Link to=""> */}
            <img
              className="avatar-img rounded-circle"
              src="/profile2.svg"
              style={{ width: "50px", height: "auto" }}
              alt=""
            />
            {/* </Link> */}
          </div>
          {/* Info */}
          <div className="">
            <div className="nav nav-divider">
              <h5 className="card-title mb-0">Fady Ezat</h5>
              {/* <span className="nav-item small"> 2hr</span> */}
            </div>
            <p className="mb-0 small">Last Message from fady</p>
          </div>
        </div>
        {/* <p className="p-3">notification</p> */}
      </div>
      <hr className="col-12" />
      {/* #3 */}
      <div className="col-11 mx-auto rounded-2">
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="position-relative">
            {/* <Link to=""> */}
            <img
              className="avatar-img rounded-circle"
              src="/profile2.svg"
              style={{ width: "50px", height: "auto" }}
              alt=""
            />
            {/* </Link> */}
          </div>
          {/* Info */}
          <div className="">
            <div className="nav nav-divider">
              <h5 className="card-title mb-0">Fady Ezat</h5>
              {/* <span className="nav-item small"> 2hr</span> */}
            </div>
            <p className="mb-0 small">Last Message from fady</p>
          </div>
        </div>
        {/* <p className="p-3">notification</p> */}
      </div>
      <hr className="col-12" />
      {/* #4 */}
      <div className="col-11 mx-auto rounded-2">
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="position-relative">
            {/* <Link to=""> */}
            <img
              className="avatar-img rounded-circle"
              src="/profile2.svg"
              style={{ width: "50px", height: "auto" }}
              alt=""
            />
            {/* </Link> */}
          </div>
          {/* Info */}
          <div className="">
            <div className="nav nav-divider">
              <h5 className="card-title mb-0">Fady Ezat</h5>
              {/* <span className="nav-item small"> 2hr</span> */}
            </div>
            <p className="mb-0 small">Last Message from fady</p>
          </div>
        </div>
        {/* <p className="p-3">notification</p> */}
      </div>
      <hr className="col-12" />
    </>
  );
};

export default MessagesPage;
