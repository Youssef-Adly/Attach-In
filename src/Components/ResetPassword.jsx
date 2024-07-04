import React, { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../Components/ErrorMessage";
import LoadingSuspese from "../Components/LoadingSuspense";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  showLoadingToast,
  toastError,
  updateSuccess,
} from "../utils/ToastsFunctions";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();

  const user = useSelector((state) => state.Auth.user);
  const [loading, setLoading] = useState(false);
  // yup Schema
  const schema = yup
    .object({
      current_password: yup
        .string()
        .min(6, "Password should be more than 6 characters")
        .required("current password can't be empty"),
      new_password: yup
        .string()
        .min(6, "Password should be more than 6 characters")
        .required("new password can't be empty"),
      confirmPassword: yup
        .string()
        .required("confirm Password can't be empty")
        .oneOf([yup.ref("new_password"), null], "Passwords must match"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const handleForgetPassword = async (data) => {
    let toastID = showLoadingToast("Changing Password.....");
    setLoading(true);
    await axios
      .post(
        "https://attachin.com/api/changePasswordFromSettingPage",
        {
          // emailorphone: user.email,
          // language: "ar",
          new_password: data.new_password,
          current_password: data.current_password,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        // console.log(res);
        updateSuccess(toastID, " Password Changed Successfully");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        toastError("Network Error");
        setLoading(false);
      });
  };

  return (
    <form
      className="col-10 mx-auto d-flex flex-column gap-4 mt-4 justify-content-center"
      onSubmit={handleSubmit(handleForgetPassword)}
      disabled={isSubmitting}
    >
      <div className="d-flex align-items-center gap-4">
        <Link
          onClick={(e) => {
            navigate(-1);
          }}
        >
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            fontSize={27}
            style={{
              color: "var(--text-main-color)",
              marginBottom: "7px",
            }}
          />
        </Link>
        <h1 style={{ color: "var(--text-main-color)" }}>
          {t("Reset Password")}
        </h1>
      </div>
      <hr />
      <div className="form-floating">
        <input
          type="password"
          id="floatingInput"
          placeholder="name@example.com"
          style={{
            bordercolor: "var(--text-main-color)",
          }}
          name="CurrentPassword"
          className={
            errors.current_password
              ? "border border-1 border-danger form-control rounded-5"
              : "form-control rounded-5"
          }
          {...register("current_password")}
        />
        <label
          htmlFor="floatingInput"
          style={{ color: "var(--text-main-color)" }}
        >
          Current Password
        </label>
        <ErrorMessage>{errors.current_password?.message}</ErrorMessage>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className={
            errors.new_password
              ? "border border-1 border-danger form-control rounded-5"
              : "form-control rounded-5"
          }
          {...register("new_password")}
          id="floatingPassword"
          placeholder="Password"
          style={{
            bordercolor: "var(--text-main-color)",
          }}
          name="new_password"
        />
        <label
          htmlFor="floatingPassword"
          style={{
            color: "var(--text-main-color)",
          }}
        >
          New Password
        </label>
        <ErrorMessage>{errors.new_password?.message}</ErrorMessage>
      </div>
      <div className="form-floating">
        <input
          type="password"
          id="floatingPassword"
          placeholder="Password"
          className={
            errors.confirmPassword
              ? "border border-1 border-danger form-control rounded-5"
              : "form-control rounded-5"
          }
          {...register("confirmPassword")}
          style={{
            bordercolor: "var(--text-main-color)",
          }}
          name="confirmPassword"
        />
        <label
          htmlFor="floatingPassword"
          style={{
            color: "var(--text-main-color)",
          }}
        >
          ConfirmPassword
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
          Confirm
        </button>
      ) : (
        <LoadingSuspese />
      )}
    </form>
  );
};

export default memo(ResetPassword);
