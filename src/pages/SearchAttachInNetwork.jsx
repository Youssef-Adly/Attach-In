import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FriendCard from "../Components/FriendCard";
import LoadingSuspese from "../Components/LoadingSuspense";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toastError } from "../utils/ToastsFunctions";

const SearchAttachInNetwork = () => {
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [AllUsers, setAllUsers] = useState(null);
  const [searchParams /* , setSearchParams */] = useSearchParams();
  const [t] = useTranslation();

  // Get a specific query parameter
  const myParam = searchParams.get("name");
  // console.log("myParam: ", myParam);
  const [searchBar, setSearchBar] = useState(myParam);

  // Set a query parameter
  // setSearchParams({ myParam: "myValue" });

  // Remove a query parameter
  // setSearchParams((params) => {
  //   params.delete("myParam");
  //   return params;
  // });

  const search = (e) => {
    setSearchBar(e.target.value);
    setSearchedUsers(
      AllUsers.filter((user) =>
        user.full_name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    axios
      .get("https://attachin.com/api/getUsersWithSearch", {
        search: myParam,
      })
      .then((res) => {
        // console.log(res);
        setAllUsers(res.data.data);
        setSearchedUsers(() =>
          res.data.data.filter((user) =>
            user.full_name.toLowerCase().includes(myParam.toLowerCase())
          )
        );
      })
      .catch((err) => {
        console.log(err);
        toastError("Network Error");
      });
  }, [myParam]);

  return (
    <>
      {searchedUsers ? (
        <>
          <div className="d-flex col-10 col-sm-8 col-md-6 mx-auto mb-5 position-relative">
            <input
              className="form-control me-1 rounded-5 "
              type="text"
              placeholder={t("Search Attach-In")}
              aria-label="Search"
              value={searchBar}
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
          <main className="d-flex flex-wrap row-cols-2 justify-content-center gap-4 mb-5">
            {/* /* All searchedUsers */}
            {searchedUsers.length > 0 ? (
              searchedUsers.map((n, idx) => <FriendCard {...n} key={idx} />)
            ) : (
              <p
                className="fs-3 text-center"
                style={{
                  color: "var(--text-main-color)",
                }}
              >
                {t("No Users Found By That Name")}
              </p>
            )}
          </main>
        </>
      ) : (
        <LoadingSuspese />
      )}
    </>
  );
};

export default memo(SearchAttachInNetwork);
