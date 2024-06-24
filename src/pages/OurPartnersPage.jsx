import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LoadingSuspese from "../Components/LoadingSuspense";

const OurPartnersPage = () => {
  const [t] = useTranslation();
  const [OurPartners, setOurPartners] = useState(null);
  const baseURL = "https://attachin.com/";

  useEffect(() => {
    axios.get("https://attachin.com/api/getOurPartners").then((res) => {
      // console.log(res.data.data.partners);
      setOurPartners(res.data.data.partners);
    });
  }, []);
  return (
    <>
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
              OurPartners.map((partner, idx) => (
                <Link
                  to={"/companyProfile/" + partner.id}
                  className="nav-link text-center d-flex flex-column gap-2"
                  // style={{ backgroundColor: "unset !important" }}
                  key={uuid()}
                >
                  <img
                    src={
                      `${baseURL + partner.profile_photo}` || "companylogo.svg"
                    }
                    // src= "companylogo.svg"
                    className="rounded-circle"
                    style={{
                      maxWidth: "150px",
                    }}
                    alt={partner.full_name}
                  />
                  <small>{partner.full_name}</small>
                </Link>
              ))}
          </div>
        ) : (
          <LoadingSuspese />
        )}
      </section>
    </>
  );
};

export default OurPartnersPage;
