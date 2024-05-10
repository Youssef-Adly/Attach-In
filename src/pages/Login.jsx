import React, { useState } from "react";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [login, setLogin] = useState(false);
  const [userLogin, setUserLogin] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    setUserLogin((old) => ({ ...old, [e.target.name]: e.target.value }));
    // console.log(userLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userLogin.password && userLogin.userName) setLogin((old) => !old);
    console.log(userLogin);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--sec-color)",
        minHeight: "100vh",
      }}
      className="d-flex flex-column align-items-end position-relative "
    >
      {/* <img src="graything.svg" alt="graything" className="img-fluid" /> */}
      <Link to={"/"} className="text-dark">
        <FontAwesomeIcon
          icon={faXmark}
          fontSize={50}
          className="position-absolute start-0 p-4"
        />
      </Link>
      <div
        style={{
          background: "url(graything.svg) no-repeat top/cover",
          // minHeight: "1200px",
          width: "100vw",
        }}
        className="d-flex flex-column justify-content-lg-end justify-content-center align-items-center px-3"
      >
        <img
          src="AttachInLogo.svg"
          alt=""
          className="img-fluid"
          style={{
            marginTop: "800px",
          }}
        />
        {/*  */}
        <div
          className={`my-4 flex-column flex-sm-row gap-sm-5 gap-3 ${
            login ? "d-none" : "d-flex"
          }`}
        >
          <Link
            to={"/register"}
            style={{
              backgroundColor: "var(--main-color)",
              height: "100px",
              width: "100px",
            }}
            className="text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
          >
            Sign Up
          </Link>
          <Link
            // to={"/login"}
            onClick={(e) => {
              e.preventDefault();
              setLogin(true);
            }}
            style={{
              backgroundColor: "var(--main-color)",
              height: "100px",
              width: "100px",
            }}
            className="text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
          >
            Login
          </Link>
        </div>
        {/*  */}
        <div
          className={`my-4 col-10 flex-column flex-lg-row justify-content-center align-items-center  gap-sm-5 gap-3 ${
            login ? "d-flex" : "d-none"
          }`}
        >
          <div className="col-12 col-md-7 col-lg-5">
            <div className="form-floating my-3">
              <input
                type="email"
                className="form-control rounded-5"
                id="floatingInput"
                placeholder="name@example.com"
                style={{
                  borderColor: "var(--main-color)",
                }}
                name="userName"
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="floatingInput"
                style={{ color: "var(--main-color)" }}
              >
                User Name
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control rounded-5"
                id="floatingPassword"
                placeholder="Password"
                style={{
                  borderColor: "var(--main-color)",
                }}
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="floatingPassword"
                style={{
                  color: "var(--main-color)",
                }}
              >
                Password
              </label>
            </div>
          </div>
          <Link
            // to={"/login"}
            onClick={(e) => {
              handleSubmit(e);
            }}
            style={{
              backgroundColor: "var(--main-color)",
              height: "100px",
              width: "100px",
            }}
            className="text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
          >
            Login
          </Link>
        </div>
        <div className="col-12 d-none d-lg-block g-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Login;
