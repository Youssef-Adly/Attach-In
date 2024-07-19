import React, { memo, useEffect, useState } from "react";
import Post from "../Components/Post";
import AddPost from "../Components/AddPost";
import axios from "axios";
import { v4 as uuid } from "uuid";
import LoadingSuspese from "../Components/LoadingSuspense";
import { useTranslation } from "react-i18next";
import { toastError, toastInfo } from "../utils/ToastsFunctions";
import { useSelector } from "react-redux";
import { getGreeting } from "../Components/formatDateForPost";
import { toast } from "react-toastify";

const HomePage = () => {
  const baseURL = "https://attachin.com/api/";
  const [t] = useTranslation();
  const user = useSelector((state) => state.Auth.user);
  const theme = useSelector((state) => state.theme.value);
  let [fetching, setFetching] = useState(false);
  let [limit, setLimit] = useState(15);
  let [posts, setPosts] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL + "getAllHomePosts?limit=" + limit)
      .then((res) => {
        setPosts(res.data.data.filter((p) => p.user));
        setFetching(false);
      })
      .catch((err) => {
        toastError("Network Error");
        console.log(err);
      });
  }, [limit]);

  // Greet User
  useEffect(() => {
    let extraConfig = theme ? { theme: "dark" } : { theme: "colored" };
    if (!toast.isActive()) {
      toastInfo(getGreeting() + user.full_name, extraConfig);
    } else {
      toast.dismiss();
    }

    return () => {
      toast.dismiss();
    };
  }, [user]);

  return (
    <>
      <div className="d-flex flex-column gap-3">
        {posts ? (
          <>
            {/* Add Post */}
            <AddPost setPosts={setPosts} />
            {/* ============== */}
            {posts.map((post, postIndex) => (
              <Post {...post} postState={[postIndex, setPosts]} key={uuid()} />
            ))}
            {!fetching ? (
              <button
                className="btn col-8 col-sm-5 col-md-4 col-lg-4 col-xl-3 ms-auto my-4 mb-md-0 rounde"
                style={{
                  backgroundColor: "var(--sec-color)",
                  color: "var(--text-main-color)",
                }}
                onClick={() => {
                  setFetching(true);
                  window.scrollTo(0, document.body.scrollHeight);
                  // bottomDiv.scrollIntoView();
                  setLimit((old) => old + 5);
                }}
              >
                {t("Load More Posts")}
              </button>
            ) : (
              <>
                <img
                  src="/Opener Loading.gif"
                  className="ms-auto"
                  style={{ width: "150px" }}
                  alt="Loading"
                />
                {/* <LoadingSuspese /> */}
              </>
            )}
          </>
        ) : (
          <LoadingSuspese />
        )}
      </div>
    </>
  );
};

export default memo(HomePage);
