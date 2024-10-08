import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import LoadingSuspese from "../Components/LoadingSuspense";
import { useTranslation } from "react-i18next";
import { toastError } from "../utils/ToastsFunctions";

const FQAPage = () => {
  const [t, i18n] = useTranslation();
  const [FAQ, setFAQ] = useState(null);

  useEffect(() => {
    axios
      .get("https://attachin.com/api/FAQ")
      .then((res) => {
        // console.log(res.data.data.FAQ);
        setFAQ(res.data.data.FAQ);
      })
      .catch((err) => {
        toastError("Network Error");
        console.log(err);
      });
  }, []);

  return (
    <section className="min-vh-100 mb-5">
      {/* Header Title */}
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("FAQ")}
      </h1>
      <hr />

      {/* Custom Accordion */}
      {FAQ ? (
        <div
          className="accordion accordion-flush mx-auto ms-sm-5 col-11"
          id="accordionFlushExample"
        >
          {FAQ &&
            FAQ.map((section, idx) => (
              <div
                className="accordion-item"
                style={{ backgroundColor: "unset !important" }}
                key={uuid()}
              >
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed py-2 rounded-5"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#section-${idx}`}
                    aria-expanded="false"
                    aria-controls={`#section-${idx}`}
                  >
                    {i18n.language === "ar"
                      ? section.question_ar
                      : section.question_en}
                  </button>
                </h2>
                <div
                  id={`section-${idx}`}
                  className="accordion-collapse collapse"
                  // data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body dir">
                    {i18n.language === "ar"
                      ? section.answer_ar
                      : section.answer_en}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <LoadingSuspese />
      )}
    </section>
  );
};

export default memo(FQAPage);
