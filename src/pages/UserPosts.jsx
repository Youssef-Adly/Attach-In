import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Post from "../Components/Post";
import LoadingSuspese from "../Components/LoadingSuspense";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
// import { toastError } from "../utils/ToastsFunctions";

const UserPosts = () => {
  const baseURL = "https://attachin.com/";
  const navigate = useNavigate();
  const [t] = useTranslation();
  let [posts, setPosts] = useState(null);
  let [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}api/getAllHomePosts?user_id=` + id)
      .then((res) => {
        setPosts(res.data.data);
        setUser(res.data.data[0]?.user);
      })
      .catch((err) => {
        console.log(err);
        // toastError("Network Error");
      });
  }, [id]);

  return (
    <>
      {posts && (
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
              {user?.full_name
                ? user?.full_name + " " + t("Posts User")
                : t("Go Back")}
            </h1>
          </div>
          <hr />
        </>
      )}
      {/*  */}
      <div className="d-flex flex-column gap-3">
        {posts ? (
          posts.length > 0 ? (
            posts.map((post, postIndex) => (
              <Post
                {...post}
                postState={[postIndex, setPosts]}
                key={postIndex}
              />
            ))
          ) : (
            <div
              className="display-5 pt-3 text-center"
              style={{
                color: "var(--text-main-color)",
              }}
            >
              {t("No Posts Yet")}
            </div>
          )
        ) : (
          <LoadingSuspese />
        )}
      </div>
    </>
  );
};

export default memo(UserPosts);
