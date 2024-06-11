import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faCommentSlash,
  faCopy,
  faEllipsis,
  faFlag,
  faHeart,
  faPaperPlane,
  faShare,
  faShareNodes,
  faTrash,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import { formatDateForPost } from "./formatDateForPost";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import axios from "axios";

/* 
{
            "id": 99,
            "user_id": 48,
            "parent_id": 0,
            "title": "keif 7alkom",
            "image": "",
            "turn_of_comments": "0",
            "created_at": "2024-06-07T16:59:42.000000Z",
            "love": 0,
            "user": {
                "id": 48,
                "user_type": "student",
                "full_name": "Fady Ezat",
                "profile_photo": null,
                "profile_cover": null,
                "bio": null
            },
            "comments": [
                {
                    "id": 53,
                    "post_id": 99,
                    "user_id": 39,
                    "comment": "b5ier",
                    "created_at": "2024-06-07T17:00:05.000000Z",
                    "updated_at": "2024-06-07T17:00:05.000000Z",
                    "user": {
                        "id": 39,
                        "user_type": "student",
                        "full_name": "Fady Ezat",
                        "profile_photo": "images/users/1717177227701992.jpg",
                        "profile_cover": "images/users/1717177227735184.jpg",
                        "bio": "App"
                    }
                }
            ],
            "parent": null,
            "lovers": [
                {
                    "id": 97,
                    "post_id": 99,
                    "user_id": 39,
                    "created_at": "2024-06-07T17:00:00.000000Z",
                    "updated_at": "2024-06-07T17:00:00.000000Z"
                }
            ]
        },

*/

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
  const authUser = useSelector((state) => state.Auth.user);
  // console.log("authUser: ", authUser);

  const [likes, setLikes] = useState(lovers.slice()); // Copy the likes array to avoid mutation

  const [isLiked, setIsLiked] = useState(() => {
    // Check if any like object has a userId property matching yourUserId
    return likes.some((like) => like.user_id === authUser.id);
  });

  // Like Button
  const handleLikeClick = async (id) => {
    const newIsLiked = !isLiked;
    const newLikes = [...likes]; // Create a copy to avoid mutation

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
    } catch (error) {
      console.error("Error liking post:", error);
      // Handle errors appropriately (e.g., display error message to user)
    }
  };

  // Comments Logic Here
  const [allComments, setComments] = useState(comments);
  // console.log("allComments: ", allComments);

  const addComment = async (e) => {
    e.preventDefault();
    const commentValue = commentBox.current.value;
    if (commentValue.trim().length > 0) {
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
          console.log(res.data.data);
          setComments((old) => [{ ...res.data.data, user: authUser }, ...old]);
          commentBox.current.value = "";
          commentBox.current.rows = 1;
        });
    } else {
      commentBox.current.rows = commentBox.current.value.split("\n").length;
      return;
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
              <Link to="">
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
                  <Link to="">{user.full_name}</Link>
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
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="cardFeedAction"
            >
              <li>
                <Link className="dropdown-item" to="">
                  <i className="bi bi-bookmark fa-fw pe-2" />
                  Save post
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="">
                  <i className="bi bi-person-x fa-fw pe-2" />
                  Unfollow lori ferguson
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="">
                  <i className="bi bi-x-circle fa-fw pe-2" />
                  Hide post
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="">
                  <i className="bi bi-slash-circle fa-fw pe-2" />
                  Block
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="">
                  <i className="bi bi-flag fa-fw pe-2" />
                  Report post
                </Link>
              </li>
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
            className="card-img"
            src={baseURL + image}
            // src="https://social.webestica.com/assets/images/post/3by2/01.jpg"
            alt="Post"
          />
        )}
        {/* Feed react START */}
        <ul className="nav nav-stack py-3 small">
          <li className="nav-item">
            <Link
              className={isLiked ? "nav-link liked" : "nav-link"}
              to=""
              onClick={() => handleLikeClick(id)}
              // data-bs-container="body"
              // data-bs-toggle="tooltip"
              // data-bs-placement="top"
              // data-bs-html="true"
              // data-bs-custom-class="tooltip-text-start"
              // data-bs-title="Frances Guerrero<br> Lori Stevens<br> Billy Vasquez<br> Judy Nguyen<br> Larry Lawson<br> Amanda Reed<br> Louis Crawford"
            >
              <FontAwesomeIcon icon={faHeart} className="pe-1" />
              {isLiked ? "Unlike" : "Like"} ({likes.length})
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={() => commentBox.current.focus()}
              className="nav-link"
            >
              {/* {console.log('commentBox: ', commentBox)} */}
              <FontAwesomeIcon icon={faCommentDots} className="pe-1" />
              Comments ({allComments.length})
            </Link>
          </li>
          {/* Card share action START */}
          <li className="nav-item dropdown ms-sm-auto">
            <Link
              className="nav-link mb-0"
              to=""
              id="cardShareAction"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faShare} className="pe-1" />
              Share {/* (3) */}
            </Link>
            {/* Card share action dropdown menu */}
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="cardShareAction"
            >
              {/* <li>
                <Link className="dropdown-item" to="">
                  Send via Direct Message
                </Link>
              </li> */}
              <li>
                <Link className="dropdown-item" to="">
                  <FontAwesomeIcon icon={faFlag} className="pe-2" />
                  Report This Post
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="">
                  <FontAwesomeIcon icon={faCopy} className="pe-2" />
                  Copy link to post
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="">
                  <FontAwesomeIcon icon={faShareNodes} className="pe-2" />
                  Share post via …
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="">
                  <FontAwesomeIcon icon={faUserSlash} className="pe-1" />
                  Block this person
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="">
                  <FontAwesomeIcon icon={faShare} className="pe-2" />
                  Share on Attach in
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
            <Link to="">
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
              rows={1}
              placeholder="Add a comment..."
              defaultValue={""}
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
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
        {/* Comments wrap START */}
        <ul className="comment-wrap list-unstyled">
          {/* Comments items START */}
          {allComments.length > 0 &&
            allComments.map((comment) => (
              <li className="comment-item" key={uuid()}>
                <div className="d-flex position-relative">
                  {/* Avatar */}
                  <div className="avatar avatar-xs">
                    <Link to="">
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
                          <Link to=""> {comment.user.full_name} </Link>
                        </h6>
                        <small className="ms-2">
                          {formatDateForPost(comment.created_at)}
                        </small>
                      </div>
                      <p className="small mb-0">{comment.comment}</p>
                    </div>
                    {/* Comment react */}
                    <ul className="nav nav-divider py-2 small">
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
                      {/*  */}
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
                        {/* Card share action dropdown menu */}
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
                            <Link className="dropdown-item" to="">
                              <FontAwesomeIcon
                                icon={faUserSlash}
                                className="pe-1"
                              />
                              Block this person
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
                    </ul>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        {/* Comment wrap END */}
      </div>
      {/* Card body END */}
      {/* Card footer START */}
      {/* Load more comments */}
      {false && (
        <div className="card-footer border-0 pt-0">
          <Link
            to=""
            role="button"
            className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
            data-bs-toggle="button"
            aria-pressed="true"
          >
            <FontAwesomeIcon icon={faEllipsis} className="me-2" />
            Load more comments
          </Link>
        </div>
      )}
      {/* Card footer END */}
    </div>
  );
};

export default Post;
