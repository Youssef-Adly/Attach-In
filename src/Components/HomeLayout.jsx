import React, { useEffect, useRef, useState } from "react";
import Aside from "./Aside";
import AsideRight from "./AsideRight";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./HomeLayout.css";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingSuspese from "./LoadingSuspense";
import { FilePond } from "react-filepond";

const HomeLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);

  const baseURL = "https://attachin.com/";
  const postBox2 = useRef();
  const user = useSelector((state) => state.Auth.user);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const addPostWithImage = async (e) => {
    e.preventDefault();
    const postValue = postBox2.current.value;
    if (postValue.trim().length > 0) {
      const formData = new FormData();
      formData.append("title", postValue); // Title data

      if (files[0]) {
        formData.append("image", files[0]?.file); // Image data
      }
      setLoading(true);
      await axios
        .post("https://attachin.com/api/addUserPost", formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data", // Important for image uploads
          },
        })
        .then((res) => {
          console.log(res.data.data);
          // if (!image) {
          //   postBox2.current.value = "";
          //   postBox2.current.rows = 2;
          // }
          window.location.reload();
        })
        .catch((err) => {
          if (err.response.data.errors[0] === "Unauthenticated") {
            console.log(err.response.data.errors[0]);
            setLoading(false);
            navigate("/login");
            window.location.reload();
          } else {
            window.location.reload();
          }
        });
      setTimeout(() => {
        setLoading(false);
      }, 100);
    } /* else {
      postBox2.current.rows = postBox2.current.value.split("\n").length;
      return;
    } */
  };

  return (
    // Navbar #1
    <main
      className="container-fluid bg-body-tertiary"
      style={{ minHeight: "100vh" }}
    >
      <>
        <nav
          className="d-flex justify-content-around border-bottom"
          style={{
            borderColor: "#878787",
          }}
        >
          <div className="col-7 col-md-3 d-flex justify-content-center h-70 logo">
            <img
              src="/LogowithoutLG.svg"
              className="img-fluid w-75"
              alt="logo"
            />
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
      </>
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
        {!loading ? (
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              // style={{
              //   background: "var(--main-color)",
              //   color: "#eee",
              // }}
            >
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
                      src={
                        user.profile_photo
                          ? baseURL + user.profile_photo
                          : "/profile.png"
                      }
                      // src="https://github.com/mdo.png"
                      alt={user.full_name}
                      title={user.full_name}
                    />
                  </div>
                  {/* Feed box  */}
                  <form className="w-100">
                    <textarea
                      className="form-control pe-4 fs-3 lh-1 border-0"
                      rows={2}
                      placeholder="Share your thoughts..."
                      defaultValue={""}
                      ref={postBox2}
                      onKeyUp={(e) => {
                        // console.log(postBox2.current.value.split("\n").length);
                        postBox2.current.rows =
                          postBox2.current.value.split("\n").length + 1;
                        if (e.key === "Enter" && !e.shiftKey) {
                          addPostWithImage(e);
                        }
                      }}
                    />
                  </form>
                </div>
                {/* Dropzone photo START */}
                <div>
                  <label className="form-label text-muted">
                    Upload Picture...
                  </label>
                  <div className="rounded-5">
                    <FilePond
                      files={files}
                      onupdatefiles={setFiles}
                      acceptedFileTypes={["image/*"]}
                      allowReorder={true}
                      credits={false}
                      name="files" /* sets the file input name, it's filepond by default */
                      // allowMultiple={true}
                      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
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
                  className="btn btn-outline-danger me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => addPostWithImage(e)}
                  type="button"
                  className="btn mainColor"
                >
                  Post
                </button>
              </div>
              {/* Modal feed footer */}
            </div>
          </div>
        ) : (
          <LoadingSuspese />
        )}
      </div>
      {/* End Of Models */}
      {/* ========================== */}
    </main>
  );
};

export default HomeLayout;
