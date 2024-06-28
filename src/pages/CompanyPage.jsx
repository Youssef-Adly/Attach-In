import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProfilePage.css";
import axios from "axios";
import { useSelector } from "react-redux";

const CompanyPage = () => {
  const baseURL = "https://attachin.com/api/";
  const baseImgURL = "https://attachin.com/";
  const authUser = useSelector((state) => state.Auth.user);
  const [company, setCompany] = useState(null);
  let [posts, setPosts] = useState(null);
  let [width, setWidth] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .post(
        baseURL + "userInfo",
        { for_user_id: id },
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      )
      .then((res) => {
        // console.log(res.data.data);
        setCompany(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${baseURL}getAllHomePosts?user_id=` + id)
      .then((res) => {
        res.data.data.length === 0 ? setPosts(null) : setPosts(res.data.data);
        // console.log("post: ", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authUser.token, id]);

  const profile = useRef();
  useEffect(() => {
    // console.log(profile);
    setWidth(profile.current.width);
    // profile.current.height = profile.current.width;
    // console.log("profile.current.clientHeight: ", profile.current.clientHeight);
    // console.log("profile.current.clientWidth: ", profile.current.clientWidth);
    // console.log("profile.current.width: ", profile.current.width);
    // console.log("profile.current.height: ", profile.current.height);
  }, [profile]);

  // Add Friends
  const addFriend = (e) => {
    axios
      .post(
        baseURL + "addFriendshipRequest",
        { user_id_2: id },
        { headers: { Authorization: `Bearer ${authUser.token}` } }
      )
      .then((res) => {
        window.location.reload();
      });
  };
  // deleteFriend
  const deleteFriend = (e) => {
    axios
      .post(
        baseURL + "deleteFriendshipRequest",
        { user_id_2: id },
        { headers: { Authorization: `Bearer ${authUser.token}` } }
      )
      .then((res) => {
        window.location.reload();
      });
  };

  // const blockRequest = () => {
  //   axios
  //     .post(
  //       baseURL + "blockFriendshipRequest",
  //       { user_id_2: id },
  //       { headers: { Authorization: `Bearer ${authUser.token}` } }
  //     )
  //     .then((res) => {
  //       console.log("res: ", res);
  //       window.location.reload();
  //     });
  // };

  return (
    <>
      <main>
        {/* banner Cover */}
        <div
          className="col-12 rounded-5 shadow-lg bannerCover"
          style={{
            background: company?.profile_cover
              ? `url(${
                  baseImgURL + company?.profile_cover
                }) no-repeat center center / cover`
              : "url(/banner.jpg) no-repeat right top / cover",
          }}
        >
          {/* <img
            src="https://maymt.com/images/uploaded/Eva-Cosmetics_banner-2.jpg_1000.webp"
            className=""
            style={{ width: "100%" }}
            alt="cover"
          /> */}
        </div>

        {/* Profile Picture With Name and Icons */}
        <div className="position-relative d-flex align-content-center gap-2 mb-4 mb-sm-0">
          <div className="col-3 col-xxl-3 ms-2 ms-sm-4">
            <img
              // src="https://play-lh.googleusercontent.com/hsXfcN2lmhNvvWyIBfxLjrdtwo78Qfqskh4VTfS6UkDinlJ4AwPUpneF3c1qjJhi"
              ref={profile}
              src={
                company?.profile_photo
                  ? `${baseImgURL + company?.profile_photo}`
                  : "/profile.png"
              }
              alt="profile"
              className="col img-fluid rounded-circle shadow-lg profilePic"
              style={{
                transform: "translateY(-50%)",
                backgroundColor: "var(--offWhite-color)",
                objectFit: "cover",
                height: `${width}px`,
                width: `${width}px`,
                aspectRatio: "1",
              }}
            />
          </div>
          {/* full_name */}
          <h3
            className="mt-2 mt-sm-4 col-4 col-sm-2 col-md-4"
            style={{ color: "var(--text-main-color)" }}
          >
            {company?.full_name}
          </h3>
          {/*  */}
          <div
            className="position-absolute end-0 mt-4 col-4 ms-auto me-sm-3"
            style={{
              top: "50px",
            }}
          >
            <div className="d-flex justify-content-end gap-2">
              {/* <Link >
                <img
                  src="/icon2.svg"
                  className="img-fluid"
                  style={{ width: "50px", height: "50px" }}
                  alt=""
                  title="add Friend"
                />
              </Link> */}
              {/*  */}
              {/*  */}
              {/*  */}

              {company?.we_are_friend ===
                "no" /* || user?.we_are_friend === "no" */ && (
                <Link onClick={(e) => addFriend(e)} className="">
                  <img
                    src="/icon2.svg"
                    className="img-fluid"
                    style={{ width: "50px", height: "50px" }}
                    alt="Add Friend"
                    title="Add Friend"
                  />
                </Link>
              )}
              {company?.we_are_friend === "pending" && (
                <div /* className="dropdown" */>
                  <Link to={"/notifications"} /* data-bs-toggle="dropdown" */>
                    <img
                      src="/pending.svg"
                      className="img-fluid"
                      style={{ width: "50px", height: "50px" }}
                      alt="Request Pending"
                      title="Request Pending"
                    />
                  </Link>
                  {/* <ul
                      className="dropdown-menu dropdown-menu-end mt-3 p-2 rounded-4"
                      aria-labelledby="feedActionShare"
                      style={{ backgroundColor: "var(--offWhite-color)" }}
                    >
                      <li className="mt-1">
                        <Link
                          className="dropdown-item rounded-4 border border-1 border-dark-subtle"
                          onClick={(e) => acceptFriendRequest(e)}
                        >
                          <img
                            src="/reportIcon.svg"
                            alt="report"
                            className="pe-2"
                          />
                          Accept Friend Request
                        </Link>
                      </li>
                      <li className="mt-2">
                        <Link
                          className="dropdown-item rounded-4 border border-1 border-dark-subtle"
                          onClick={(e) => rejectFriendRequest(e)}
                        >
                          <img
                            src="/BlockIcon.svg"
                            alt="block"
                            className="pe-2"
                          />
                          Reject Friend Request
                        </Link>
                      </li>
                    </ul> */}
                </div>
              )}
              {company?.we_are_friend === "approve" && (
                <Link onClick={(e) => deleteFriend(e)} className="">
                  <img
                    src="/approve.svg"
                    className="img-fluid"
                    style={{ width: "50px", height: "50px" }}
                    alt="Delete Friend"
                    title="Delete Friend"
                  />
                </Link>
              )}
              {company?.we_are_friend === "block" && (
                <div /* onClick={(e) => deleteFriend(e)} */ className="">
                  <img
                    src="/BlockIcon.svg"
                    className="img-fluid"
                    style={{ width: "40px", height: "40px" }}
                    alt="Blocked"
                    title="Blocked"
                  />
                </div>
              )}

              {/*  */}
              {/*  */}
              {/*  */}
              <Link to={"/companyProfile/internships/" + id} className="">
                <img
                  src="/icon4.svg"
                  className="img-fluid"
                  style={{ width: "50px", height: "50px" }}
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>

        {/* About Company */}

        <div className="d-flex justify-content-around gap-3 px-3">
          <p className="h4 col-8" style={{ color: "var(--text-main-color)" }}>
            About Company
          </p>
          <div
            className="nav-link col-4 col-sm-2"
            style={{ visibility: "hidden" }}
          >
            <p
              className="h5 text-decoration-underline"
              style={{ color: "var(--text-main-color)" }}
            ></p>
          </div>
        </div>

        <h4
          className="col-12 col-sm-10 mx-auto ps-4 pe-5 py-3 mt-4 rounded-5"
          style={{
            backgroundColor: "var(--sec-color)",
          }}
        >
          {company?.about ? company?.about : "No Bio Yet"}
        </h4>

        <hr className="mt-5 w-75 m-auto" />

        {/* Old Posts */}
        <div className="d-flex justify-content-around gap-3 px-3 mt-5">
          <p
            className="h4 ms-sm5 col-8"
            style={{ color: "var(--text-main-color)" }}
          >
            Posts
          </p>
          <Link
            to={"/userPosts/" + company?.id}
            className="nav-link me-sm5 col-4 col-sm-2"
          >
            <p
              className="h5 text-decoration-underline"
              style={{ color: "var(--text-main-color)" }}
            >
              See All
            </p>
          </Link>
        </div>

        {/* Carosel #2 */}

        {posts?.length > 0 ? (
          <div id="carouselExampleIndicators2" className="carousel slide mt-3">
            <div
              className="carousel-indicators"
              style={{ marginBottom: "-40px" }}
            >
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators2"
                data-bs-slide-to={0}
                className="active bg-black"
                aria-current="true"
                aria-label="Slide 1"
              />
              {posts?.length > 2 && (
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators2"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                  className=" bg-black"
                />
              )}
            </div>
            <div className="carousel-inner">
              {/*  */}
              {posts?.length > 0 ? (
                <div className="carousel-item active">
                  <div className="d-flex flex-wrap gap-3 justify-content-center">
                    {/* Card #1 */}
                    <Link
                      to={""}
                      className="nav-link d-flex flex-column justify-content-center align-items-center"
                      style={{ width: "270px", height: "200px" }}
                    >
                      <svg
                        width={301}
                        height={223}
                        viewBox="0 0 301 223"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M189.858 222.06H111.19C50.1153 222.06 0.160156 172.105 0.160156 111.03C0.160156 49.9551 50.1153 0 111.19 0H189.858C250.933 0 300.888 49.9551 300.888 111.03C300.888 172.105 250.912 222.06 189.858 222.06Z"
                          fill="#E3E2DC"
                        />
                        <path
                          d="M150.533 147.361C143.445 147.128 136.293 147.277 129.609 144.306C125.258 142.374 123.752 137.43 126.786 133.78C128.717 131.467 131.328 129.642 133.874 127.965C135.954 126.607 138.373 125.779 140.686 124.782C144.315 123.19 145.206 119.222 142.745 116.081C138.246 110.309 135.678 103.964 137.418 96.4727C138.84 90.3609 143.827 86.4349 150.384 86.2651C156.602 86.0954 162.184 89.9577 163.711 95.7936C165.664 103.263 163.308 109.821 158.788 115.72C157.26 117.715 156.369 119.71 157.685 122.023C158.236 122.999 159.17 123.912 160.146 124.485C164.157 126.819 168.38 128.814 172.242 131.361C173.749 132.358 175.022 134.374 175.511 136.178C176.657 140.274 174.98 143.075 170.927 144.666C165.43 146.831 159.595 147.043 153.801 147.34C152.698 147.425 151.615 147.361 150.533 147.361Z"
                          fill="#878787"
                        />
                      </svg>
                      <h6
                        className="text-center mt-3"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {posts[0]?.title}
                      </h6>
                    </Link>
                    {/* Card #2 */}
                    {posts[1] && (
                      <Link
                        to={""}
                        className="nav-link d-flex flex-column justify-content-center align-items-center"
                        style={{ width: "270px", height: "200px" }}
                      >
                        <svg
                          width={301}
                          height={223}
                          viewBox="0 0 301 223"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M189.858 222.06H111.19C50.1153 222.06 0.160156 172.105 0.160156 111.03C0.160156 49.9551 50.1153 0 111.19 0H189.858C250.933 0 300.888 49.9551 300.888 111.03C300.888 172.105 250.912 222.06 189.858 222.06Z"
                            fill="#E3E2DC"
                          />
                          <path
                            d="M150.533 147.361C143.445 147.128 136.293 147.277 129.609 144.306C125.258 142.374 123.752 137.43 126.786 133.78C128.717 131.467 131.328 129.642 133.874 127.965C135.954 126.607 138.373 125.779 140.686 124.782C144.315 123.19 145.206 119.222 142.745 116.081C138.246 110.309 135.678 103.964 137.418 96.4727C138.84 90.3609 143.827 86.4349 150.384 86.2651C156.602 86.0954 162.184 89.9577 163.711 95.7936C165.664 103.263 163.308 109.821 158.788 115.72C157.26 117.715 156.369 119.71 157.685 122.023C158.236 122.999 159.17 123.912 160.146 124.485C164.157 126.819 168.38 128.814 172.242 131.361C173.749 132.358 175.022 134.374 175.511 136.178C176.657 140.274 174.98 143.075 170.927 144.666C165.43 146.831 159.595 147.043 153.801 147.34C152.698 147.425 151.615 147.361 150.533 147.361Z"
                            fill="#878787"
                          />
                        </svg>
                        <h6
                          className="text-center mt-3"
                          style={{ color: "var(--text-main-color)" }}
                        >
                          {posts[1]?.title}
                        </h6>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
              {/*  */}
              {posts?.length > 2 ? (
                <div className={`carousel-item`}>
                  <div className="d-flex flex-wrap gap-3 justify-content-center">
                    {/* Card #1 */}
                    <Link
                      to={""}
                      className="nav-link d-flex flex-column justify-content-center align-items-center"
                      style={{ width: "270px", height: "200px" }}
                    >
                      <svg
                        width={301}
                        height={223}
                        viewBox="0 0 301 223"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M189.858 222.06H111.19C50.1153 222.06 0.160156 172.105 0.160156 111.03C0.160156 49.9551 50.1153 0 111.19 0H189.858C250.933 0 300.888 49.9551 300.888 111.03C300.888 172.105 250.912 222.06 189.858 222.06Z"
                          fill="#E3E2DC"
                        />
                        <path
                          d="M150.533 147.361C143.445 147.128 136.293 147.277 129.609 144.306C125.258 142.374 123.752 137.43 126.786 133.78C128.717 131.467 131.328 129.642 133.874 127.965C135.954 126.607 138.373 125.779 140.686 124.782C144.315 123.19 145.206 119.222 142.745 116.081C138.246 110.309 135.678 103.964 137.418 96.4727C138.84 90.3609 143.827 86.4349 150.384 86.2651C156.602 86.0954 162.184 89.9577 163.711 95.7936C165.664 103.263 163.308 109.821 158.788 115.72C157.26 117.715 156.369 119.71 157.685 122.023C158.236 122.999 159.17 123.912 160.146 124.485C164.157 126.819 168.38 128.814 172.242 131.361C173.749 132.358 175.022 134.374 175.511 136.178C176.657 140.274 174.98 143.075 170.927 144.666C165.43 146.831 159.595 147.043 153.801 147.34C152.698 147.425 151.615 147.361 150.533 147.361Z"
                          fill="#878787"
                        />
                      </svg>
                      <h6
                        className="text-center mt-3"
                        style={{ color: "var(--text-main-color)" }}
                      >
                        {posts[2]?.title}
                      </h6>
                    </Link>
                    {/* Card #2 */}
                    {posts[3] && (
                      <Link
                        to={""}
                        className="nav-link d-flex flex-column justify-content-center align-items-center"
                        style={{ width: "270px", height: "200px" }}
                      >
                        <svg
                          width={301}
                          height={223}
                          viewBox="0 0 301 223"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M189.858 222.06H111.19C50.1153 222.06 0.160156 172.105 0.160156 111.03C0.160156 49.9551 50.1153 0 111.19 0H189.858C250.933 0 300.888 49.9551 300.888 111.03C300.888 172.105 250.912 222.06 189.858 222.06Z"
                            fill="#E3E2DC"
                          />
                          <path
                            d="M150.533 147.361C143.445 147.128 136.293 147.277 129.609 144.306C125.258 142.374 123.752 137.43 126.786 133.78C128.717 131.467 131.328 129.642 133.874 127.965C135.954 126.607 138.373 125.779 140.686 124.782C144.315 123.19 145.206 119.222 142.745 116.081C138.246 110.309 135.678 103.964 137.418 96.4727C138.84 90.3609 143.827 86.4349 150.384 86.2651C156.602 86.0954 162.184 89.9577 163.711 95.7936C165.664 103.263 163.308 109.821 158.788 115.72C157.26 117.715 156.369 119.71 157.685 122.023C158.236 122.999 159.17 123.912 160.146 124.485C164.157 126.819 168.38 128.814 172.242 131.361C173.749 132.358 175.022 134.374 175.511 136.178C176.657 140.274 174.98 143.075 170.927 144.666C165.43 146.831 159.595 147.043 153.801 147.34C152.698 147.425 151.615 147.361 150.533 147.361Z"
                            fill="#878787"
                          />
                        </svg>
                        <h6
                          className="text-center mt-3"
                          style={{ color: "var(--text-main-color)" }}
                        >
                          {posts[3]?.title}
                        </h6>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators2"
              data-bs-slide="prev"
              style={
                {
                  // left: "35px",
                }
              }
            >
              <span
                className="carousel-control-prev-icon bg-danger p-sm-4 rounded-circle"
                aria-hidden="true"
              />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators2"
              data-bs-slide="next"
              style={
                {
                  // right: "35px",
                }
              }
            >
              <span
                className="carousel-control-next-icon bg-danger p-sm-4 rounded-circle"
                aria-hidden="true"
              />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          <div className="text-center display-3 pt-5">No Posts Yet</div>
        )}

        <hr className="mt-5 w-75 m-auto" />

        {/*  */}

        <svg
          // width={360}
          // height={233}
          style={{ width: "100%", marginTop: "80px" }}
          viewBox="0 0 360 233"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_14_544)">
            <path
              d="M360 103.44V232.71H0V99.5498C3.67 94.4697 10.84 85.2497 21.51 74.5498C22.96 73.0998 24.48 71.6097 26.06 70.1097C27.57 68.6797 29.14 67.2197 30.77 65.7497L30.87 65.6598L34.25 62.6697C34.87 62.1497 35.49 61.6097 36.12 61.0697C36.62 60.6497 37.12 60.2297 37.62 59.8197C38.75 58.8697 39.91 57.9198 41.09 56.9697C41.84 56.3698 42.59 55.7697 43.36 55.1697C66.94 36.6897 99.52 18.3697 141.12 11.1897C143.26 10.8097 145.42 10.4697 147.6 10.1697C148.66 10.0197 149.72 9.86975 150.8 9.73975C152.13 9.56975 153.48 9.40975 154.83 9.26975C155.39 9.19975 155.94 9.14975 156.5 9.09975C162.06 8.53975 167.78 8.18975 173.65 8.05975C173.97 8.04975 174.29 8.04975 174.6 8.03975C180.96 7.91975 187.28 8.07975 193.57 8.49975C199.6 8.89975 205.58 9.52975 211.51 10.4197C211.76 10.4597 212 10.4897 212.25 10.5297C213.63 10.7297 215.01 10.9597 216.39 11.1897C216.76 11.2497 217.13 11.3097 217.5 11.3897C219.23 11.6797 220.96 11.9997 222.67 12.3497C249.54 17.6597 274.93 27.7997 297.45 42.0197C299.36 43.2097 301.26 44.4597 303.13 45.7297C305.32 47.2097 307.48 48.7197 309.6 50.2797C311.63 51.7497 313.63 53.2697 315.6 54.8197C317.73 56.4997 319.83 58.2197 321.89 59.9897C321.93 60.0298 321.99 60.0697 322.03 60.1097C323.51 61.3797 324.97 62.6597 326.4 63.9597C326.48 64.0397 326.57 64.1097 326.65 64.1997C338.94 75.3497 349.81 88.0098 358.98 101.92C359.03 101.99 359.07 102.05 359.11 102.11C359.4 102.56 359.71 102.99 360 103.44Z"
              fill="#F2969C"
            />
            <path
              d="M231.78 94.1897C248.569 94.1897 262.18 80.5791 262.18 63.7896C262.18 47.0002 248.569 33.3896 231.78 33.3896C214.99 33.3896 201.38 47.0002 201.38 63.7896C201.38 80.5791 214.99 94.1897 231.78 94.1897Z"
              fill="white"
            />
            <path
              d="M142.96 94.1897C159.749 94.1897 173.36 80.5791 173.36 63.7896C173.36 47.0002 159.749 33.3896 142.96 33.3896C126.17 33.3896 112.56 47.0002 112.56 63.7896C112.56 80.5791 126.17 94.1897 142.96 94.1897Z"
              fill="white"
            />
            <path
              d="M227.38 69.0594C237.227 69.0594 245.21 61.0766 245.21 51.2294C245.21 41.3822 237.227 33.3994 227.38 33.3994C217.533 33.3994 209.55 41.3822 209.55 51.2294C209.55 61.0766 217.533 69.0594 227.38 69.0594Z"
              fill="#162A43"
            />
            <path
              d="M140.359 69.0594C150.207 69.0594 158.189 61.0766 158.189 51.2294C158.189 41.3822 150.207 33.3994 140.359 33.3994C130.512 33.3994 122.529 41.3822 122.529 51.2294C122.529 61.0766 130.512 69.0594 140.359 69.0594Z"
              fill="#162A43"
            />
            <path
              d="M166.39 5.98963L163.05 15.0796C153.34 10.9396 144.83 9.71964 137.5 10.2496C115.01 11.8896 102.32 29.0196 101.7 30.0196L91.7402 23.8996C91.8802 23.6696 97.8902 14.6096 112.83 6.63963C125.55 -0.170365 143.49 -3.78037 166.39 5.98963Z"
              fill="#1A1D36"
            />
            <path
              d="M202.83 7.90936L205.97 17.0694C215.76 13.1494 224.3 12.1094 231.62 12.7994C254.07 14.9294 266.38 32.3294 266.99 33.3494L277.08 27.4494C276.95 27.2194 271.13 18.0294 256.37 9.73936C243.8 2.64936 225.94 -1.35064 202.83 7.90936Z"
              fill="#1A1D36"
            />
          </g>
          <defs>
            <clipPath id="clip0_14_544">
              <rect width={360} height="232.71" fill="white" />
            </clipPath>
          </defs>
        </svg>

        {/*  */}
      </main>
    </>
  );
};

export default CompanyPage;
