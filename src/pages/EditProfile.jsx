import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const [userReg, setUserReg] = useState({
    certifications: [],
    skills: [],
    interest: [],
    computerExps: [],
    langs: [],
  });

  const handleChange = (e) => {
    setUserReg((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    console.log(userReg);
  };

  // Adding Dynamic Inputs
  //////////////////// userCert ////////////////////
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
    console.log("value: ", value);
  };
  //////////////////// userSkill ////////////////////
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
  /////////////////// userInterest /////////////////////
  const [userInterest, setUserInterest] = useState("");
  const interestInput = useRef();

  const handleDeleteInterest = (index) => {
    const newArray = [...userReg.interest];
    newArray.splice(index, 1);
    setUserReg((old) => ({
      ...old,
      interest: newArray,
    }));
  };

  const handleAddInterest = (e) => {
    setUserReg((old) => ({
      ...old,
      interest: [...userReg.interest, userInterest],
    }));
    interestInput.current.value = "";
  };

  const handleChangeInterest = (event) => {
    let { value } = event.target;
    setUserInterest(value);
    // console.log("value: ", value);
  };
  ////////////////////////////////////////
  const [userLang, setUserLang] = useState("");
  const LangInput = useRef();

  const handleDeleteLang = (index) => {
    const newArray = [...userReg.langs];
    newArray.splice(index, 1);
    setUserReg((old) => ({
      ...old,
      langs: newArray,
    }));
  };

  const handleAddLang = (e) => {
    setUserReg((old) => ({
      ...old,
      langs: [...userReg.langs, userLang],
    }));
    LangInput.current.value = "";
  };

  const handleChangeLang = (event) => {
    let { value } = event.target;
    setUserLang(value);
    // console.log("value: ", value);
  };
  ////////////////////////////////////////
  const [userComputerExp, setUserComputerExp] = useState("");
  const ComputerExpInput = useRef();

  const handleDeleteComputerExp = (index) => {
    const newArray = [...userReg.computerExps];
    newArray.splice(index, 1);
    setUserReg((old) => ({
      ...old,
      computerExps: newArray,
    }));
  };

  const handleAddComputerExp = (e) => {
    setUserReg((old) => ({
      ...old,
      computerExps: [...userReg.computerExps, userComputerExp],
    }));
    ComputerExpInput.current.value = "";
  };

  const handleChangeComputerExp = (event) => {
    let { value } = event.target;
    setUserComputerExp(value);
    // console.log("value: ", value);
  };
  ////////////////////////////////////////

  return (
    <>
      <h1 style={{ color: "var(--text-main-color)" }}>Edit Profile</h1>
      <hr />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="row gap-5">
          <fieldset className="col">
            <label htmlFor="profilePic">
              <img
                src="https://github.com/mdo.png"
                alt="profile"
                className="rounded-circle"
                style={{ width: "200px", cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              hidden
              name="profilePic"
              onChange={(e) => handleChange(e)}
              id="profilePic"
              accept=".png, .jpg, .jpeg"
            />
          </fieldset>
          <fieldset className="col">
            <label htmlFor="coverPic" style={{ curser: "pointer" }}>
              <img
                src="https://github.com/mdo.png"
                alt="profile"
                className="rounded-circle"
                style={{ width: "200px", cursor: "pointer" }}
              />
            </label>
            <input
              type="file"
              hidden
              name="coverPic"
              onChange={(e) => handleChange(e)}
              id="coverPic"
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
              id="FirstName"
              placeholder="john Doe"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="firstName"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="FirstName"
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
              id="SecondName"
              placeholder="john Doe"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="lastName"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="SecondName"
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
              id="Age"
              placeholder="0123456879"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="mobileNum"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="Age" style={{ color: "var(--text-main-color)" }}>
              Age
            </label>
          </div>
          {/* Mobile */}
          <div className="form-floating my-3">
            <input
              type="number"
              className="form-control rounded-5"
              id="Mobile"
              placeholder="0123456879"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="mobileNum"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="Mobile" style={{ color: "var(--text-main-color)" }}>
              Mobile Number
            </label>
          </div>
          {/* Email */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="Email"
              placeholder="example@email.com"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="Email" style={{ color: "var(--text-main-color)" }}>
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
              id="Address"
              placeholder="Cairo"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="address"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="Address"
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
          {/* Cert Input */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="Certifications"
              placeholder="Certifications"
              ref={certInput}
              style={{
                bordercolor: "var(--text-main-color)",
                cursor: "pointer",
              }}
              name="Certifications"
              onChange={(event) => handleChangeCert(event)}
            />
            <label
              htmlFor="Certifications"
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
              id="skill"
              placeholder="skill"
              ref={skillInput}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="skill"
              onChange={(event) => handleChangeSkill(event)}
            />
            <label htmlFor="skill" style={{ color: "var(--text-main-color)" }}>
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
          {/* interest */}
          {userReg.interest.map((item, index) => (
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
              id="interest"
              placeholder="interest"
              ref={interestInput}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="interest"
              onChange={(event) => handleChangeInterest(event)}
            />
            <label
              htmlFor="interest"
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
          {/* Lang */}
          {userReg.langs.map((item, index) => (
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
          {/* Lang Input */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="Lang"
              placeholder="Lang"
              ref={LangInput}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="Lang"
              onChange={(event) => handleChangeLang(event)}
            />
            <label htmlFor="Lang" style={{ color: "var(--text-main-color)" }}>
              Langs
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
          {/* ComputerExp */}
          {userReg.computerExps.map((item, index) => (
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
          {/* ComputerExp Input */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="ComputerExp"
              placeholder="ComputerExp"
              ref={ComputerExpInput}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="ComputerExp"
              onChange={(event) => handleChangeComputerExp(event)}
            />
            <label
              htmlFor="ComputerExp"
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
              aria-label="Floating label select example"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              defaultValue={""}
              name="university"
              onChange={(e) => handleChange(e)}
            >
              <option
                value={""}
                disabled
                style={{ color: "var(--text-main-color)" }}
              >
                Choose a university
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
            <label htmlFor="university">University</label>
          </div>
          {/* Collage */}
          <div className="form-floating my-3">
            <select
              className="form-select rounded-5"
              id="Collage"
              aria-label="Floating label select example"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              defaultValue={""}
              name="Collage"
              onChange={(e) => handleChange(e)}
            >
              <option
                value={""}
                disabled
                style={{ color: "var(--text-main-color)" }}
              >
                Choose a Collage
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
