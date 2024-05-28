import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import LoadingSuspese from "./LoadingSuspense";
import { useTranslation } from "react-i18next";

const OurPartners = () => {
  const [t, i18n] = useTranslation();
  const [OurPartners, setOurPartners] = useState(null);

  useEffect(() => {
    axios.get("https://attachin.com/api/getOurPartners").then((res) => {
      // console.log(res.data.data.partners);
      setOurPartners(res.data.data.partners);
      // console.log("res.data.data.partners: ", res.data.data.partners);
    });
  }, []);

  return (
    <section className="min-vh-100 mb-5">
      {/* Header Title */}
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        {t("Our Partners")}
      </h1>
      <hr />

      {/* Custom Accordion */}
      {OurPartners ? (
        <div
          className="d-flex flex-wrap justify-content-center align-items-center  gap-3 mx-auto ms-sm-5 col-11"
          id="accordionFlushExample"
        >
          {OurPartners &&
            OurPartners.map((section, idx) => (
              <div
                // className="accordion-item"
                // style={{ backgroundColor: "unset !important" }}
                key={uuid()}
              >
                <img
                  src="companylogo.svg"
                  className="d-block"
                  alt="companylogo.svg"
                />
              </div>
            ))}
        </div>
      ) : (
        <LoadingSuspese />
      )}
    </section>
  );
};

export default OurPartners;
