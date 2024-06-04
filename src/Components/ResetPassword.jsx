import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [userReset, setUserReset] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    setUserReset((old) => ({ ...old, [e.target.name]: e.target.value }));
    // console.log(userReset);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userReset);
  };

  return (
    <div className="col-10 mx-auto d-flex flex-column gap-4 mt-4 justify-content-center">
      <h1 style={{ color: "var(--text-main-color)" }}>Reset Password</h1>
      <hr />
      <div className="form-floating">
        <input
          type="password"
          className="form-control rounded-5"
          id="floatingInput"
          placeholder="name@example.com"
          style={{
            bordercolor: "var(--text-main-color)",
          }}
          name="CurrentPassword"
          onChange={(e) => handleChange(e)}
        />
        <label
          htmlFor="floatingInput"
          style={{ color: "var(--text-main-color)" }}
        >
          Current Password
        </label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control rounded-5"
          id="floatingPassword"
          placeholder="Password"
          style={{
            bordercolor: "var(--text-main-color)",
          }}
          name="NewPassword"
          onChange={(e) => handleChange(e)}
        />
        <label
          htmlFor="floatingPassword"
          style={{
            color: "var(--text-main-color)",
          }}
        >
          New Password
        </label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control rounded-5"
          id="floatingPassword"
          placeholder="Password"
          style={{
            bordercolor: "var(--text-main-color)",
          }}
          name="ConfirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <label
          htmlFor="floatingPassword"
          style={{
            color: "var(--text-main-color)",
          }}
        >
          ConfirmPassword
        </label>
      </div>
      <Link
        onClick={(e) => {
          handleSubmit(e);
        }}
        style={{
          backgroundColor: "var(--main-color)",
          height: "100px",
          width: "100px",
        }}
        className="mx-auto mt-4 text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
      >
        Confirm
      </Link>
    </div>
  );
};

export default ResetPassword;
