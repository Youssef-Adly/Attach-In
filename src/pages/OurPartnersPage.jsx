import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LoadingSuspese from "../Components/LoadingSuspense";
import { toastError } from "../utils/ToastsFunctions";

const OurPartnersPage = () => {
  const [t] = useTranslation();
  const [OurPartners, setOurPartners] = useState(null);
  const baseURL = "https://attachin.com/";

  useEffect(() => {
    axios
      .get("https://attachin.com/api/getOurPartners")
      .then((res) => {
        // console.log(res.data.data.partners);
        setOurPartners(res.data.data.partners.reverse());
      })
      .catch((err) => {
        console.log(err);
        toastError("Network Error");
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
            className="d-flex flex-wrap justify-content-center align-items-center gap-5 mx-auto ms-sm-5 col-11"
            id="accordionFlushExample"
          >
            {OurPartners &&
              OurPartners.map((partner, idx) => (
                <Link
                  to={"/companyProfile/" + partner.id}
                  className="partnerImg nav-link text-center d-flex flex-column gap-2 align-items-center"
                  style={{ width: "150px", height: "200px" }}
                  key={uuid()}
                >
                  <img
                    src={
                      `${baseURL + partner.profile_photo}` || "companylogo.svg"
                    }
                    // src= "companylogo.svg"
                    className="rounded-circle img-thumbnail"
                    style={{
                      width: "150px",
                      aspectRatio: 1,
                      objectFit: "cover",
                    }}
                    alt={partner.full_name}
                  />
                  <small className="w-75 text-main-color">
                    {partner.full_name}
                  </small>
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

export default memo(OurPartnersPage);
