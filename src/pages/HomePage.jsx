import React, { useEffect, useState } from "react";
// import HomeLayout from "../Components/HomeLayout";
import Post from "../Components/Post";
import AddPost from "../Components/AddPost";
import axios from "axios";
import { v4 as uuid } from "uuid";
import LoadingSuspese from "../Components/LoadingSuspense";

const HomePage = () => {
  const baseURL = "https://attachin.com/api/";
  let [posts, setPosts] = useState(null);
  let [limit, setLimit] = useState(10);
  let [fetching, setFetching] = useState(false);

  useEffect(() => {
    axios.get(baseURL + "getAllHomePosts?limit=" + limit).then((res) => {
      console.log(res.data.data);
      setPosts(res.data.data);
      setFetching(false);
    });
  }, [limit]);

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
                  backgroundColor: "var(--main-color)",
                  color: "var(--offWhite-color)",
                }}
                onClick={() => {
                  setFetching(true);
                  // window.scrollTo(0, document.body.scrollHeight);
                  // bottomDiv.scrollIntoView();
                  setLimit((old) => old + 5);
                }}
              >
                Load More Posts
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

export default HomePage;
