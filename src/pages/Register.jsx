import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

const Register = () => {
  const [userReg, setUserReg] = useState({});

  const handleChange = (e) => {
    setUserReg((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    console.log(userReg);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--offWhite-color)",
        minHeight: "100vh",
      }}
      className="d-flex flex-column position-relative "
    >
      <Link to={"/"} className="text-dark">
        <FontAwesomeIcon
          icon={faXmark}
          fontSize={50}
          className="position-absolute start-0 p-4"
        />
      </Link>
      <div className="mt-5 pt-4 d-flex flex-column justify-content-center align-items-center">
        <img
          src="Logowithout.svg"
          alt="Logowithout.svg"
          className="img-fluid mb-3"
        />
        {/*  */}
        <div className="col-9 col-md-7 col-lg-5 col-xxl-3">
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="floatingInput"
              placeholder="john Doe"
              style={{
                borderColor: "var(--main-color)",
              }}
              name="firstName"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingInput"
              style={{ color: "var(--main-color)" }}
            >
              First Name
            </label>
          </div>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="floatingInput2"
              placeholder="john Doe"
              style={{
                borderColor: "var(--main-color)",
              }}
              name="lastName"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingInput2"
              style={{ color: "var(--main-color)" }}
            >
              Last Name
            </label>
          </div>
          <div className="form-floating my-3">
            <input
              type="number"
              className="form-control rounded-5"
              id="floatingInput3"
              placeholder="0123456879"
              style={{
                borderColor: "var(--main-color)",
              }}
              name="mobileNum"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingInput3"
              style={{ color: "var(--main-color)" }}
            >
              Mobile Number
            </label>
          </div>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="floatingInput4"
              placeholder="Cairo"
              style={{
                borderColor: "var(--main-color)",
              }}
              name="university"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingInput4"
              style={{ color: "var(--main-color)" }}
            >
              University
            </label>
          </div>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="floatingInput5"
              placeholder="example@email.com"
              style={{
                borderColor: "var(--main-color)",
              }}
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingInput5"
              style={{ color: "var(--main-color)" }}
            >
              Email
            </label>
          </div>
          <div className="form-floating my-3">
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
          <div className="form-floating my-3">
            <input
              type="password"
              className="form-control rounded-5"
              id="floatingPassword2"
              placeholder="Confirm Password"
              style={{
                borderColor: "var(--main-color)",
              }}
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingPassword2"
              style={{
                color: "var(--main-color)",
              }}
            >
              Confirm Password
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
          Let's Go
        </Link>
      </div>
      <div className="col-12 d-none d-md-block">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
