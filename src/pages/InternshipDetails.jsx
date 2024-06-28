import React, { useEffect, useState } from "react";
import LoadingSuspese from "../Components/LoadingSuspense";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";

const InternshipDetails = () => {
  const [t] = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = "https://attachin.com/api/";
  const baseImgURL = "https://attachin.com/";
  const authUser = useSelector((state) => state.Auth.user);
  let [loading, setLoading] = useState(false);
  let [internship, setInternship] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "getInternshipDetailsByInternshipId?internship_id=" + id)
      .then((res) => {
        // console.log(res);
        setInternship(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    setLoading(true);
    await axios
      .post(
        baseURL + "addCompanyInternshipApplyRequest",
        {
          internship_id: id,
        },
        { headers: { Authorization: `Bearer ${authUser.token}` } }
      )
      .then((res) => {
        // console.log(res);
        // setLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <h1 style={{ color: "var(--text-main-color)" }}>{t("Internships")}</h1>
      <hr />
      {/* <!-- Nav tabs --> */}
      <ul
        className="nav nav-tabs row-cols-auto pt-2 mb-5 rounded-top-4 courses"
        style={{
          backgroundcolor: "var(--main-color)",
          color: "var(--bs-gray-100)",
          // gap: "50px",
          justifyContent: "space-around",
        }}
        id="myTab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link rounded-top-4 active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            <h4>{t("About")}</h4>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link rounded-top-4"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            <h4>{t("Requirements")}</h4>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link rounded-top-4"
            id="messages-tab"
            data-bs-toggle="tab"
            data-bs-target="#messages"
            type="button"
            role="tab"
            aria-controls="messages"
            aria-selected="false"
          >
            <h4 className="">{t("Apply Now")}</h4>
          </button>
        </li>
      </ul>

      {/* <!-- Tab panes --> */}
      {internship ? (
        <div
          className="tab-content"
          style={{
            marginBottom: "30px",
          }}
        >
          <div className="d-flex align-items-center gap-3 ms-4">
            <Link to={"/internships"}>
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                fontSize={27}
                style={{
                  color: "var(--text-main-color)",
                  marginBottom: "5px",
                }}
              />
            </Link>
            <h4 style={{ color: "var(--text-main-color)" }}>
              {t("Back To Internships")}
            </h4>
          </div>
          <hr />
          {/* About */}
          <div
            className="tab-pane active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div
              className="d-flex gap-3 align-content-center px-2 px-sm-5 mb-5"
              style={{ color: "var(--text-main-color)" }}
            >
              <img
                className="avatar-img rounded-circle"
                style={{ width: "100px", height: "100px" }}
                src={
                  internship.user.profile_photo
                    ? `${baseImgURL + internship.user.profile_photo}`
                    : "/profile.png"
                }
                alt="internship img"
              />
              <div className="d-flex flex-column justify-content-center">
                <h3>{internship.user.full_name}</h3>
                <h6 className="ms-1">
                  {internship.department[0].toUpperCase() +
                    internship.department.slice(1)}
                </h6>
              </div>
              {/* {i18n.language === "ar"
                ? Course.description_ar
                : Course.description_en} */}
            </div>
            <p className="col-12 col-sm-9 px-2 px-sm-5 txtColor">
              {internship.description}
              {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex dicta
              autem eaque non natus soluta libero, sunt alias provident minus
              cum facere temporibus nemo iure impedit id. Assumenda obcaecati
              tempore hic aut neque. Corporis, consectetur mollitia eos incidunt
              adipisci nemo aut facilis molestias. Quibusdam tempore molestiae
              ratione omnis officia dolores! */}
            </p>
          </div>
          {/* REQ */}
          <div
            className="tab-pane"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="d-flex px-2 px-sm-5 me-md-5 gap-2 flex-column justify-content-around mb-5">
              {/* <h5>Development</h5> */}
              <h6
                className="p-2 rounded-5"
                style={{
                  width: "fit-content",
                  background: "var(--gray-color)",
                  color: "var(--text-main-color)",
                }}
              >
                {internship.requirements}
              </h6>
              {/* <p
                className="p-3 rounded-5"
                style={{
                  width: "fit-content",
                  background: "var(--gray-color)",
                  color: "var(--text-main-color)",
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
                consequuntur quibusdam iure animi, quas nihil cupiditate
                distinctio officia sunt fugiat. Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Fugit consequuntur quibusdam iure
              </p> */}
              {/*  */}
              {/* <h5>Internship Info</h5>
              <h6
                className="p-2 rounded-5"
                style={{
                  width: "fit-content",
                  background: "var(--gray-color)",
                  color: "var(--text-main-color)",
                }}
              >
                About The Internship
              </h6>
              <p
                className="p-3 rounded-5"
                style={{
                  width: "fit-content",
                  background: "var(--gray-color)",
                  color: "var(--text-main-color)",
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
                consequuntur quibusdam iure animi, quas nihil cupiditate
                distinctio officia sunt fugiat. Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Fugit consequuntur quibusdam iure
              </p> */}
              {/*  */}
              {/* <h5>Responsibilities</h5>
              <h6
                className="p-2 pe-5 rounded-5"
                style={{
                  width: "fit-content",
                  background: "var(--gray-color)",
                  color: "var(--text-main-color)",
                }}
              >
                Responsibilities
              </h6>
              <p
                className="p-3 rounded-5"
                style={{
                  width: "fit-content",
                  background: "var(--gray-color)",
                  color: "var(--text-main-color)",
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
                consequuntur quibusdam iure animi, quas nihil cupiditate
                distinctio officia sunt fugiat. Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Fugit consequuntur quibusdam iure
              </p> */}
              {/*  */}
              {/* <h5>Collage Speciality</h5>
              <h6
                className="p-2 pe-5 rounded-5"
                style={{
                  width: "fit-content",
                  background: "var(--gray-color)",
                  color: "var(--text-main-color)",
                }}
              >
                Accounting section
              </h6> */}
              {/*  */}
              {/* <h5>Requirement year</h5>
              <h6
                className="p-2 pe-5 rounded-5"
                style={{
                  width: "fit-content",
                  background: "var(--gray-color)",
                  color: "var(--text-main-color)",
                }}
              >
                First and second year
              </h6> */}
              {/*  */}
              {/* <h5>Requirement Skills</h5>
              <h6
                className="p-2 pe-5 rounded-5"
                style={{
                  width: "fit-content",
                  background: "var(--gray-color)",
                  color: "var(--text-main-color)",
                }}
              >
                Requirement Skills
              </h6> */}
              {/*  */}
            </div>
          </div>
          {/* Apply */}
          <div
            className="tab-pane"
            id="messages"
            role="tabpanel"
            aria-labelledby="messages-tab"
          >
            <div className="d-flex flex-wrap mb-5 gap-3 justify-content-around align-items-center">
              <div className="col-10 col-sm-5 col-md-4 mx-auto">
                <h1
                  className="p-3 py-2 text-wrap text-center"
                  style={{
                    color: "var(--text-main-color)",
                  }}
                >
                  {t("InternshipSubmit#1")}
                </h1>
                <h5
                  className="px-3 text-wrap text-center"
                  style={{
                    color: "var(--text-main-color)",
                  }}
                >
                  {t("InternshipSubmit#2")}
                </h5>
              </div>
            </div>
            {!loading ? (
              <Link
                // to={"/login"}
                onClick={(e) => {
                  handleSubmit(e);
                }}
                style={{
                  backgroundColor: "var(--main-color)",
                  height: "100px",
                  width: "100px",
                }}
                className="mx-auto my-3 text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
              >
                Confirm
              </Link>
            ) : (
              <LoadingSuspese />
            )}
          </div>
        </div>
      ) : (
        <LoadingSuspese />
      )}
    </>
  );
};

export default InternshipDetails;
