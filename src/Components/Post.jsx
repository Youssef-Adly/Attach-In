import React, { memo, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faEllipsis,
  faHeart,
  faPaperPlane,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { formatDateForPost } from "./formatDateForPost";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingSuspese from "./LoadingSuspense";
import { useTranslation } from "react-i18next";

const Post = ({
  id,
  user_id,
  parent_id,
  title,
  image,
  turn_of_comments,
  created_at,
  love,
  user,
  comments,
  parent,
  lovers,
  postState: [postIndex, setPosts],
}) => {
  const baseURL = "https://attachin.com/";
  const commentBox = useRef();
  const report = useRef();
  const thoughts = useRef();
  const titleEditPost = useRef();
  const navigate = useNavigate();
  const [t] = useTranslation();
  const authUser = useSelector((state) => state.Auth.user);
  let [loadingShare, setloadingShare] = useState(false);
  let [loadingReport, setloadingReport] = useState(false);
  let [loadingEdit, setloadingEdit] = useState(false);
  const isMyPost = authUser.id === user_id;
  let [turnOffComment, setTurnOffComment] = useState(turn_of_comments !== "0");

  const [likes, setLikes] = useState([...lovers]); // Copy the likes array to avoid mutation

  const [isLiked, setIsLiked] = useState(() => {
    // Check if any like object has a userId property matching yourUserId
    return likes.some((like) => like.user_id === authUser.id);
  });

  // Like Button
  const handleLikeClick = async (id) => {
    const newIsLiked = !isLiked;
    const newLikes = [...likes]; // Create a copy to avoid mutation

    // API Call
    try {
      const response = await axios.post(
        "https://attachin.com/api/addUserPostLove",
        { post_id: id },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      const love = response.data.data;

      if (newIsLiked) {
        newLikes.push(love); // Push like object from API response
      } else {
        const likeIndex = newLikes.findIndex(
          (like) => like.user_id === love.user_id
        );
        newLikes.splice(likeIndex, 1); // Remove like object
      }
      setLikes(newLikes);
      setIsLiked(newIsLiked);
    } catch (err) {
      if (err.response.data.errors[0] === "Unauthenticated") {
        console.log(err.response.data.errors[0]);
        navigate("/login");
      } else {
        console.error("Error liking post:", err);
      }
      // Handle errors appropriately (e.g., display error message to user)
    }
  };

  // Comments Logic Here
  const [commentLength, setcommentLength] = useState(2);
  const [allComments, setComments] = useState(comments);

  const addComment = async (e) => {
    e.preventDefault();
    const commentValue = commentBox.current.value;
    if (commentValue.trim().length > 0 && !turnOffComment) {
      await axios
        .post(
          "https://attachin.com/api/addUserPostComment",
          { post_id: id, comment: commentValue },
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data.data);
          setComments((old) => [{ ...res.data.data, user: authUser }, ...old]);
          commentBox.current.value = "";
          commentBox.current.rows = 1;
        })
        .catch((err) => {
          if (err.response.data.errors[0] === "Unauthenticated") {
            console.log(err.response.data.errors[0]);
            navigate("/login");
          } else {
            console.log("error adding Comment" + err);
          }
        });
    } /* else {
      commentBox.current.rows = commentBox.current.value.split("\n").length;
      return;
    } */
  };

  const deletePost = async (id) => {
    await axios
      .post(
        baseURL + "api/deletePost",
        { post_id: id },
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      )
      .then((res) => {
        // console.log("res: ", res);
        setPosts((old) => old.filter((o) => o.id !== id));
      })
      .catch((err) => {
        if (err.response.data.errors[0] === "Unauthenticated") {
          console.log(err.response.data.errors[0]);
          navigate("/login");
        } else {
          console.log("error deleting Post" + err);
        }
      });
  };

  const turnOffComments = async (id) => {
    await axios
      .post(
        baseURL + "api/changeUserPostTurnOffComments",
        { post_id: id },
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      )
      .then((res) => {
        // console.log("res: ", res);
        setTurnOffComment((old) => !old);
      })
      .catch((err) => {
        if (err.response.data.errors[0] === "Unauthenticated") {
          console.log(err.response.data.errors[0]);
          navigate("/login");
        } else {
          console.log("error adding Comment" + err);
        }
        console.log("error Turning Off Comments " + err);
      });
  };

  const reportSubmit = async () => {
    let reportValue = report.current.value;
    if (reportValue.trim().length > 0) {
      setloadingReport(true);
      await axios
        .post(
          baseURL + "api/reportUserRequest",
          {
            user_id_2: user.id,
            reason: reportValue,
          },
          { headers: { Authorization: `Bearer ${authUser.token}` } }
        )
        .then((res) => {
          // console.log(res);
          report.current.value = "";
          setloadingReport(false);
        })
        .catch((err) => {
          if (err.response.data.errors[0] === "Unauthenticated") {
            console.log(err.response.data.errors[0]);
            setloadingReport(false);
            navigate("/login");
            window.location.reload();
          } else {
            console.log("error adding Comment" + err);
          }
          console.log("error submiting report " + err);
          setloadingReport(false);
          // report.current.value = "";
        });
    }
  };

  const instantShare = async () => {
    await axios
      .post(
        baseURL + "api/addUserRePost",
        { parent_id: id },
        {
          headers: { Authorization: `Bearer ${authUser.token}` },
        }
      )
      .then((res) => {
        // console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.data.errors[0] === "Unauthenticated") {
          console.log(err.response.data.errors[0]);
          navigate("/login");
        } else {
          console.log("error Sharing" + err);
        }
        console.log("error Sharing " + err);
      });
  };

  const shareWithThoughts = async () => {
    let title = thoughts.current.value;
    if (title.trim().length > 0) {
      setloadingShare(true);
      await axios
        .post(
          baseURL + "api/addUserRePost",
          { parent_id: id, title: title },
          {
            headers: { Authorization: `Bearer ${authUser.token}` },
          }
        )
        .then((res) => {
          // console.log(res);
          window.location.reload();
          // thoughts.current.value = "";
          // setloadingShare(false);
        })
        .catch((err) => {
          if (err.response.data.errors[0] === "Unauthenticated") {
            console.log(err.response.data.errors[0]);
            setloadingShare(false);
            navigate("/login");
            window.location.reload();
          } else {
            console.log("error Sharing" + err);
          }
          console.log("error Sharing " + err);
          setloadingShare(false);
        });
    }
  };

  const editPost = async () => {
    let title = titleEditPost.current.value;
    if (title.trim().length > 0) {
      setloadingEdit(true);
      await axios
        .post(
          baseURL + "api/editUserPost",
          {
            title: title,
            post_id: id,
          },
          { headers: { Authorization: `Bearer ${authUser.token}` } }
        )
        .then((res) => {
          // console.log(res);
          window.location.reload();
          // setloadingEdit(true);
        })
        .catch((err) => {
          if (err.response.data.errors[0] === "Unauthenticated") {
            console.log(err.response.data.errors[0]);
            setloadingEdit(false);
            navigate("/login");
            window.location.reload();
          } else {
            console.log("error Editing Post" + err);
            setloadingEdit(false);
          }
        });
    }
  };

  return (
    <div className="card rounded-4">
      {/* Card header START */}
      <div className="card-header border-0 pb-0 ">
        <div className="d-flex align-items-center justify-content-between p-2">
          <div className="d-flex align-items-center">
            {/* Avatar */}
            <div className="avatar avatar-story me-2">
              <Link
                to={
                  authUser.id === user_id
                    ? `/profile`
                    : user.user_type === "student"
                    ? `/profile/${user_id}`
                    : user.user_type === "university"
                    ? `/universityProfile/${user_id}`
                    : user.user_type === "company"
                    ? `/companyProfile/${user_id}`
                    : ""
                }
              >
                <img
                  className="avatar-img rounded-circle"
                  src={
                    user.profile_photo
                      ? `${baseURL + user.profile_photo}`
                      : "/profile.png"
                  }
                  alt=""
                />
              </Link>
            </div>
            {/* Info */}
            <div>
              <div className="nav nav-divider">
                <h6 className="nav-item card-title mb-0">
                  <Link
                    to={
                      authUser.id === user_id
                        ? `/profile`
                        : user.user_type === "student"
                        ? `/profile/${user_id}`
                        : user.user_type === "university"
                        ? `/universityProfile/${user_id}`
                        : user.user_type === "company"
                        ? `/companyProfile/${user_id}`
                        : ""
                    }
                  >
                    {user.full_name}
                  </Link>
                </h6>
                {/* <span className="nav-item small"> 2hr</span> */}
              </div>
              <p className="mb-0 small">{formatDateForPost(created_at)}</p>
            </div>
          </div>
          {/* Card feed action dropdown START */}
          <div className="dropdown">
            <Link
              to=""
              className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
              id="cardFeedAction"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </Link>
            {/* Card feed action dropdown menu */}
            <ul
              className="dropdown-menu dropdown-menu-end mt-3 p-2 rounded-4"
              aria-labelledby="feedActionShare"
              style={{ backgroundColor: "var(--offWhite-color)" }}
            >
              {isMyPost && (
                <li className="mt-1">
                  <Link
                    className="dropdown-item rounded-4 border border-1 border-dark-subtle"
                    data-bs-toggle="modal"
                    data-bs-target={"#editModel" + id}
                  >
                    <img
                      src="/edit.svg"
                      alt="Edit Post"
                      className="pe-2"
                      style={{ width: "35px" }}
                    />
                    {t("Edit this Post")}
                  </Link>
                </li>
              )}
              {!isMyPost && (
                <li className="mt-1">
                  <Link className="dropdown-item rounded-4 border border-1 border-dark-subtle">
                    <img src="/reportIcon.svg" alt="report" className="pe-2" />
                    {t("Report this Profile")}
                  </Link>
                </li>
              )}
              {isMyPost && (
                <li className="mt-2">
                  <Link
                    onClick={() => deletePost(id)}
                    className="dropdown-item rounded-4 border border-1 border-dark-subtle"
                  >
                    <img src="/deleteIcon.svg" alt="delete" className="pe-2" />
                    {t("Delete Post")}
                  </Link>
                </li>
              )}
              {isMyPost && (
                <li className="mt-2">
                  <Link
                    onClick={() => turnOffComments(id)}
                    className="dropdown-item rounded-4 border border-1 border-dark-subtle"
                  >
                    <img src="/BlockIcon.svg" alt="block" className="pe-2" />
                    {!turnOffComment
                      ? t("Turn off Comments")
                      : t("Turn on Comments")}
                  </Link>
                </li>
              )}
              {!isMyPost && (
                <>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="mt-2">
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target={"#Report" + id}
                      className="dropdown-item rounded-4 border border-1 border-dark-subtle"
                    >
                      <img src="/BlockIcon.svg" alt="block" className="pe-2" />
                      {t("Report This Person")}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* Card feed action dropdown END */}
        </div>
      </div>
      {/* Card header END */}
      {/* Card body START */}
      <div className="card-body">
        <p>{title}</p>
        {/* Card img */}
        {image && (
          <img
            // className="card-img"
            src={baseURL + image}
            // src="https://social.webestica.com/assets/images/post/3by2/01.jpg"
            alt="Post"
            style={{
              maxHeight: "500px",
              maxWidth: "100%",
              margin: "auto",
            }}
          />
        )}
        {/* Parent Post If Existed */}
        {/* {console.log("parent: ", parent)} */}
        {parent && (
          <div className="bg-body-secondary rounded-4">
            <div className="card-header border-0 pb-0 ">
              <div className="d-flex align-items-center justify-content-between p-2">
                <div className="d-flex align-items-center">
                  {/* Avatar */}
                  <div className="avatar avatar-story me-2">
                    <Link
                      to={
                        authUser.id === parent.user.id
                          ? `/profile`
                          : user.user_type === "student"
                          ? `/profile/${parent.user.id}`
                          : user.user_type === "university"
                          ? `/universityProfile/${parent.user.id}`
                          : user.user_type === "company"
                          ? `/companyProfile/${parent.user.id}`
                          : ""
                      }
                    >
                      <img
                        className="avatar-img rounded-circle"
                        src={
                          parent.user.profile_photo
                            ? `${baseURL + parent.user.profile_photo}`
                            : "/profile.png"
                        }
                        alt=""
                      />
                    </Link>
                  </div>
                  {/* Info */}
                  <div>
                    <div className="nav nav-divider">
                      <h6 className="nav-item card-title mb-0">
                        <Link
                          to={
                            authUser.id === parent.user.id
                              ? `/profile`
                              : user.user_type === "student"
                              ? `/profile/${parent.user.id}`
                              : user.user_type === "university"
                              ? `/universityProfile/${parent.user.id}`
                              : user.user_type === "company"
                              ? `/companyProfile/${parent.user.id}`
                              : ""
                          }
                        >
                          {parent.user.full_name}
                        </Link>
                      </h6>
                      {/* <span className="nav-item small"> 2hr</span> */}
                    </div>
                    <p className="mb-0 small">
                      {formatDateForPost(parent.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p>{parent.title}</p>
              {/* Card img */}
              {parent.image && (
                <img
                  // className="card-img"
                  src={baseURL + parent.image}
                  // src="https://social.webestica.com/assets/images/post/3by2/01.jpg"
                  alt="Post"
                  style={{
                    maxHeight: "500px",
                    maxWidth: "100%",
                    margin: "auto",
                  }}
                />
              )}
            </div>
          </div>
        )}
        {/* Parent Post End */}
        {/* Feed react START */}
        <ul className="nav nav-stack py-3 small">
          {/* Like */}
          <li className="nav-item">
            <Link
              className={
                isLiked
                  ? "nav-link liked noTransition"
                  : "nav-link noTransition"
              }
              onClick={() => handleLikeClick(id)}
              // style={{
              //   color: "var(--main-color)",
              // }}
            >
              <FontAwesomeIcon icon={faHeart} className="pe-1" />
              {isLiked ? t("unlike") : t("like")} ({likes.length})
            </Link>
          </li>
          {/* Comment */}
          <li className="nav-item">
            <Link
              onClick={() => commentBox.current.focus()}
              className="nav-link"
            >
              {/* {console.log('commentBox: ', commentBox)} */}
              <FontAwesomeIcon icon={faCommentDots} className="pe-1" />
              {t("comment")} ({allComments.length})
            </Link>
          </li>
          {/* Share */}
          <li className="nav-item dropdown ms-sm-auto">
            <Link
              className="nav-link mb-0"
              id="cardShareAction"
              data-bs-toggle="dropdown"
            >
              <FontAwesomeIcon icon={faShare} className="pe-1" />
              {t("share")} {/* (3) */}
            </Link>
            {/* Card share action dropdown menu */}
            <ul
              className="dropdown-menu dropdown-menu-end mt-3 p-2 rounded-4"
              aria-labelledby="feedActionShare"
              style={{ backgroundColor: "var(--offWhite-color)" }}
            >
              {/* Share Your thoughts */}
              <li className="mt-1">
                <Link
                  className="dropdown-item rounded-4 border border-1 border-dark-subtle"
                  data-bs-toggle="modal"
                  data-bs-target={"#shareModel" + id}
                >
                  <img
                    src="/share.svg"
                    alt="Edit Post"
                    className="me-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#eee",
                      padding: "5px",
                      borderRadius: "50%",
                    }}
                  />
                  {t("Share Your thoughts")}
                  {/* Share Your thoughts */}
                </Link>
              </li>
              {/* Instant Share */}
              <li className="mt-1">
                <Link
                  className="dropdown-item rounded-4 border border-1 border-dark-subtle"
                  onClick={instantShare}
                >
                  <img
                    src="/shareInstant.svg"
                    alt="Edit Post"
                    className="me-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#eee",
                      padding: "5px",
                      borderRadius: "50%",
                    }}
                  />
                  {t("Repost instantly")}
                </Link>
              </li>
            </ul>
          </li>
          {/* Card share action END */}
        </ul>
        {/* Feed react END */}
        {/* Add comment */}
        <div className="d-flex mb-3">
          {/* Avatar */}
          <div className="avatar avatar-xs me-2">
            <Link to={`/profile`}>
              <img
                className="avatar-img rounded-circle"
                src={
                  authUser.profile_photo
                    ? baseURL + authUser.profile_photo
                    : "/profile.png"
                }
                // src="https://social.webestica.com/assets/images/avatar/12.jpg"
                alt=""
              />
            </Link>
          </div>
          {/* Comment box  */}
          <div className="nav nav-item w-100 position-relative">
            <textarea
              data-autoresize
              className="form-control pe-5"
              ref={commentBox}
              rows={!turnOffComment ? 1 : 2}
              placeholder={
                turnOffComment
                  ? t("Comments Turned Off By Auther")
                  : t("Add a comment")
              }
              defaultValue={""}
              disabled={turnOffComment}
              onKeyUp={(e) => {
                console.log(commentBox.current.value.split("\n").length);
                commentBox.current.rows =
                  commentBox.current.value.split("\n").length;
                if (e.key === "Enter" && !e.shiftKey) {
                  addComment(e);
                }
              }}
            />
            <button
              className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
              onClick={(e) => addComment(e)}
              // disabled={turnOffComment}
              style={{
                cursor: turnOffComment ? "not-allowed" : "",
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
        {/* Comments wrap START */}
        <ul className="comment-wrap list-unstyled">
          {/* Comments items START */}
          {allComments.length > 0 &&
            allComments.slice(0, commentLength).map((comment) => (
              <li className="comment-item" key={uuid()}>
                <div className="d-flex position-relative">
                  {/* Avatar */}
                  <div className="avatar avatar-xs">
                    <Link
                      to={
                        authUser.id === comment.user.id
                          ? `/profile`
                          : comment.user.user_type === "student"
                          ? `/profile/${comment.user.id}`
                          : comment.user.user_type === "university"
                          ? `/universityProfile/${comment.user.id}`
                          : comment.user.user_type === "company"
                          ? `/companyProfile/${comment.user.id}`
                          : ""
                      }
                    >
                      <img
                        className="avatar-img rounded-circle"
                        src={
                          comment.user.profile_photo
                            ? `${baseURL + comment.user.profile_photo}`
                            : "/profile.png"
                        }
                        // src="https://social.webestica.com/assets/images/avatar/06.jpg"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="ms-2 col-sm">
                    {/* Comment by */}
                    <div className="rounded-start-top-0 p-3 rounded pb-0">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">
                          <Link
                            to={
                              authUser.id === comment.user.id
                                ? `/profile`
                                : comment.user.user_type === "student"
                                ? `/profile/${comment.user.id}`
                                : comment.user.user_type === "university"
                                ? `/universityProfile/${comment.user.id}`
                                : comment.user.user_type === "company"
                                ? `/companyProfile/${comment.user.id}`
                                : ""
                            }
                          >
                            {comment.user.full_name}
                          </Link>
                        </h6>
                        <small className="ms-2">
                          {formatDateForPost(comment.created_at)}
                        </small>
                      </div>
                      <p className="small mb-0">{comment.comment}</p>
                    </div>
                    {/* Comment react */}
                    {/* <ul className="nav nav-divider py-2 small">
                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          Like (3)
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          Reply
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          View 5 replies
                        </Link>
                      </li>
                      <li className="nav-item dropdown  ms-auto">
                        <Link
                          className="nav-link mb-0"
                          to=""
                          id="cardShareAction2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FontAwesomeIcon icon={faEllipsis} />
                        </Link>
                        <ul
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="cardShareAction2"
                        >
                          <li>
                            <Link className="dropdown-item" to="">
                              <FontAwesomeIcon icon={faFlag} className="pe-2" />
                              Report This Comment
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="">
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="pe-2"
                              />
                              Delete this comment
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                            >
                              <FontAwesomeIcon
                                icon={faUserSlash}
                                className="pe-1"
                              />
                              Report this person
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>

                          <li>
                            <Link className="dropdown-item" to="">
                              <FontAwesomeIcon
                                icon={faCommentSlash}
                                className="pe-1"
                              />
                              Turn off comments
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul> */}
                  </div>
                </div>
              </li>
            ))}
        </ul>
        {/* Comment wrap END */}
      </div>
      {/* Card body END */}
      {/* Card footer START */}

      {/* Report Person Model */}
      <div
        className="modal fade "
        id={"Report" + id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        {!loadingReport ? (
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                background: "var(--main-color)",
                color: "#eee",
              }}
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id={"Report" + id}>
                  {t("Report User Request")}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor={"Report" + id}
                    className="form-label dir d-block pb-2"
                  >
                    {t("Please Provide A Reason To Be Reviewed")}
                  </label>
                  <textarea
                    className="form-control"
                    id={"Report" + id}
                    rows={3}
                    defaultValue={""}
                    ref={report}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {t("Cancel")}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={reportSubmit}
                >
                  {t("Send")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <LoadingSuspese />
        )}
      </div>

      {/* Share With Thoughts Model */}
      <div
        className="modal fade "
        id={"shareModel" + id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        {!loadingShare ? (
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                background: "var(--main-color)",
                color: "#eee",
              }}
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {t("Share Post")}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor={"share" + id}
                    className="form-label d-block pb-2 dir"
                  >
                    {t("Share With Your Thoughts")}
                  </label>
                  <textarea
                    className="form-control"
                    id={"share" + id}
                    rows={2}
                    defaultValue={""}
                    ref={thoughts}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {t("Cancel")}
                </button>
                <button
                  type="button"
                  onClick={shareWithThoughts}
                  className="btn btn-danger"
                >
                  {t("share")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <LoadingSuspese />
        )}
      </div>

      {/* Edit Post Model */}
      <div
        className="modal fade "
        id={"editModel" + id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        {!loadingEdit ? (
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{
                background: "var(--main-color)",
                color: "#eee",
              }}
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {t("Edit Post")}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor={"edit" + id} className="form-label">
                    {t("Edit this Post ")}
                  </label>
                  <textarea
                    className="form-control"
                    id={"edit" + id}
                    rows={2}
                    defaultValue={title}
                    ref={titleEditPost}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {t("Cancel")}
                </button>
                <button
                  type="button"
                  onClick={editPost}
                  className="btn btn-danger"
                >
                  {t("Done")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <LoadingSuspese />
        )}
      </div>

      {/* Load more comments */}
      {comments.length > commentLength && (
        <div
          className="card-footer border-0 pt-0 ms-auto"
          style={{
            background: "none",
          }}
        >
          <Link
            to=""
            role="button"
            className="btn btn-link btn-link-loader btn-sm d-flex align-items-center"
            data-bs-toggle="button"
            aria-pressed="true"
            onClick={() => setcommentLength((old) => old + 2)}
          >
            <FontAwesomeIcon icon={faEllipsis} className="me-2" />
            {t("Load more comments")}
          </Link>
        </div>
      )}
      {/* Card footer END */}
    </div>
  );
};

export default memo(Post);
