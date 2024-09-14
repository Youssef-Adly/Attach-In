import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FriendCard from "../Components/FriendCard";
import { useTranslation } from "react-i18next";
import LoadingSuspese from "../Components/LoadingSuspense";
import { toastError } from "../utils/ToastsFunctions";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const NetworkPage = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const baseURL = "https://attachin.com/api/";
  const user = useSelector((state) => state.Auth.user);
  const [friends, setFriends] = useState(null);
  const [searchedFriends, setSearchedFriends] = useState(null);
  // const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    axios
      .get(baseURL + "getAllMyNetwork", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setSearchedFriends(res.data.data);
        setFriends(res.data.data);
        // console.log("res.data.data: ", res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toastError("Network Error");
      });
  }, [user.token]);

  const search = (e) => {
    // setSearchBar(e.target.value);
    setSearchedFriends(
      friends.filter((f) =>
        f.full_name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      {/* Header Title */}
      <div className="d-flex align-items-center gap-4 text-light dir">
        <Link
          // to={""}
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
        <h1 style={{ color: "var(--text-main-color)" }}>{t("Connections")}</h1>
      </div>
      <hr />

      {friends ? (
        <>
          <div
            className=" position-sticky d-flex col-10 col-sm-8 col-md-6 mx-auto mb-5 position-relative"
            style={{
              top: "50px",
              zIndex: "99",
            }}
          >
            <input
              className="form-control me-1 rounded-5"
              type="text"
              placeholder={t("Search")}
              aria-label="Search"
              // value={searchBar}
              onChange={(e) => search(e)}
            />
            <button
              className="btn-sm btn"
              // type="submit"
              style={{
                position: "absolute",
                right: "10px",
                top: "3px",
              }}
              // onClick={}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                color="var(--sec-white)"
              />
            </button>
          </div>
          <div className="d-flex flex-wrap row-cols-2 justify-content-center gap-4 mb-5">
            {friends.length > 0 ? (
              searchedFriends.map((f, idx) => <FriendCard {...f} key={idx} />)
            ) : (
              <p
                className="fs-3 text-center"
                style={{
                  color: "var(--text-main-color)",
                }}
              >
                {t("No Friends Yet")}
              </p>
            )}
          </div>
        </>
      ) : (
        <LoadingSuspese />
      )}
    </>
  );
};

export default memo(NetworkPage);
