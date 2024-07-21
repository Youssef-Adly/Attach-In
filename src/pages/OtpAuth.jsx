import React from "react";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const OtpAuth = () => {
  return (
    <section
      // style={{  background: "url(/otp.svg)" }}
      className="offWhiteBgColor position-relative"
    >
      <img src="/otp.svg" alt="otp" className="img-fluid mt-5 mt-sm-0 w-100" />
      <div
        className="text-dark position-absolute top-0"
        // onClick={loginAsGuest}
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
        className="col-8 col-sm-6 col-md-4 col-xl-3 position-absolute top-0 start-50 translate-middle-x"
        style={{
          marginTop: "40vw",
          // marginTop: "45vw",
        }}
      >
        <input
          type="number"
          className="form-control text-center"
          placeholder="OTP Number"
          max={"9999"}
          min={"1"}
          // id="inputPassword6"
        />
      </div>
      <div
        className="d-flex flex-column flex-sm-row secBgColor justify-content-center align-items-center gap-5 position-relative"
        style={{
          position: "absolute",
          bottom: "650px",
          width: "100%",
        }}
      >
        <div
          className="offWhiteBgColor rounded-pill col-3 py-3 text-center d-flex align-items-center justify-content-center"
          style={{
            cursor: "pointer",
          }}
        >
          <h4>
            Enter Your <br /> Confirmation Code <br />
            From Your Mail
          </h4>
        </div>
        <div
          className="offWhiteBgColor rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "150px",
            height: "150px",
            cursor: "pointer",
          }}
        >
          <h3>Verify</h3>
        </div>
      </div>

      <Footer classes={"secBgColor"} />
    </section>
  );
};

export default OtpAuth;
