import React, { useState } from "react";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/actions/authActions";
import ErrorMessage from "../Components/ErrorMessage";
import LoadingSuspese from "../Components/LoadingSuspense";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// yup Schema
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email can't be empty"),
    password: yup
      .string()
      .min(6, "Password should be more than 6 characters")
      .required("Password can't be empty"),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.Auth.error);
  const [t] = useTranslation();
  const [loginForm, setLoginForm] = useState(false);
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [FormErrors, setFormErrors] = useState(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting /* , isValid, isLoading, isValidating */,
    },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // const handleChange = (e) => {
  //   setUserLogin((old) => ({ ...old, [e.target.name]: e.target.value }));
  //   // console.log(userLogin);
  // };

  const handleLogin = (data) => {
    console.log("data: ", data);
    setLoading(true);
    setFormErrors(null);

    dispatch(login(data)).then((res) => {
      console.log(res);
      if (res.error?.message !== "Rejected") {
        navigate("/home");
      } else {
        setFormErrors(res.payload);
        // console.log("res.payload: ", res.payload);
        getErrorsFromAPI(res.payload);
      }
      setLoading(false);
    });
    // console.log(data);
  };

  // To Show Api Errors In View
  const getErrorsFromAPI = (err) => {
    let errorsArr = [];
    for (let i = 0; i < Object.entries(err).length; i++) {
      if (Object.entries(err)[i][1].isError) {
        // console.log({
        //   [Object.entries(err)[i][0]]: err[Object.entries(err)[i][0]],
        // });
        errorsArr.push({
          [Object.entries(err)[i][0]]: err[Object.entries(err)[i][0]],
        });
      }
    }
    console.log("errorsArr: ", errorsArr);
    setFormErrors([...errorsArr]);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--sec-color)",
        minHeight: "100vh",
      }}
      className="d-flex flex-column align-items-end position-relative"
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
        className="d-flex flex-column justify-content-lg-end justify-content-center align-items-center"
      >
        <img
          src="AttachInLogo.svg"
          alt=""
          className="img-fluid"
          style={{
            marginTop: "880px",
          }}
        />
        {/*  */}
        <div
          className={`my-4 flex-column flex-sm-row gap-sm-5 gap-3 ${
            loginForm ? "d-none" : "d-flex"
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
              setLoginForm(true);
            }}
            style={{
              backgroundColor: "var(--main-color)",
              height: "100px",
              width: "100px",
            }}
            className="text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
          >
            {t("Login")}
          </Link>
        </div>
        {/* Login Form */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className={`my-4 col-10 flex-column flex-lg-row justify-content-center align-items-center  gap-sm-5 gap-3 ${
            loginForm ? "d-flex" : "d-none"
          }`}
        >
          <div className="col-12 col-md-7 col-lg-5">
            {/* Email */}
            <div className="form-floating my-3">
              <input
                type="text"
                disabled={isSubmitting}
                className={
                  errors.email
                    ? "border border-1 border-danger form-control rounded-5"
                    : "form-control rounded-5"
                }
                {...register("email")}
                id="floatingInput"
                placeholder="name@example.com"
                style={{
                  bordercolor: "var(--text-main-color)",
                }}
                name="email"
                // onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="floatingInput"
                style={{ color: "var(--text-main-color)" }}
              >
                Email
              </label>
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
              {FormErrors
                ? FormErrors.map((err, idx) => {
                    // console.log(Object.entries(err)[0][0]);
                    return Object.entries(err)[0][0] === "email" ? (
                      <ErrorMessage key={idx}>
                        {Object.entries(err)[0][1]?.message}
                      </ErrorMessage>
                    ) : (
                      ""
                    );
                  })
                : ""}
            </div>
            {/* Password */}
            <div className="form-floating">
              <input
                type="password"
                disabled={isSubmitting}
                className={
                  errors.password
                    ? "border border-1 border-danger form-control rounded-5"
                    : "form-control rounded-5"
                }
                {...register("password")}
                id="floatingPassword"
                placeholder="Password"
                style={{
                  bordercolor: "var(--text-main-color)",
                }}
                name="password"
                // onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="floatingPassword"
                style={{
                  color: "var(--text-main-color)",
                }}
              >
                Password
              </label>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
              {FormErrors
                ? FormErrors.map((err, idx) => {
                    // console.log(Object.entries(err)[0][0]);
                    return Object.entries(err)[0][0] === "password" ? (
                      <ErrorMessage key={idx}>
                        {Object.entries(err)[0][1]?.message}
                      </ErrorMessage>
                    ) : (
                      ""
                    );
                  })
                : ""}
              {/* Extra Validation Messages From Api */}
              {/* <div className="d-flex flex-column gap-1 justify-content-center align-items-center">
                {FormErrors
                  ? FormErrors.map((err, idx) => (
                      <ErrorMessage key={idx}>
                        {Object.entries(err)[0][1]?.message}
                      </ErrorMessage>
                    ))
                  : ""}
              </div> */}
            </div>
          </div>
          {!loading ? (
            <button
              // to={"/login"}Link
              onClick={(e) => {
                handleSubmit(e);
              }}
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: "var(--main-color)",
                height: "100px",
                width: "100px",
                border: "none",
              }}
              className="text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
            >
              Login
            </button>
          ) : (
            <LoadingSuspese />
          )}
        </form>
        {/* Footer */}
        <div
          className="col-12 d-none d-lg-block g-0 mt-5 rounded-2 "
          style={{ backgroundColor: "var(--sec-color)" }}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Login;
