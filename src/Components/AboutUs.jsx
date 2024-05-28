import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import LoadingSuspese from "./LoadingSuspense";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const [t, i18n] = useTranslation();

  const [aboutUs, setAboutUs] = useState(null);

  useEffect(() => {
    axios.get("https://attachin.com/api/staticPages").then((res) => {
      // console.log(res.data.data.static_pages);
      setAboutUs(res.data.data.static_pages);
    });
  }, []);

  return (
    <section className="min-vh-100 mb-5">
      {/* Header Title */}
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("About")}
      </h1>
      <hr />

      {/* Custom Accordion */}
      {aboutUs ? (
        <div
          className="accordion accordion-flush mx-auto ms-sm-5 col-11"
          id="accordionFlushExample"
        >
          {aboutUs &&
            aboutUs.map((section) => (
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
                  >
                    {i18n.language === "ar" ? section.name_ar : section.name_en}
                  </button>
                </h2>
                <div
                  id={`section-${section.id}`}
                  className="accordion-collapse collapse"
                  // data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body dir">
                    {i18n.language === "ar"
                      ? section.content_ar
                      : section.content_en}
                  </div>
                </div>
              </div>
            ))}
          {/* <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed py-2 rounded-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Accordion Item #2
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            // data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> class. This is the
              second item's accordion body. Let's imagine this being filled with
              some actual content.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed py-2 rounded-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Accordion Item #3
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            // data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> class. This is the
              third item's accordion body. Nothing more exciting happening here
              in terms of content, but just filling up the space to make it
              look, at least at first glance, a bit more representative of how
              this would look in a real-world application.
            </div>
          </div>
        </div> */}
        </div>
      ) : (
        <LoadingSuspese />
        // <p className="card-text placeholder-glow">
        //   <span className="placeholder col-7" />
        //   <span className="placeholder col-4" />
        //   <span className="placeholder col-4" />
        //   <span className="placeholder col-6" />
        //   <span className="placeholder col-8" />
        //   <br />
        //   <span className="placeholder col-10" />
        //   <br />
        //   <span className="placeholder col-6" />
        //   <br />
        //   <span className="placeholder col-2" />
        // </p>
      )}
    </section>
  );
};

export default AboutUs;
