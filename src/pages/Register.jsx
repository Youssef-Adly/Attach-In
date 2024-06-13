import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../Components/ErrorMessage";
import LoadingSuspese from "../Components/LoadingSuspense";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerAsStudent } from "../Redux/actions/authActions";
// import { setAuth } from "../Redux/slices/AuthSlice";

// yup Magic Here
//#region
// Add yup Phone Validation
yup.addMethod(
  yup.string,
  "phoneLength",
  function (errorMessage = "Phone number must be 11 digits") {
    return this.test("phoneLength", errorMessage, function (value) {
      return value && value.length === 11 && /^\d+$/.test(value);
    });
  }
);

// yup Schema
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email can't be empty"),
    first_name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "first name must be letters only")
      .required("first name can't be empty"),
    last_name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "last name must be letters only")
      .required("last name can't be empty"),
    phone: yup
      .string()
      .phoneLength()
      .required("You have to enter a valid phone number"),
    university: yup
      .number()
      .typeError("select a university please")
      .required("select a university please"),
    password: yup
      .string()
      .min(6, "Password should be more than 6 characters")
      .required("Password can't be empty"),
    confirmPassword: yup
      .string()
      .required("Confirm Password can't be empty")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

//#endregion

const Register = () => {
  // Component States
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState(null);
  const [FormErrors, setFormErrors] = useState(null);

  // Redux Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const apiErrors = useSelector((state) => state.Auth.error);
  const lang = useSelector((state) => state.lang.value);
  // const user = useSelector((state) => state.Auth.user);

  // Resets User For Debuging
  // console.log("user: ", user);
  // dispatch(setAuth(null));

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting /* , isValid, isLoading, isValidating */,
    },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      university: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    axios.get("https://attachin.com/api/getUniversities").then((res) => {
      setUniversities(res.data.data.universities);
    });
  }, []);

  // Form Submition Logic
  const onSubmit = (data) => {
    // Submition in Progress
    setLoading(true);
    setFormErrors(null);
    // Destructure password before submission (optional)
    const { confirmPassword, ...formData } = data;
    // Handle form submission logic here
    console.log("formData: ", formData);
    dispatch(registerAsStudent(formData)).then((res) => {
      if (res.error?.message !== "Rejected") {
        navigate("/home");
      } else {
        setFormErrors(res.payload);
        // console.log("res.payload: ", res.payload);
        getErrorsFromAPI(res.payload);
      }
      setLoading(false);
    });
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
        backgroundColor: "var(--offWhite-color)",
        minHeight: "100vh",
      }}
      className="d-flex flex-column position-relative"
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
          style={{
            backgroundColor: "#eee",
            padding: "25px",
            borderRadius: "10px 40px",
          }}
        />
        {/*  */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="col-9 col-md-7 col-lg-5 col-xxl-3"
        >
          {/* first name */}
          <div className="form-floating my-3">
            <input
              type="text"
              className={
                errors.first_name
                  ? "border border-1 border-danger form-control rounded-5"
                  : "form-control rounded-5"
              }
              {...register("first_name")}
              disabled={isSubmitting}
              id="floatingInput"
              placeholder="john Doe"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="first_name"
              // onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingInput"
              style={{ color: "var(--text-main-color)" }}
            >
              First Name
            </label>
            <ErrorMessage>{errors.first_name?.message}</ErrorMessage>
          </div>
          {/* last name */}
          <div className="form-floating my-3">
            <input
              type="text"
              className={
                errors.last_name
                  ? "border border-1 border-danger form-control rounded-5"
                  : "form-control rounded-5"
              }
              id="floatingInput2"
              placeholder="john Doe"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="last_name"
              // onChange={(e) => handleChange(e)}
              {...register("last_name")}
            />
            <label
              htmlFor="floatingInput2"
              style={{ color: "var(--text-main-color)" }}
            >
              Last Name
            </label>
            <ErrorMessage>{errors.last_name?.message}</ErrorMessage>
          </div>
          {/* phone */}
          <div className="form-floating my-3">
            <input
              type="number"
              className={
                errors.phone
                  ? "border border-1 border-danger form-control rounded-5"
                  : "form-control rounded-5"
              }
              id="floatingInput3"
              placeholder="0123456879"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="phone"
              // onChange={(e) => handleChange(e)}
              {...register("phone")}
            />
            <label
              htmlFor="floatingInput3"
              style={{ color: "var(--text-main-color)" }}
            >
              Mobile Number
            </label>
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
            {/* API Validations */}
            {FormErrors
              ? FormErrors.map((err, idx) => {
                  // console.log(Object.entries(err)[0][0]);
                  return Object.entries(err)[0][0] === "phone" ? (
                    <ErrorMessage key={idx}>
                      {Object.entries(err)[0][1]?.message}
                    </ErrorMessage>
                  ) : (
                    ""
                  );
                })
              : ""}
          </div>
          {/* University */}
          <div className="form-floating my-3">
            <select
              className={
                errors.first_name
                  ? "border border-1 border-danger form-select rounded-5"
                  : "form-select rounded-5"
              }
              {...register("university")}
              disabled={isSubmitting}
              id="university"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              defaultValue={""}
              name="university"
              // onChange={(e) => handleChange(e)}
            >
              <option
                value={""}
                disabled
                style={{ color: "var(--text-main-color)" }}
              >
                Choose a University
              </option>
              {universities &&
                universities.map((university) => (
                  <option
                    value={university.id}
                    key={university.id}
                    style={{ color: "var(--text-main-color)" }}
                  >
                    {lang === "en" ? university.name_en : university.name_ar}
                  </option>
                ))}
            </select>
            <label htmlFor="university">University</label>
            <ErrorMessage>{errors.university?.message}</ErrorMessage>
          </div>
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
              id="floatingInput5"
              placeholder="example@email.com"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="email"
              // onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingInput5"
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
          {/* password */}
          <div className="form-floating my-3">
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
          </div>
          {/* Confirm Password */}
          <div className="form-floating my-3">
            <input
              type="password"
              disabled={isSubmitting}
              className={
                errors.confirmPassword
                  ? "border border-1 border-danger form-control rounded-5"
                  : "form-control rounded-5"
              }
              {...register("confirmPassword")}
              id="floatingPassword2"
              placeholder="Confirm Password"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="confirmPassword"
              // onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingPassword2"
              style={{
                color: "var(--text-main-color)",
              }}
            >
              Confirm Password
            </label>
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          </div>
          {/* Submit */}
          {!loading ? (
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: "var(--main-color)",
                height: "100px",
                width: "100px",
                border: "none",
              }}
              className="regbtn mx-auto mb-5 text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
            >
              Let's Go
            </button>
          ) : (
            <LoadingSuspese />
          )}
        </form>
      </div>
      {/* Footer */}
      <div className="col-12 d-none d-md-block">
        <Footer />
      </div>
    </div>
  );
};

export default Register;
