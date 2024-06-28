import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FilePondPicture from "../Components/FilePondPicture";
import FilePondPictureCover from "../Components/FilePondPictureCover";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMessage from "../Components/ErrorMessage";
import LoadingSuspese from "../Components/LoadingSuspense";
import { updateUserInfo } from "../Redux/actions/authActions";

// yup Magic Here
//#region
// Add yup Phone Validation
yup.addMethod(
  yup.string,
  "phoneLength",
  function (errorMessage = "Phone number must be 11 digits") {
    return this.test("phoneLength", errorMessage, function (value) {
      return value && value.length === 11 && /^\d+$/.test(value);
    });
  }
);

// yup Schema
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email can't be empty"),
    first_name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "first name must be letters only")
      .required("first name can't be empty"),
    last_name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "last name must be letters only")
      .required("last name can't be empty"),
    phone: yup
      .string()
      .phoneLength()
      .required("You have to enter a valid phone number"),
    university: yup
      .number()
      .typeError("select a university please")
      .required("select a university please"),
    governorate: yup.string().required("select a governorate please"),
    collage: yup.string().required("select a collage please"),
    bio: yup.string(),
    language: yup.string().required("language can't be empty"),
  })
  .required();

//#endregion

const EditProfile = () => {
  const navigate = useNavigate();
  const baseURL = "https://attachin.com/";
  const user = useSelector((state) => state.Auth.user);
  const [t, i18n] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [FormErrors, setFormErrors] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting /* , isValid, isLoading, isValidating */,
    },
  } = useForm({
    defaultValues: {
      first_name: user.first_name || user.full_name.split(" ")[0],
      last_name: user.last_name || user.full_name.split(" ")[1],
      email: user.email,
      phone: user.phone,
      university: user.university?.id,
      collage: user.collage?.id || "",
      address: user.address,
      bio: user.bio || "",
      birthday: user.birthday || "",
      governorate: user.governorate?.id || "",
      language: "en",
    },
    resolver: yupResolver(schema),
  });

  // To Show Api Errors In View
  const getErrorsFromAPI = (err) => {
    let errorsArr = [];
    for (let i = 0; i < Object.entries(err).length; i++) {
      if (Object.entries(err)[i][1].isError) {
        // console.log({
        //   [Object.entries(err)[i][0]]: err[Object.entries(err)[i][0]],
        // });
        errorsArr.push({
          [Object.entries(err)[i][0]]: err[Object.entries(err)[i][0]],
        });
      }
    }
    // console.log("errorsArr: ", errorsArr);
    setFormErrors([...errorsArr]);
  };

  // setting universities, Colleges and governments on Component Init
  //#region
  const [colleges, setColleges] = useState(null);
  const [universities, setUniversities] = useState(null);
  const [governments, setGovernments] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "api/getColleges")
      .then((res) => {
        // console.log("colleges", res.data.data.colleges);
        setColleges(res.data.data.colleges);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(baseURL + "api/getUniversities")
      .then((res) => {
        // console.log("universities", res.data.data.universities);
        setUniversities(res.data.data.universities);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(baseURL + "api/getGovernments")
      .then((res) => {
        // console.log("governments", res.data.data.governments);
        setGovernments(res.data.data.governments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //#endregion

  //Adds Images in FormSubmit Object
  //#region

  // All of My Images
  const [images, setImages] = useState(null);

  //  On Change profile_photo
  const [profilePic, setProfilePic] = useState([
    user.profile_photo ? baseURL + user.profile_photo : "/profile.png",
  ]);
  // console.log(profilePic);

  useEffect(() => {
    if (
      profilePic[0]?.source !== "/profile.png" &&
      profilePic[0]?.source !== baseURL + user.profile_photo &&
      profilePic[0]?.filename
    ) {
      // console.log(profilePic[0].filename);
      // setUserReg((old) => ({ ...old, profile_photo: profilePic[0]?.file }));
      setImages((old) => ({ ...old, profile_photo: profilePic[0]?.file }));
    }
  }, [profilePic, user.profile_photo]);

  //  On Change profile_cover
  const [profileCover, setProfileCover] = useState([
    user.profile_cover ? baseURL + user.profile_cover : "/banner.jpg",
  ]);
  useEffect(() => {
    if (
      profileCover[0]?.source !== "/banner.jpg" &&
      profileCover[0]?.source !== baseURL + user.profile_cover &&
      profileCover[0]?.filename
    ) {
      // console.log(profileCover[0]);
      // setUserReg((old) => ({ ...old, profile_cover: profileCover[0]?.file }));
      setImages((old) => ({ ...old, profile_cover: profileCover[0]?.file }));
    }
  }, [profileCover, user.profile_cover]);

  //#endregion

  // Handle Form
  //#region
  const [userReg, setUserReg] = useState({
    certifications: user.certifications,
    skills: user.skills,
    interests: user.interests,
    experiences: user.experiences,
  });

  const submitForm = async (data) => {
    setLoading(true);
    setFormErrors(null);
    // console.log(userReg);
    const form = { ...data, ...images };
    // console.log({ ...data, ...images });
    const formData = new FormData();
    for (const key in form) {
      if (
        Object.hasOwnProperty.call(form, key) &&
        form[key] &&
        form[key].toString().trim() !== ""
      ) {
        const element = form[key];
        // console.log("key: ", key, "element: ", element);
        formData.append(key, element);
      }
    }
    // Logging Values
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + " ==> ", pair[1]);
    // }

    // API CALL
    await axios
      .post(baseURL + "api/updateProfile", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data", // Important for image uploads
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        dispatch(updateUserInfo(user));
        setTimeout(() => {
          setLoading(false);
          navigate("/profile");
        }, 1500);
      })
      .catch((err) => {
        getErrorsFromAPI(err.errors);
      });
  };

  //#endregion

  // Adding Dynamic Inputs
  //////////////////////////////////////////////////////////////////////////////
  //#region
  //////////////////// userCert ////////////////////
  //#region
  const [userCert, setUserCert] = useState("");
  const certInput = useRef();

  const handleDeleteCert = async (index, id) => {
    await axios
      .post(
        baseURL + "api/deleteUserCertification",
        {
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        const newArray = [...userReg.certifications];
        newArray.splice(index, 1);
        setUserReg((old) => ({
          ...old,
          certifications: newArray,
        }));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(updateUserInfo(user));
      });
  };

  const handleAddCert = async (e) => {
    if (userCert.length > 0) {
      await axios
        .post(
          baseURL + "api/addUserCertification",
          {
            title: userCert,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((res) => {
          setUserCert("");
          dispatch(updateUserInfo(user));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setUserReg((old) => ({
      ...old,
      certifications: user.certifications,
    }));
    certInput.current.value = "";
  }, [user.certifications]);

  const handleChangeCert = (event, index) => {
    let { value } = event.target;
    setUserCert(value);
  };

  //#endregion

  //////////////////// userSkill ////////////////////
  //#region
  const [userSkill, setUserSkill] = useState("");
  const skillInput = useRef();

  const handleDeleteSkill = async (index, id) => {
    await axios
      .post(
        baseURL + "api/deleteUserSkill",
        {
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        const newArray = [...userReg.skills];
        newArray.splice(index, 1);
        setUserReg((old) => ({
          ...old,
          skills: newArray,
        }));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(updateUserInfo(user));
      });
  };

  const handleAddSkill = async (e) => {
    if (userSkill.length > 0) {
      await axios
        .post(
          baseURL + "api/addUserSkill",
          {
            title: userSkill,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((res) => {
          dispatch(updateUserInfo(user));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setUserReg((old) => ({
      ...old,
      skills: [...user.skills],
    }));
    skillInput.current.value = "";
  }, [user.skills]);

  const handleChangeSkill = (event) => {
    let { value } = event.target;
    setUserSkill(value);
  };

  //#endregion

  /////////////////// userInterest /////////////////////
  //#region
  const [userInterest, setUserInterest] = useState("");
  const interestInput = useRef();

  const handleDeleteInterest = async (index, id) => {
    await axios
      .post(
        baseURL + "api/deleteUserInterest",
        {
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        const newArray = [...userReg.interests];
        newArray.splice(index, 1);
        setUserReg((old) => ({
          ...old,
          interests: newArray,
        }));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(updateUserInfo(user));
      });
  };

  const handleAddInterest = async (e) => {
    if (userInterest.length > 0) {
      await axios
        .post(
          baseURL + "api/addUserInterest",
          {
            title: userInterest,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((res) => {
          dispatch(updateUserInfo(user));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setUserReg((old) => ({
      ...old,
      interests: [...user.interests],
    }));
    interestInput.current.value = "";
  }, [user.interests]);

  const handleChangeInterest = (event) => {
    let { value } = event.target;
    setUserInterest(value);
  };
  //#endregion

  ////////////////////UserComputerSkill////////////////////
  //#region
  const [userComputerExp, setUserComputerExp] = useState("");
  const ComputerExpInput = useRef();

  const handleDeleteComputerExp = async (index, id) => {
    await axios
      .post(
        baseURL + "api/deleteUserExperience",
        {
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        const newArray = [...userReg.experiences];
        newArray.splice(index, 1);
        setUserReg((old) => ({
          ...old,
          experiences: newArray,
        }));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((res) => {
        dispatch(updateUserInfo(user));
      });
  };

  const handleAddComputerExp = async (e) => {
    if (userComputerExp.length > 0) {
      await axios
        .post(
          baseURL + "api/addUserExperience",
          {
            title: userComputerExp,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        )
        .then((res) => {
          dispatch(updateUserInfo(user));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setUserReg((old) => ({
      ...old,
      experiences: [...user.experiences],
    }));
    ComputerExpInput.current.value = "";
  }, [user.experiences]);

  const handleChangeComputerExp = (event) => {
    let { value } = event.target;
    setUserComputerExp(value);
  };

  //#endregion
  //////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* Header Title */}
      <div className="d-flex align-items-center gap-4">
        <a
          href={"/profile"}
          // onClick={(e) => {
          //   navigate(-1);
          //   navigate.reload();
          // }}
        >
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            fontSize={27}
            style={{
              color: "var(--text-main-color)",
              marginBottom: "7px",
            }}
          />
        </a>
        <h1 style={{ color: "var(--text-main-color)" }}>{t("Edit Profile")}</h1>
      </div>
      <hr />
      <div className="d-flex flex-column justify-content-center align-items-center">
        {/* Pictures */}
        <div className="d-flex flex-column-reverse flex-sm-row align-items-center justify-content-center gap-3">
          <div className="" style={{ minWidth: "150px" }}>
            <FilePondPicture {...{ profilePic, setProfilePic }} />
          </div>
          <div className="" style={{ minWidth: "300px" }}>
            <FilePondPictureCover {...{ profileCover, setProfileCover }} />
          </div>
        </div>
        {/*  */}
        <form
          onSubmit={handleSubmit(submitForm)}
          disabled={isSubmitting}
          className="col-12 col-sm-10 col-md-9 col-lg-8 mx-auto"
        >
          {/* First Name */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="first_name"
              {...register("first_name")}
              placeholder="john Doe"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="first_name"
              // onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="first_name"
              style={{ color: "var(--text-main-color)" }}
            >
              First Name
            </label>
            <ErrorMessage>{errors.first_name?.message}</ErrorMessage>
          </div>
          {/* Second Name */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              {...register("last_name")}
              id="last_name"
              placeholder="john Doe"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="last_name"
              // onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="last_name"
              style={{ color: "var(--text-main-color)" }}
            >
              Second Name
            </label>
            <ErrorMessage>{errors.last_name?.message}</ErrorMessage>
          </div>
          {/* BirthDay */}
          <div className="form-floating my-3">
            <input
              type="date"
              className="form-control rounded-5"
              id="birthday"
              placeholder="birthday"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="birthday"
              {...register("birthday")}
              // onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="birthday"
              style={{ color: "var(--text-main-color)" }}
            >
              Birthday
            </label>
            <ErrorMessage>{errors.birthday?.message}</ErrorMessage>
          </div>
          {/* Phone Number */}
          <div className="form-floating my-3">
            <input
              type="number"
              className="form-control rounded-5"
              id="phone"
              placeholder="0123456879"
              {...register("phone")}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="phone"
              // onChange={(e) => handleChange(e)}
            />
            <label htmlFor="phone" style={{ color: "var(--text-main-color)" }}>
              Phone Number
            </label>
            <ErrorMessage>{errors.phone?.message}</ErrorMessage>
          </div>
          {/* Email */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="email"
              placeholder="example@email.com"
              {...register("email")}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="email"
              // onChange={(e) => handleChange(e)}
            />
            <label htmlFor="email" style={{ color: "var(--text-main-color)" }}>
              Email
            </label>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
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
              {...register("bio")}
              // onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="floatingTextarea2"
              style={{ color: "var(--text-main-color)" }}
            >
              Add Your Bio
            </label>
            <ErrorMessage>{errors.bio?.message}</ErrorMessage>
          </div>
          {/* Governorate */}
          <div className="form-floating my-3">
            <select
              className="form-select rounded-5"
              id="Governorate"
              {...register("governorate")}
              aria-label="Floating label select example"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              defaultValue={""}
              name="governorate"
              // onChange={(e) => handleChange(e)}
            >
              <option
                value={""}
                disabled
                style={{ color: "var(--text-main-color)" }}
              >
                {i18n.language === "ar"
                  ? "اختار المحافظه"
                  : "Choose a Governorate"}
              </option>
              {governments &&
                governments.map((g, idx) => (
                  <option
                    key={idx}
                    value={g.id}
                    style={{ color: "var(--text-main-color)" }}
                  >
                    {i18n.language === "ar" ? g.name_ar : g.name_en}
                  </option>
                ))}
            </select>
            <label htmlFor="Governorate">Governorate</label>
            <ErrorMessage>{errors.governorate?.message}</ErrorMessage>
          </div>
          {/* Address */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="address"
              placeholder="Cairo"
              {...register("address")}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="address"
              // onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="address"
              style={{ color: "var(--text-main-color)" }}
            >
              Home Address
            </label>
            <ErrorMessage>{errors.address?.message}</ErrorMessage>
          </div>
          {/*  */}
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
          {/* Certifications */}
          {userReg.certifications.map((item, index) => (
            <div className="form-floating my-3" key={index}>
              <input
                type="text"
                className="form-control rounded-5"
                id="Certificate"
                // placeholder="Cairo"
                value={item.title}
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
                onClick={() => handleDeleteCert(index, item.id)}
              >
                <FontAwesomeIcon fontSize={30} icon={faSquareMinus} />
              </div>
            </div>
          ))}
          {/* /////////////////////////// */}
          {/* /////////////////////////// */}
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
          {/* Skills */}
          {userReg.skills.map((item, index) => (
            <div className="form-floating my-3" key={index}>
              <input
                type="text"
                className="form-control rounded-5"
                id="skills"
                // placeholder="Cairo"
                value={item.title}
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
                onClick={() => handleDeleteSkill(index, item.id)}
              >
                <FontAwesomeIcon fontSize={30} icon={faSquareMinus} />
              </div>
            </div>
          ))}
          {/*  */}
          {/* /////////////////////////// */}
          {/* /////////////////////////// */}
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
          {/* interests */}
          {userReg.interests.map((item, index) => (
            <div className="form-floating my-3" key={index}>
              <input
                type="text"
                className="form-control rounded-5"
                id="interest"
                // placeholder="Cairo"
                value={item.title}
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
                onClick={() => handleDeleteInterest(index, item.id)}
              >
                <FontAwesomeIcon fontSize={30} icon={faSquareMinus} />
              </div>
            </div>
          ))}
          {/*  */}
          {/* /////////////////////////// */}
          {/* /////////////////////////// */}
          {/* Language */}
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control rounded-5"
              id="language"
              placeholder="language"
              {...register("language")}
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              name="language"
            />
            <label
              htmlFor="language"
              style={{ color: "var(--text-main-color)" }}
            >
              Language
            </label>
            <ErrorMessage>{errors.language?.message}</ErrorMessage>
          </div>
          {/*  */}
          {/* /////////////////////////// */}
          {/* /////////////////////////// */}
          {/* User Experience Input */}
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
              User Experiences
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
          {/* User Experiences */}
          {userReg.experiences.map((item, index) => (
            <div className="form-floating my-3" key={index}>
              <input
                type="text"
                className="form-control rounded-5"
                id="ComputerExp"
                // placeholder="Cairo"
                value={item.title}
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
                User Experience #{index + 1}
              </label>
              <div
                className="position-absolute"
                style={{
                  right: "0px",
                  transform: "translate(-25px, -43px)",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteComputerExp(index, item.id)}
              >
                <FontAwesomeIcon fontSize={30} icon={faSquareMinus} />
              </div>
            </div>
          ))}
          {/*  */}
          {/* University */}
          <div className="form-floating my-3">
            <select
              className="form-select rounded-5"
              id="university"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              {...register("university")}
              defaultValue={""}
              name="university"
              // onChange={(e) => handleChange(e)}
            >
              <option
                value={""}
                disabled
                style={{ color: "var(--text-main-color)" }}
              >
                {i18n.language === "ar" ? "اختار جامعه" : "Choose a University"}
              </option>
              {universities &&
                universities.map((u, idx) => (
                  <option
                    key={idx}
                    value={u.id}
                    style={{ color: "var(--text-main-color)" }}
                  >
                    {i18n.language === "ar" ? u.name_ar : u.name_en}
                  </option>
                ))}
            </select>
            <label htmlFor="university">University</label>
            <ErrorMessage>{errors.university?.message}</ErrorMessage>
          </div>
          {/* Collage */}
          <div className="form-floating my-3">
            <select
              className="form-select rounded-5"
              id="Collage"
              style={{
                bordercolor: "var(--text-main-color)",
              }}
              defaultValue={""}
              {...register("collage")}
              name="collage"
              // onChange={(e) => handleChange(e)}
            >
              <option
                value={""}
                disabled
                style={{ color: "var(--text-main-color)" }}
              >
                {i18n.language === "ar" ? "اختار الكليه" : "Choose a Collage"}
              </option>
              {colleges &&
                colleges.map((c, idx) => (
                  <option
                    key={idx}
                    value={c.id}
                    style={{ color: "var(--text-main-color)" }}
                  >
                    {i18n.language === "ar" ? c.name_ar : c.name_en}
                  </option>
                ))}
            </select>
            <label htmlFor="Collage">Collage</label>
            <ErrorMessage>{errors.collage?.message}</ErrorMessage>
          </div>
          {/* API Validations */}
          {FormErrors
            ? FormErrors.map((err, idx) => {
                // console.log(Object.entries(err)[0][0]);
                return (
                  <ErrorMessage key={idx}>
                    {Object.entries(err)[0][1]?.message}
                  </ErrorMessage>
                );
              })
            : ""}
          {/* Submit */}
          {!loading ? (
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: "var(--main-color)",
                height: "100px",
                width: "100px",
                border: "none",
              }}
              className="regbtn mx-auto mb-5 text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
            >
              Confirm
            </button>
          ) : (
            <LoadingSuspese />
          )}
        </form>
      </div>
    </>
  );
};

export default EditProfile;
