import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Post from "../Components/Post";
import LoadingSuspese from "../Components/LoadingSuspense";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UserPosts = () => {
  const navigate = useNavigate();
  const baseURL = "https://attachin.com/";
  let [posts, setPosts] = useState(null);
  let [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}api/getAllHomePosts?user_id=` + id)
      .then((res) => {
        setPosts(res.data.data);
        setUser(res.data.data[0].user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        {user && (
          <h1 style={{ color: "var(--text-main-color)" }}>
            {user?.full_name} Posts
          </h1>
        )}
      </div>
      <hr />
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
            <div className="display-5">No Posts Yet</div>
          )
        ) : (
          <LoadingSuspese />
        )}
      </div>
    </>
  );
};

export default memo(UserPosts);
