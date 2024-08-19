import React, { memo, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./otpAuth.css";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoadingToast,
  toastInfo,
  updateError,
  updateSuccess,
} from "../utils/ToastsFunctions";
import axios from "axios";
import { setActive } from "../Redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const OtpAuth = () => {
  const apiURL = "https://attachin.com/api/";
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (otp.length > 3) {
      // console.log(otp);
      setLoading(true);
      let toastID = showLoadingToast("Verifying");
      await axios
        .post(apiURL + "checkValidationCode", {
          emailorphone: user.email,
          language: "ar",
          code: otp,
        })
        .then((res) => {
          // console.log(res);
          updateSuccess(toastID, "Email Verified");
          dispatch(setActive());
          navigate("/home");
        })
        .catch((err) => {
          console.log("err: ", err);
          setLoading(false);
          updateError(toastID, err.response.data.errors[0]);
        });
    } else {
      toastInfo("otp Must Be 4 Numbers", { theme: "light" });
    }
  };

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section
      data-bs-theme="light"
      className="offWhiteBgColor position-relative"
      style={{
        userSelect: "none",
      }}
    >
      <img
        className="img-fluid mt-5 mt-sm-0 w-100 offWhiteBgColor"
        src="/otp.svg"
        alt="otp"
      />
      <div
        className="text-dark position-absolute top-0"
        onClick={() => navigate("/")}
        style={{
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon
          icon={faXmark}
          fontSize={50}
          className="position-absolute start-0 p-4"
        />
      </div>
      <div
        className="marginSmall col-8 col-sm-6 col-md-4 col-xl-3 position-absolute top-0 start-50 translate-middle-x"
        style={{
          marginTop: "40vw",
          // marginTop: "45vw",
        }}
      >
        <input
          type="text"
          className="form-control text-center"
          placeholder="OTP Number"
          max={"9999"}
          min={"1"}
          id="otpNumber"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div
        className="btnContainer d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3"
        style={{
          position: "absolute",
          bottom: "500px",
          width: "100%",
        }}
      >
        <div
          className="offWhiteBgColor rounded-pill p-3 text-center d-flex align-items-center justify-content-center"
          style={{
            cursor: "pointer",
            // height: "100px",
            // width: "100px",
          }}
          htmlFor="otpNumber"
        >
          <h4
            style={{
              color: "var(--text-main-color)",
            }}
          >
            Enter Your <br /> Confirmation Code <br />
            From Your Mail
          </h4>
        </div>
        {!loading ? (
          <div
            className="h3 offWhiteBgColor rounded-circle d-flex align-items-center justify-content-center mb-0"
            style={{
              width: "100px",
              height: "100px",
              cursor: "pointer",
              color: "var(--text-main-color)",
            }}
            onClick={handleSubmit}
          >
            Verify
          </div>
        ) : (
          <img src="/Opener Loading.gif" className="w-25" alt="Loading" />
        )}
      </div>

      <Footer classes={"secBgColor d-none d-sm-block"} />
    </section>
  );
};

export default memo(OtpAuth);
