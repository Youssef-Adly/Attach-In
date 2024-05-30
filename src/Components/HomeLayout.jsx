import React, { useEffect } from "react";
import Aside from "./Aside";
import AsideRight from "./AsideRight";
import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import "./HomeLayout.css";

const HomeLayout = ({ children }) => {
  const { pathname } = useLocation();
  // let { pathname } = location;
  // console.log(pathname);
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    // Navbar #1
    <main
      className="container-fluid bg-body-tertiary"
      style={{ minHeight: "100vh" }}
    >
      <nav
        className="d-flex justify-content-around border-bottom"
        style={{
          borderColor: "#878787",
        }}
      >
        <div className="col-7 col-md-3 d-flex justify-content-center h-70 logo">
          <img src="/LogowithoutLG.svg" className="img-fluid w-75" alt="logo" />
        </div>
        <div className="col-5 col-md-9 p-4 py-2">
          <ul className="nav justify-content-md-around justify-content-end ">
            <li
              className="nav-item d-none d-md-block"
              // style={{
              //   borderBottom:
              //     pathname === "/home"
              //       ? "5px solid var(--text-main-color)"
              //       : "none",
              // }}
            >
              <NavLink
                className="nav-link"
                to="/home"
                style={({ isActive, isPending, isTransitioning }) => {
                  return {
                    borderBottom: isActive
                      ? "5px solid var(--text-main-color)"
                      : "none",
                  };
                }}
              >
                <img src="/icon1.svg" alt="icon4" style={{ width: "50px" }} />
              </NavLink>
            </li>
            <li
              className="nav-item d-none d-md-block"
              // style={{
              //   borderBottom:
              //     pathname === "/network"
              //       ? "5px solid var(--text-main-color)"
              //       : "none",
              // }}
            >
              <NavLink
                className="nav-link"
                to="/network"
                style={({ isActive, isPending, isTransitioning }) => {
                  return {
                    borderBottom: isActive
                      ? "5px solid var(--text-main-color)"
                      : "none",
                  };
                }}
              >
                <img src="/icon2.svg" alt="icon4" style={{ width: "50px" }} />
              </NavLink>
            </li>
            <li
              className="nav-item d-none d-md-block"
              // style={{
              //   borderBottom:
              //     pathname === "/notifications"
              //       ? "5px solid var(--text-main-color)"
              //       : "none",
              // }}
            >
              <NavLink
                className="nav-link"
                to="/notifications"
                style={({ isActive, isPending, isTransitioning }) => {
                  return {
                    borderBottom: isActive
                      ? "5px solid var(--text-main-color)"
                      : "none",
                  };
                }}
              >
                <img src="/icon3.svg" alt="icon4" style={{ width: "50px" }} />
              </NavLink>
            </li>
            <li
              className="nav-item d-none d-md-block"
              // style={{
              //   borderBottom:
              //     pathname === "/internships"
              //       ? "5px solid var(--text-main-color)"
              //       : "none",
              // }}
            >
              <NavLink
                className="nav-link"
                to="/internships"
                style={({ isActive, isPending, isTransitioning }) => {
                  return {
                    borderBottom: isActive
                      ? "5px solid var(--text-main-color)"
                      : "none",
                  };
                }}
              >
                <img src="/icon4.svg" alt="icon4" style={{ width: "50px" }} />
              </NavLink>
            </li>
            <li className="nav-item d-block d-lg-none align-self-end ">
              <button
                className="btn d-flex align-items-center justify-content-center"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <FontAwesomeIcon
                  icon={faBars}
                  fontSize={40}
                  className="mb-md-1 pb-md-1"
                  // color="#363b56"
                  style={{ color: "var(--text-main-color)" }}
                />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {/* Navbar #2 */}
      <nav
        className="bg-body-tertiary d-block d-md-none z-3 col-12 border-top border-3 position-fixed bottom-0"
        style={{
          backgroundColor: "#eee",
          right: "0",
          // width: "100%",
        }}
      >
        <ul className="nav justify-content-evenly col-12">
          <li className="nav-item">
            <NavLink
              className="nav-link px-0 active d-flex justify-content-center"
              to="/home"
              style={({ isActive, isPending, isTransitioning }) => {
                return {
                  transform: isActive ? "translate(0, -5px)" : "none",
                  borderRadius: "50%",
                  // viewTransitionName: isTransitioning ? "slide" : "",
                };
              }}
            >
              <img
                src="/icon1.svg"
                // style={{
                //   transform:
                //     pathname === "/home" ? "translate(0, -5px)" : "none",
                //   borderRadius: "50%",
                // }}
                className="w-75"
                alt="icon1"
              />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link px-0 d-flex justify-content-center"
              to="/network"
              style={({ isActive, isPending, isTransitioning }) => {
                return {
                  transform: isActive ? "translate(0, -5px)" : "none",
                  borderRadius: "50%",
                };
              }}
            >
              <img
                src="/icon2.svg"
                // style={{
                //   transform:
                //     pathname === "/network" ? "translate(0, -5px)" : "none",
                //   borderRadius: "50%",
                // }}
                className="w-75"
                alt="icon2"
              />
            </NavLink>
          </li>
          <li
            className="nav-item"
            style={{
              width: "59px",
            }}
          >
            <NavLink
              className="nav-link px-0 d-flex justify-content-center"
              to=""
              data-bs-toggle="modal"
              data-bs-target="#feedActionPhoto"
            >
              <img
                src="/icon5.svg"
                className=""
                style={{
                  width: "44.25px",
                }}
                alt="icon5"
              />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link px-0 d-flex justify-content-center"
              to="/notifications"
              style={({ isActive, isPending, isTransitioning }) => {
                return {
                  transform: isActive ? "translate(0, -5px)" : "none",
                  borderRadius: "50%",
                };
              }}
            >
              <img
                src="/icon3.svg"
                // style={{
                //   transform:
                //     pathname === "/notifications"
                //       ? "translate(0, -5px)"
                //       : "none",
                //   borderRadius: "50%",
                // }}
                className="w-75"
                alt="icon3"
              />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link px-0 d-flex justify-content-center"
              to="/internships"
              style={({ isActive, isPending, isTransitioning }) => {
                return {
                  transform: isActive ? "translate(0, -5px)" : "none",
                  borderRadius: "50%",
                };
              }}
            >
              <img
                src="/icon4.svg"
                // style={{
                //   transform:
                //     pathname === "/internships" ? "translate(0, -5px)" : "none",
                //   borderRadius: "50%",
                // }}
                className="w-75"
                alt="icon4"
              />
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        // className="offcanvas offcanvas-end bg-light "
        // data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ width: 320, backgroundColor: "var(--main-color)" }}
      >
        <div className="offcanvas-header">
          {/* <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Offcanvas right
          </h5> */}
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="offcanvas-body"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          <AsideRight />
        </div>
        <img
          src="asideFrame.svg"
          alt=""
          className="img-fluid position-absolute bottom-0 end-0 col-3"
        />
      </div>
      {/* Container For Posts And Aside */}
      <div className="d-flex">
        <aside
          className="col-3 d-none d-lg-block border-end border-4"
          style={{
            borderColor: "#878787",
          }}
        >
          <Aside />
        </aside>
        {/* Posts */}
        <div
          className="col-12 col-lg-9 p-1 p-sm-2 p-md-4 d-flex flex-column gap-0"
          style={{
            marginBottom: "65px",
            marginTop: "10px",
          }}
        >
          {/* Posts */}
          {/* {children} */}
          <Outlet />
        </div>
      </div>
      {/* Models */}
      {/* ========================== */}
      {/* Photo Model */}
      <div
        className="modal fade"
        id="feedActionPhoto"
        tabIndex={-1}
        aria-labelledby="feedActionPhotoLabel"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Modal feed header START */}
            <div className="modal-header">
              <h5 className="modal-title" id="feedActionPhotoLabel">
                Add post photo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            {/* Modal feed header END */}
            {/* Modal feed body START */}
            <div className="modal-body">
              {/* Add Feed */}
              <div className="d-flex mb-3">
                {/* Avatar */}
                <div className="avatar avatar-xs me-2">
                  <img
                    className="avatar-img rounded-circle"
                    src="https://github.com/mdo.png"
                    alt=""
                  />
                </div>
                {/* Feed box  */}
                <form className="w-100">
                  <textarea
                    className="form-control pe-4 fs-3 lh-1 border-0"
                    rows={2}
                    placeholder="Share your thoughts..."
                    defaultValue={""}
                  />
                </form>
              </div>
              {/* Dropzone photo START */}
              <div>
                <label className="form-label">Upload attachment</label>
                {/* <div
                  className="dropzone dropzone-default card shadow-none dz-clickable"
                  data-dropzone='{"maxFiles":2}'
                >
                  <div className="dz-message">
                    <i className="bi bi-images display-3" />
                    <p>Drag here or click to upload photo.</p>
                  </div>
                </div> */}
                <div>
                  <label htmlFor="formFileLg" className="form-label">
                    Drag here or click to upload photo
                  </label>
                  <input
                    className="form-control form-control-lg"
                    id="formFileLg"
                    type="file"
                  />
                </div>
              </div>
              {/* Dropzone photo END */}
            </div>
            {/* Modal feed body END */}
            {/* Modal feed footer */}
            <div className="modal-footer ">
              {/* Button */}
              <button
                type="button"
                className="btn btn-danger-soft me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-success-soft">
                Post
              </button>
            </div>
            {/* Modal feed footer */}
          </div>
        </div>
      </div>
      {/* ========================== */}
      {/* Video Model */}
      <div
        className="modal fade"
        id="feedActionVideo"
        tabIndex={-1}
        aria-labelledby="feedActionVideoLabel"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Modal feed header START */}
            <div className="modal-header">
              <h5 className="modal-title" id="feedActionVideoLabel">
                Add post video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            {/* Modal feed header END */}
            {/* Modal feed body START */}
            <div className="modal-body">
              {/* Add Feed */}
              <div className="d-flex mb-3">
                {/* Avatar */}
                <div className="avatar avatar-xs me-2">
                  <img
                    className="avatar-img rounded-circle"
                    src="https://github.com/mdo.png"
                    alt=""
                  />
                </div>
                {/* Feed box  */}
                <form className="w-100">
                  <textarea
                    className="form-control pe-4 fs-3 lh-1 border-0"
                    rows={2}
                    placeholder="Share your thoughts..."
                    defaultValue={""}
                  />
                </form>
              </div>
              {/* Dropzone photo START */}
              <div>
                <label className="form-label">Upload attachment</label>
                {/* <div
                  className="dropzone dropzone-default card shadow-none dz-clickable"
                  data-dropzone='{"maxFiles":2}'
                >
                  <div className="dz-message">
                    <i className="bi bi-camera-reels display-3" />
                    <p>Drag here or click to upload video.</p>
                  </div>
                </div> */}
                <div>
                  <label htmlFor="formFileLg" className="form-label">
                    <FontAwesomeIcon
                      icon={faVideoCamera}
                      className="text-info pe-2"
                    />
                    Drag here or click to upload Video
                  </label>
                  <input
                    className="form-control form-control-lg"
                    id="formFileLg"
                    type="file"
                  />
                </div>
              </div>
              {/* Dropzone photo END */}
            </div>
            {/* Modal feed body END */}
            {/* Modal feed footer */}
            <div className="modal-footer">
              {/* Button */}
              <button type="button" className="btn btn-danger-soft me-2">
                <i className="bi bi-camera-video-fill pe-1" /> Live video
              </button>
              <button type="button" className="btn btn-success-soft">
                Post
              </button>
            </div>
            {/* Modal feed footer */}
          </div>
        </div>
      </div>
      {/* ========================== */}
      {/* Feeling Model */}
      <div
        className="modal fade"
        id="modalCreateFeed"
        tabIndex={-1}
        aria-labelledby="modalLabelCreateFeed"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Modal feed header START */}
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabelCreateFeed">
                Create post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            {/* Modal feed header END */}
            {/* Modal feed body START */}
            <div className="modal-body">
              {/* Add Feed */}
              <div className="d-flex mb-3">
                {/* Avatar */}
                <div className="avatar avatar-xs me-2">
                  <img
                    className="avatar-img rounded-circle"
                    src="https://github.com/mdo.png"
                    alt=""
                  />
                </div>
                {/* Feed box  */}
                <form className="w-100">
                  <textarea
                    className="form-control pe-4 fs-3 lh-1 border-0"
                    rows={4}
                    placeholder="Share your thoughts..."
                    autoFocus
                    defaultValue={""}
                  />
                </form>
              </div>
              {/* Feed rect START */}
              <div className="hstack gap-2">
                <Link
                  className="icon-md bg-success bg-opacity-10 text-success rounded-circle"
                  to=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Photo"
                  data-bs-original-title="Photo"
                >
                  <i className="bi bi-image-fill" />
                </Link>
                <Link
                  className="icon-md bg-info bg-opacity-10 text-info rounded-circle"
                  to=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Video"
                  data-bs-original-title="Video"
                >
                  {" "}
                  <i className="bi bi-camera-reels-fill" />{" "}
                </Link>
                <Link
                  className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle"
                  to=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Events"
                  data-bs-original-title="Events"
                >
                  {" "}
                  <i className="bi bi-calendar2-event-fill" />{" "}
                </Link>
                <Link
                  className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle"
                  to=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Feeling/Activity"
                  data-bs-original-title="Feeling/Activity"
                >
                  {" "}
                  <i className="bi bi-emoji-smile-fill" />{" "}
                </Link>
                <Link
                  className="icon-md bg-light text-secondary rounded-circle"
                  to=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Check in"
                  data-bs-original-title="Check in"
                >
                  {" "}
                  <i className="bi bi-geo-alt-fill" />{" "}
                </Link>
                <Link
                  className="icon-md bg-primary bg-opacity-10 text-primary rounded-circle"
                  to=""
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Tag people on top"
                  data-bs-original-title="Tag people on top"
                >
                  {" "}
                  <i className="bi bi-tag-fill" />{" "}
                </Link>
              </div>
              {/* Feed rect END */}
            </div>
            {/* Modal feed body END */}
            {/* Modal feed footer */}
            <div className="modal-footer row justify-content-between">
              {/* Select */}
              <div className="col-lg-3">
                <select className="form-select form-select-lg mb-3">
                  <option value={"Public"}>Public</option>
                  <option value={"Only me"}>Only me</option>
                  <option value={"Friends"}>Friends</option>
                </select>
                {/* Button */}
              </div>
              <div className="col-lg-8 text-sm-end">
                {/* <button type="button" className="btn btn-danger-soft me-2">
                  <i className="bi bi-camera-video-fill pe-1" /> Live video
                </button> */}
                <button type="button" className="btn px-4 btn-success me-3">
                  Post
                </button>
              </div>
            </div>
            {/* Modal feed footer */}
          </div>
        </div>
      </div>
      {/* End Of Models */}
      {/* ========================== */}
    </main>
  );
};

export default HomeLayout;
