import React, { memo, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../Components/ErrorMessage";
import LoadingSuspese from "../Components/LoadingSuspense";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  showLoadingToast,
  updateError,
  updateSuccess,
} from "../utils/ToastsFunctions";

// yup Schema
const schema = yup
  .object({
    subject: yup.string().required("subject can't be empty"),
    message: yup.string().required("message can't be empty"),
  })
  .required();

const ContactUs = () => {
  const baseURL = "https://attachin.com/api/";
  const [t] = useTranslation();
  const authUser = useSelector((state) => state.Auth.user);
  const lang = useSelector((state) => state.lang.value);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting /* , isValid, isLoading, isValidating */,
    },
  } = useForm({
    defaultValues: {
      subject: "",
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const handleContactUs = (data) => {
    setLoading(true);
    let toastID = showLoadingToast("Submitting.....");
    axios
      .post(baseURL + "sendContactUsMessageToEmail", data, {
        headers: { Authorization: `Bearer ${authUser.token}` },
      })
      .then((res) => {
        // console.log("res: ", res);
        updateSuccess(toastID, "Sent Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      })
      .catch((err) => {
        updateError(toastID, err.message);
        // toastError("Network Error");
        console.log(err);
      });
  };

  return (
    <>
      {/* Header Title */}
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("Contact Us")}
      </h1>
      <hr />
      <div
        className="accordion accordion-flush mx-auto ms-sm-5 col-11"
        id="accordionFlushExample"
      >
        <div
          className="accordion-item"
          style={{ backgroundColor: "unset !important" }}
        >
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed py-2 rounded-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#section"
              aria-expanded="false"
              aria-controls="#section"
            >
              {lang === "en"
                ? " What is Attach In App"
                : '؟ "Attach In-App"ما هو'}
            </button>
          </h2>
          <div
            id={`section`}
            className="accordion-collapse collapse"
            // data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body dir">
              {lang === "en"
                ? '"Attach In-App" is a social media platform designed for college students. It offers a semi-professional networking environment where users can connect with peers, mentors, and industry professionals, find internships and courses, and share achievements.'
                : "عبارة عن منصة تواصل اجتماعي مصممة لطلاب الجامعات. فهو يوفر بيئة شبكات شبه احترافية حيث يمكن للمستخدمين التواصل مع أقرانهم والموجهين والمتخصصين في هذا المجال، والعثور على التدريب الداخلي والدورات التدريبية، ومشاركة الإنجازات."}
            </div>
          </div>
        </div>
      </div>
      {!loading ? (
        <form
          className="col-10 mx-auto my-5"
          onSubmit={handleSubmit(handleContactUs)}
        >
          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="exampleFormControlInput1"
              placeholder="Subject"
              {...register("subject")}
              style={{
                bordercolor: "var(--text-main-color)",
                backgroundColor: "var(--offWhite-color)",
              }}
            />
            <ErrorMessage>{errors.subject?.message}</ErrorMessage>
          </div>
          <div className="mb-3">
            <textarea
              className="form-control rounded-5"
              id="exampleFormControlTextarea1"
              rows={6}
              placeholder="Write Your Request and will reply on you shortly"
              defaultValue={""}
              {...register("message")}
              style={{
                bordercolor: "var(--text-main-color)",
                backgroundColor: "var(--offWhite-color)",
              }}
            />
            <ErrorMessage>{errors.message?.message}</ErrorMessage>
          </div>
          <input
            type="submit"
            disabled={isSubmitting}
            className="mx-auto border-0 text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
            style={{
              backgroundColor: "var(--main-color)",
              height: "100px",
              width: "100px",
            }}
            value={"Send"}
          />
        </form>
      ) : (
        <LoadingSuspese />
      )}
    </>
  );
};

export default memo(ContactUs);
