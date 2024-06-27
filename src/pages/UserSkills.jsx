import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSuspese from "../Components/LoadingSuspense";

const UserSkills = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.Auth.user);
  const baseURL = "https://attachin.com/";
  let [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .post(
        baseURL + "api/userInfo",
        { for_user_id: id },
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      )
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, authUser.token]);

  return (
    <>
      <div className="d-flex align-items-center gap-4">
        <Link
          onClick={() => {
            navigate(-1);
          }}
        >
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            fontSize={27}
            style={{
              color: "var(--text-main-color)",
              marginBottom: "7px",
            }}
          />
        </Link>
        <h1 style={{ color: "var(--text-main-color)" }}>
          Skills and Certifications
        </h1>
      </div>
      <hr />
      {/*  */}
      {user ? (
        <div className="d-flex gap-3 justify-content-around align-items-center flex-wrap">
          {/* skills */}
          {user.skills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 d-flex justify-content-center flex-column align-items-center text-center mx-2"
              style={{
                backgroundColor: "#98AFDB",
                width: "270px",
                height: "200px",
                borderRadius: "40%",
              }}
            >
              <img
                src="/cheerIcon2.svg"
                alt="cheerIcon2.svg"
                className="w-75"
              />
              <h2 className="text-center mt-2">{skill.title}</h2>
            </div>
          ))}

          {/* certifications */}
          {user.certifications.map((cert) => (
            <div
              key={cert.id}
              className="position-relative p-3 d-flex justify-content-center flex-column align-items-center text-center mx-2"
              style={{
                backgroundColor: "#F2969C",
                width: "270px",
                height: "200px",
                borderRadius: "40%",
              }}
            >
              <div className="position-absolute bottom-0">
                <svg
                  width={40}
                  height={60}
                  viewBox="0 0 46 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43.726 53.3071L35.6831 50.6757L31.2054 57.8485L26.3457 44.5427C30.9932 43.7787 35.1101 41.5717 38.3358 38.4521L43.726 53.3071Z"
                    fill="#EE6F5C"
                  />
                  <path
                    d="M19.0226 44.5427L14.1629 57.8485L9.68521 50.6757L1.62109 53.3071L7.01132 38.4521C10.2158 41.5717 14.3751 43.7787 19.0226 44.5427Z"
                    fill="#EE6F5C"
                  />
                  <path
                    d="M45.0603 22.4726C45.0603 34.8446 35.0438 44.8611 22.6718 44.8611C10.2997 44.8611 0.283203 34.8446 0.283203 22.4726C0.283203 10.1005 10.2997 0.084018 22.6718 0.084018C35.0438 0.0627966 45.0603 10.1005 45.0603 22.4726Z"
                    fill="#F9B74C"
                  />
                  <path
                    d="M22.6711 39.8734C13.079 39.8734 5.26953 32.0639 5.26953 22.4718C5.26953 12.8798 13.079 5.07031 22.6711 5.07031C32.2631 5.07031 40.0726 12.8798 40.0726 22.4718C40.0726 32.0639 32.2631 39.8734 22.6711 39.8734Z"
                    fill="#FFD25F"
                  />
                </svg>
              </div>
              <div
                className="bg-body-secondary d-flex align-items-center justify-content-center"
                style={{
                  borderRadius: "40%",
                  width: "90%",
                  height: "90%",
                }}
              >
                <h3 className="text-center">{cert.title}</h3>
              </div>
            </div>
          ))}

          {/* experiences */}
          {user.experiences.map((experience) => (
            <div
              key={experience.id}
              className="p-5 d-flex justify-content-center flex-column align-items-center text-center mx-2"
              style={{
                backgroundColor: "#98AFDB",
                width: "270px",
                height: "200px",
                borderRadius: "40%",
              }}
            >
              <img
                src="/cheerIcon2.svg"
                alt="cheerIcon2.svg"
                className="w-75"
              />
              <h2 className="text-center mt-2">{experience.title}</h2>
            </div>
          ))}

          {/* interests */}
          {user.interests.map((interest) => (
            <div
              key={interest.id}
              className="position-relative p-3 d-flex justify-content-center flex-column align-items-center text-center mx-2"
              style={{
                backgroundColor: "#F2969C",
                width: "270px",
                height: "200px",
                borderRadius: "40%",
              }}
            >
              <div className="position-absolute bottom-0">
                <svg
                  width={40}
                  height={60}
                  viewBox="0 0 46 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43.726 53.3071L35.6831 50.6757L31.2054 57.8485L26.3457 44.5427C30.9932 43.7787 35.1101 41.5717 38.3358 38.4521L43.726 53.3071Z"
                    fill="#EE6F5C"
                  />
                  <path
                    d="M19.0226 44.5427L14.1629 57.8485L9.68521 50.6757L1.62109 53.3071L7.01132 38.4521C10.2158 41.5717 14.3751 43.7787 19.0226 44.5427Z"
                    fill="#EE6F5C"
                  />
                  <path
                    d="M45.0603 22.4726C45.0603 34.8446 35.0438 44.8611 22.6718 44.8611C10.2997 44.8611 0.283203 34.8446 0.283203 22.4726C0.283203 10.1005 10.2997 0.084018 22.6718 0.084018C35.0438 0.0627966 45.0603 10.1005 45.0603 22.4726Z"
                    fill="#F9B74C"
                  />
                  <path
                    d="M22.6711 39.8734C13.079 39.8734 5.26953 32.0639 5.26953 22.4718C5.26953 12.8798 13.079 5.07031 22.6711 5.07031C32.2631 5.07031 40.0726 12.8798 40.0726 22.4718C40.0726 32.0639 32.2631 39.8734 22.6711 39.8734Z"
                    fill="#FFD25F"
                  />
                </svg>
              </div>
              <div
                className="bg-body-secondary d-flex align-items-center justify-content-center"
                style={{
                  borderRadius: "40%",
                  width: "90%",
                  height: "90%",
                }}
              >
                <h3 className="text-center">{interest.title}</h3>
              </div>
            </div>
          ))}

          {(user.skills.length > 0) |
          (user.certifications.length > 0) |
          (user.experiences.length > 0) |
          (user.interests.length > 0) ? (
            ""
          ) : (
            <h3 className="display-5">No Skills Yet</h3>
          )}
        </div>
      ) : (
        <LoadingSuspese />
      )}
    </>
  );
};

export default UserSkills;
