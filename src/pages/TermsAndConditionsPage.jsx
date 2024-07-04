import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import LoadingSuspese from "../Components/LoadingSuspense";
import { toastError } from "../utils/ToastsFunctions";

const TermsAndConditionsPage = () => {
  const [t, i18n] = useTranslation();

  const [TermsAndConditions, setTermsAndConditions] = useState(null);

  useEffect(() => {
    axios
      .get("https://attachin.com/api/staticPages/1")
      .then((res) => {
        // console.log(res.data.data);
        setTermsAndConditions([res.data.data]);
      })
      .catch((err) => {
        console.log(err);
        toastError("Network Error");
      });
  }, []);

  return (
    <section className="min-vh-100 mb-5">
      {/* Header Title */}
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("Terms & Conditions")}
      </h1>
      <hr />

      {/* Custom Accordion */}
      {TermsAndConditions ? (
        <div
          className="accordion accordion-flush mx-auto ms-sm-5 col-11"
          id="accordionFlushExample"
        >
          {TermsAndConditions &&
            TermsAndConditions.map((section) => (
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
                    data-bs-target={`#section-${section.id}`}
                    aria-expanded="false"
                    aria-controls={`#section-${section.id}`}
                    // dangerouslySetInnerHTML={{__html}}
                  >
                    {i18n.language === "ar" ? section.name_ar : section.name_en}
                  </button>
                </h2>
                <div
                  id={`section-${section.id}`}
                  className="accordion-collapse collapse"
                  // data-bs-parent="#accordionFlushExample"
                >
                  <div
                    className="accordion-body dir"
                    dangerouslySetInnerHTML={{
                      __html:
                        i18n.language === "ar"
                          ? section.content_ar
                          : section.content_en,
                    }}
                  >
                    {/* {i18n.language === "ar"
                      ? section.content_ar
                      : section.content_en} */}
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

export default memo(TermsAndConditionsPage);
