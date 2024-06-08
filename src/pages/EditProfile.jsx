import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userReg, setUserReg] = useState({
    certifications: [],
    skills: [],
    interests: [],
    experiences: [],
    language: [],
  });

  const handleChange = (e) => {
    if (
      e.target.name === "profile_cover" ||
      e.target.name === "profile_photo"
    ) {
      setUserReg((old) => ({ ...old, [e.target.name]: e.target.files[0] }));
    } else {
      setUserReg((old) => ({ ...old, [e.target.name]: e.target.value }));
    }
  };

  function hasNonEmptyValues(obj, ...keys) {
    // Check if all keys exist in the object
    if (!keys.every((key) => key in obj)) {
      return false;
    }

    // Check if all values for existing keys are not empty
    return keys.every((key) => {
      const value = obj[key];
      return (
        Boolean(value) &&
        (typeof value !== "object" ||
          (Array.isArray(value) && value.length > 0))
      );
    });
  }

  const handleSubmit = (e) => {
    // Requird Inputs
    // first_name . last_name . email . phone . /* password */ .
    // language . governorate . collage . university
    let valid = hasNonEmptyValues(
      userReg,
      "first_name",
      "last_name",
      "email",
      "phone",
      "language",
      "governorate",
      "collage",
      "profile_university_id"
    );
    console.log("valid: ", valid);
    console.log(userReg);
  };

  // Adding Dynamic Inputs
  //////////////////////////////////////////////////////////////////////////////
  //#region
  //////////////////// userCert ////////////////////
  //#region
  const [userCert, setUserCert] = useState("");
  const certInput = useRef();

  const handleDeleteCert = (index) => {
    const newArray = [...userReg.certifications];
    newArray.splice(index, 1);
    setUserReg((old) => ({
      ...old,
      certifications: newArray,
    }));
  };

  const handleAddCert = (e) => {
    setUserReg((old) => ({
      ...old,
      certifications: [...userReg.certifications, userCert],
    }));
    certInput.current.value = "";
  };

  const handleChangeCert = (event, index) => {
    let { value } = event.target;
    setUserCert(value);
    // console.log("value: ", value);
  };
  //#endregion

  //////////////////// userSkill ////////////////////
  //#region
  const [userSkill, setUserSkill] = useState("");
  const skillInput = useRef();

  const handleDeleteSkill = (index) => {
    const newArray = [...userReg.skills];
    newArray.splice(index, 1);
    setUserReg((old) => ({
      ...old,
      skills: newArray,
    }));
  };

  const handleAddSkill = (e) => {
    setUserReg((old) => ({
      ...old,
      skills: [...userReg.skills, userSkill],
    }));
    skillInput.current.value = "";
  };

  const handleChangeSkill = (event) => {
    let { value } = event.target;
    setUserSkill(value);
    // console.log("value: ", value);
  };
  //#endregion

  /////////////////// userInterest /////////////////////
  //#region
  const [userInterest, setUserInterest] = useState("");
  const interestInput = useRef();

  const handleDeleteInterest = (index) => {
    const newArray = [...userReg.interests];
    newArray.splice(index, 1);
    setUserReg((old) => ({
      ...old,
      interests: newArray,
    }));
  };

  const handleAddInterest = (e) => {
    setUserReg((old) => ({
      ...old,
      interests: [...userReg.interests, userInterest],
    }));
    interestInput.current.value = "";
  };

  const handleChangeInterest = (event) => {
    let { value } = event.target;
    setUserInterest(value);
    // console.log("value: ", value);
  };
  //#endregion

  /////////////////UserLanguage///////////////////////
  //#region
  const [userLang, setUserLang] = useState("");
  const LangInput = useRef();

  const handleDeleteLang = (index) => {
    const newArray = [...userReg.language];
    newArray.splice(index, 1);
    setUserReg((old) => ({
      ...old,
      language: newArray,
    }));
  };

  const handleAddLang = (e) => {
    setUserReg((old) => ({
      ...old,
      language: [...userReg.language, userLang],
    }));
    LangInput.current.value = "";
  };

  const handleChangeLang = (event) => {
    let { value } = event.target;
    setUserLang(value);
    // console.log("value: ", value);
  };
  //#endregion

  ////////////////////UserComputerSkill////////////////////
  //#region
  const [userComputerExp, setUserComputerExp] = useState("");
  const ComputerExpInput = useRef();

  const handleDeleteComputerExp = (index) => {
    const newArray = [...userReg.experiences];
    newArray.splice(index, 1);
    setUserReg((old) => ({
      ...old,
      experiences: newArray,
    }));
  };

  const handleAddComputerExp = (e) => {
    setUserReg((old) => ({
      ...old,
      experiences: [...userReg.experiences, userComputerExp],
    }));
    ComputerExpInput.current.value = "";
  };

  const handleChangeComputerExp = (event) => {
    let { value } = event.target;
    setUserComputerExp(value);
    // console.log("value: ", value);
  };
  //#endregion
  //#endregion
  //////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* Header Title */}
      <div className="d-flex align-items-center gap-4">
        <Link
          to={"/profile"}
          onClick={(e) => {
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
        <h1 style={{ color: "var(--text-main-color)" }}>Edit Profile</h1>
      </div>
      <hr />
      <div className="d-flex flex-column justify-content-center align-items-center">
        {/* Pictures */}
        <div className="row">
          <fieldset className="col">
            <label htmlFor="profile_photo">
              <img
                src="https://github.com/mdo.png"
                alt="profile_photo"
                className="rounded-circle img-fluid"
                style={{ maxHeight: "200px", cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              hidden
              name="profile_photo"
              onChange={(e) => handleChange(e)}
              id="profile_photo"
              accept=".png, .jpg, .jpeg"
            />
          </fieldset>
          <fieldset className="col">
            <label htmlFor="profile_cover" style={{ curser: "pointer" }}>
              <img
                src="https://github.com/mdo.png"
                alt="profile"
                className="rounded-circle img-fluid"
                style={{ maxHeight: "200px", cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              hidden
              name="profile_cover"
              onChange={(e) => handleChange(e)}
              id="profile_cover"
              accept=".png, .jpg, .jpeg"
            />
          </fieldset>
        </div>
        {/*  */}
        <div className="col-12 col-sm-10 col-md-9 col-lg-8 mx-auto">
          {/* First Name */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="first_name"
              placeholder="john Doe"
              required
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="first_name"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="first_name"
              style={{ color: "var(--text-main-color)" }}
            >
              First Name
            </label>
          </div>
          {/* Second Name */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="last_name"
              placeholder="john Doe"
              required
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="last_name"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="last_name"
              style={{ color: "var(--text-main-color)" }}
            >
              Second Name
            </label>
          </div>
          {/* Age */}
          <div className="form-floating my-3">
            <input
              type="number"
              className="form-control rounded-5"
              id="age"
              placeholder="age"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="age"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="age" style={{ color: "var(--text-main-color)" }}>
              Age
            </label>
          </div>
          {/* Phone Number */}
          <div className="form-floating my-3">
            <input
              type="number"
              className="form-control rounded-5"
              id="phone"
              required
              placeholder="0123456879"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="phone"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="phone" style={{ color: "var(--text-main-color)" }}>
              Phone Number
            </label>
          </div>
          {/* Email */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="email"
              required
              placeholder="example@email.com"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="email" style={{ color: "var(--text-main-color)" }}>
              Email
            </label>
          </div>
          {/* Bio */}
          <div className="form-floating my-3">
            <textarea
              className="form-control rounded-5"
              placeholder="Add Your Bio"
              id="floatingTextarea2"
              style={{ height: 100, bordercolor: "var(--text-main-color)" }}
              defaultValue={""}
              name="bio"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingTextarea2"
              style={{ color: "var(--text-main-color)" }}
            >
              Add Your Bio
            </label>
          </div>
          {/* Governorate */}
          <div className="form-floating my-3">
            <select
              className="form-select rounded-5"
              id="Governorate"
              required
              aria-label="Floating label select example"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              defaultValue={""}
              name="governorate"
              onChange={(e) => handleChange(e)}
            >
              <option
                value={""}
                disabled
                style={{ color: "var(--text-main-color)" }}
              >
                Choose a Governorate
              </option>
              <option
                value={"Cairo"}
                style={{ color: "var(--text-main-color)" }}
              >
                Cairo
              </option>
              <option
                value={"Helwan"}
                style={{ color: "var(--text-main-color)" }}
              >
                Helwan
              </option>
            </select>
            <label htmlFor="Governorate">Governorate</label>
          </div>
          {/* Address */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="address"
              placeholder="Cairo"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="address"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="address"
              style={{ color: "var(--text-main-color)" }}
            >
              Home Address
            </label>
          </div>
          {/*  */}
          {/* Certifications */}
          {userReg.certifications.map((item, index) => (
            <div className="form-floating my-3" key={index}>
              <input
                type="text"
                className="form-control rounded-5"
                id="Certificate"
                // placeholder="Cairo"
                value={item}
                disabled
                style={{
                  bordercolor: "var(--text-main-color)",
                }}
                name="Certificate"
                // onChange={(event) => handleChangeCert(event, index)}
              />
              <label
                htmlFor="Certificate"
                style={{ color: "var(--text-main-color)" }}
              >
                Certificate #{index + 1}
              </label>
              <div
                className="position-absolute"
                style={{
                  right: "0px",
                  transform: "translate(-25px, -43px)",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteCert(index)}
              >
                <FontAwesomeIcon fontSize={30} icon={faSquareMinus} />
              </div>
            </div>
          ))}
          {/* Certifications Input */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="certifications"
              placeholder="certifications"
              ref={certInput}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="certifications"
              onChange={(event) => handleChangeCert(event)}
            />
            <label
              htmlFor="certifications"
              style={{ color: "var(--text-main-color)" }}
            >
              Certifications
            </label>
            <div
              className="position-absolute"
              style={{
                right: " 0",
                transform: "translate(-25px, -43px)",
                cursor: "pointer",
              }}
              onClick={(e) => handleAddCert(e)}
            >
              <FontAwesomeIcon fontSize={30} icon={faSquarePlus} />
            </div>
          </div>
          {/* /////////////////////////// */}
          {/* /////////////////////////// */}
          {/* Skills */}
          {userReg.skills.map((item, index) => (
            <div className="form-floating my-3" key={index}>
              <input
                type="text"
                className="form-control rounded-5"
                id="skills"
                // placeholder="Cairo"
                value={item}
                disabled
                style={{
                  bordercolor: "var(--text-main-color)",
                }}
                name="skills"
              />
              <label
                htmlFor="skills"
                style={{ color: "var(--text-main-color)" }}
              >
                Skill #{index + 1}
              </label>
              <div
                className="position-absolute"
                style={{
                  right: "0px",
                  transform: "translate(-25px, -43px)",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteSkill(index)}
              >
                <FontAwesomeIcon fontSize={30} icon={faSquareMinus} />
              </div>
            </div>
          ))}
          {/* Skill Input */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="skills"
              placeholder="skills"
              ref={skillInput}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="skills"
              onChange={(event) => handleChangeSkill(event)}
            />
            <label htmlFor="skills" style={{ color: "var(--text-main-color)" }}>
              Skills
            </label>
            <div
              className="position-absolute"
              style={{
                right: " 0",
                transform: "translate(-25px, -43px)",
                cursor: "pointer",
              }}
              onClick={(e) => handleAddSkill(e)}
            >
              <FontAwesomeIcon fontSize={30} icon={faSquarePlus} />
            </div>
          </div>
          {/*  */}
          {/* /////////////////////////// */}
          {/* /////////////////////////// */}
          {/* interests */}
          {userReg.interests.map((item, index) => (
            <div className="form-floating my-3" key={index}>
              <input
                type="text"
                className="form-control rounded-5"
                id="interest"
                // placeholder="Cairo"
                value={item}
                disabled
                style={{
                  bordercolor: "var(--text-main-color)",
                }}
                name="interest"
              />
              <label
                htmlFor="interest"
                style={{ color: "var(--text-main-color)" }}
              >
                Interest #{index + 1}
              </label>
              <div
                className="position-absolute"
                style={{
                  right: "0px",
                  transform: "translate(-25px, -43px)",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteInterest(index)}
              >
                <FontAwesomeIcon fontSize={30} icon={faSquareMinus} />
              </div>
            </div>
          ))}
          {/* interest Input */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="interests"
              placeholder="interests"
              ref={interestInput}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="interests"
              onChange={(event) => handleChangeInterest(event)}
            />
            <label
              htmlFor="interests"
              style={{ color: "var(--text-main-color)" }}
            >
              Interests
            </label>
            <div
              className="position-absolute"
              style={{
                right: " 0",
                transform: "translate(-25px, -43px)",
                cursor: "pointer",
              }}
              onClick={(e) => handleAddInterest(e)}
            >
              <FontAwesomeIcon fontSize={30} icon={faSquarePlus} />
            </div>
          </div>
          {/*  */}
          {/* /////////////////////////// */}
          {/* /////////////////////////// */}
          {/* Languages */}
          {userReg.language.map((item, index) => (
            <div className="form-floating my-3" key={index}>
              <input
                type="text"
                className="form-control rounded-5"
                id="Lang"
                // placeholder="Cairo"
                value={item}
                disabled
                style={{
                  bordercolor: "var(--text-main-color)",
                }}
                name="Lang"
              />
              <label htmlFor="Lang" style={{ color: "var(--text-main-color)" }}>
                Lang #{index + 1}
              </label>
              <div
                className="position-absolute"
                style={{
                  right: "0px",
                  transform: "translate(-25px, -43px)",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteLang(index)}
              >
                <FontAwesomeIcon fontSize={30} icon={faSquareMinus} />
              </div>
            </div>
          ))}
          {/* Language Input */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="language"
              placeholder="language"
              ref={LangInput}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="Lang"
              onChange={(event) => handleChangeLang(event)}
            />
            <label htmlFor="Lang" style={{ color: "var(--text-main-color)" }}>
              Language
            </label>
            <div
              className="position-absolute"
              style={{
                right: " 0",
                transform: "translate(-25px, -43px)",
                cursor: "pointer",
              }}
              onClick={(e) => handleAddLang(e)}
            >
              <FontAwesomeIcon fontSize={30} icon={faSquarePlus} />
            </div>
          </div>
          {/*  */}
          {/* /////////////////////////// */}
          {/* /////////////////////////// */}
          {/* Computer Experiences */}
          {userReg.experiences.map((item, index) => (
            <div className="form-floating my-3" key={index}>
              <input
                type="text"
                className="form-control rounded-5"
                id="ComputerExp"
                // placeholder="Cairo"
                value={item}
                disabled
                style={{
                  bordercolor: "var(--text-main-color)",
                }}
                name="ComputerExp"
              />
              <label
                htmlFor="ComputerExp"
                style={{ color: "var(--text-main-color)" }}
              >
                ComputerExp #{index + 1}
              </label>
              <div
                className="position-absolute"
                style={{
                  right: "0px",
                  transform: "translate(-25px, -43px)",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteComputerExp(index)}
              >
                <FontAwesomeIcon fontSize={30} icon={faSquareMinus} />
              </div>
            </div>
          ))}
          {/* Computer Experience Input */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="experiences"
              placeholder="Computer Experience"
              ref={ComputerExpInput}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="experiences"
              onChange={(event) => handleChangeComputerExp(event)}
            />
            <label
              htmlFor="experiences"
              style={{ color: "var(--text-main-color)" }}
            >
              ComputerExps
            </label>
            <div
              className="position-absolute"
              style={{
                right: " 0",
                transform: "translate(-25px, -43px)",
                cursor: "pointer",
              }}
              onClick={(e) => handleAddComputerExp(e)}
            >
              <FontAwesomeIcon fontSize={30} icon={faSquarePlus} />
            </div>
          </div>
          {/*  */}
          {/* University */}
          <div className="form-floating my-3">
            <select
              className="form-select rounded-5"
              id="university"
              required
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              defaultValue={""}
              name="profile_university_id"
              onChange={(e) => handleChange(e)}
            >
              <option
                value={""}
                disabled
                style={{ color: "var(--text-main-color)" }}
              >
                Choose a University
              </option>
              <option value={"5"} style={{ color: "var(--text-main-color)" }}>
                Cairo
              </option>
              <option value={"6"} style={{ color: "var(--text-main-color)" }}>
                Helwan
              </option>
              <option value={"7"} style={{ color: "var(--text-main-color)" }}>
                Ain Shams
              </option>
              <option value={"8"} style={{ color: "var(--text-main-color)" }}>
                AUC
              </option>
              <option value={"9"} style={{ color: "var(--text-main-color)" }}>
                GUC
              </option>
            </select>
            <label htmlFor="university">University</label>
          </div>
          {/* Collage */}
          <div className="form-floating my-3">
            <select
              className="form-select rounded-5"
              id="Collage"
              required
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              defaultValue={""}
              name="collage"
              onChange={(e) => handleChange(e)}
            >
              <option
                value={""}
                disabled
                style={{ color: "var(--text-main-color)" }}
              >
                Choose a Collage
              </option>
              <option value={"5"} style={{ color: "var(--text-main-color)" }}>
                Cairo
              </option>
              <option value={"6"} style={{ color: "var(--text-main-color)" }}>
                Helwan
              </option>
              <option value={"7"} style={{ color: "var(--text-main-color)" }}>
                Ain Shams
              </option>
              <option value={"8"} style={{ color: "var(--text-main-color)" }}>
                AUC
              </option>
              <option value={"9"} style={{ color: "var(--text-main-color)" }}>
                GUC
              </option>
            </select>
            <label htmlFor="university">Collage</label>
          </div>
        </div>
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
          className="text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
        >
          Confirm
        </Link>
      </div>
    </>
  );
};

export default EditProfile;
