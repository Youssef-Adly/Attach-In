import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../Components/Post";
import { v4 as uuid } from "uuid";
import LoadingSuspese from "../Components/LoadingSuspense";

const UserPosts = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.Auth.user);
  const baseURL = "https://attachin.com/";
  let [user, setUser] = useState(null);
  console.log("user: ", user);
  let [posts, setposts] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${baseURL}api/getAllHomePosts?user_id=` + id).then((res) => {
      setposts(res.data.data);
    });
  }, [id]);

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
        <h1 style={{ color: "var(--text-main-color)" }}>User Posts</h1>
      </div>
      <hr />
      {/*  */}
      <div className="d-flex flex-column gap-3">
        {posts ? (
          posts.length > 0 ? (
            posts.map((post, postIndex) => (
              <Post {...post} postState={[postIndex, setposts]} key={uuid()} />
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

export default UserPosts;
