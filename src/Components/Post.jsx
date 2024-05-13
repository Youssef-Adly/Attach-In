import React from "react";
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

const Post = () => {
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
                  src="https://github.com/mdo.png"
                  alt=""
                />
              </Link>
            </div>
            {/* Info */}
            <div>
              <div className="nav nav-divider">
                <h6 className="nav-item card-title mb-0">
                  <Link to=""> Lori Ferguson </Link>
                </h6>
                {/* <span className="nav-item small"> 2hr</span> */}
              </div>
              <p className="mb-0 small">Web Developer at Webestica</p>
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
        <p>
          I'm thrilled to share that I've completed a graduate certificate
          course in project management with the president's honor roll.
        </p>
        {/* Card img */}
        <img
          className="card-img"
          src="https://social.webestica.com/assets/images/post/3by2/01.jpg"
          alt="Post"
        />
        {/* Feed react START */}
        <ul className="nav nav-stack py-3 small">
          <li className="nav-item">
            <Link
              className="nav-link liked"
              to=""
              data-bs-container="body"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-html="true"
              data-bs-custom-class="tooltip-text-start"
              data-bs-title="Frances Guerrero<br> Lori Stevens<br> Billy Vasquez<br> Judy Nguyen<br> Larry Lawson<br> Amanda Reed<br> Louis Crawford"
            >
              <FontAwesomeIcon icon={faHeart} className="pe-1" />
              Liked (56)
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#!">
              <FontAwesomeIcon icon={faCommentDots} className="pe-1" />
              Comments (12)
            </a>
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
              Share (3)
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
                src="https://social.webestica.com/assets/images/avatar/12.jpg"
                alt=""
              />
            </Link>
          </div>
          {/* Comment box  */}
          <form className="nav nav-item w-100 position-relative">
            <textarea
              data-autoresize
              className="form-control pe-5 bg-light"
              rows={1}
              placeholder="Add a comment..."
              defaultValue={""}
            />
            <button
              className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
              type="submit"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
        {/* Comment wrap START */}
        <ul className="comment-wrap list-unstyled">
          {/* Comment item START */}
          <li className="comment-item">
            <div className="d-flex position-relative">
              {/* Avatar */}
              <div className="avatar avatar-xs">
                <Link to="">
                  <img
                    className="avatar-img rounded-circle"
                    src="https://social.webestica.com/assets/images/avatar/06.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="ms-2">
                {/* Comment by */}
                <div className="bg-light rounded-start-top-0 p-3 rounded">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-1">
                      <Link to=""> Frances Guerrero </Link>
                    </h6>
                    <small className="ms-2">5hr</small>
                  </div>
                  <p className="small mb-0">
                    Removed demands expense account in outward tedious do.
                    Particular way thoroughly unaffected projection.
                  </p>
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
                          <FontAwesomeIcon icon={faTrash} className="pe-2" />
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
            {/* Comment item nested START */}
            <ul className="comment-item-nested list-unstyled">
              {/* Comment item START */}
              <li className="comment-item">
                <div className="d-flex">
                  {/* Avatar */}
                  <div className="avatar avatar-xs">
                    <Link to="">
                      <img
                        className="avatar-img rounded-circle"
                        src="https://social.webestica.com/assets/images/avatar/06.jpg"
                        alt=""
                      />
                    </Link>
                  </div>
                  {/* Comment by */}
                  <div className="ms-2">
                    <div className="bg-light p-3 rounded">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">
                          <Link to=""> Lori Stevens </Link>
                        </h6>
                        <small className="ms-2">2hr</small>
                      </div>
                      <p className="small mb-0">
                        See resolved goodness felicity shy civility domestic had
                        but Drawings offended yet answered Jennings perceive.
                      </p>
                    </div>
                    {/* Comment react */}
                    <ul className="nav nav-divider py-2 small">
                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          Like (5)
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          Reply
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              {/* Comment item END */}
              {/* Comment item START */}
              <li className="comment-item">
                <div className="d-flex">
                  {/* Avatar */}
                  <div className="avatar avatar-story avatar-xs">
                    <Link to="">
                      <img
                        className="avatar-img rounded-circle"
                        src="https://social.webestica.com/assets/images/avatar/06.jpg"
                        alt=""
                      />
                    </Link>
                  </div>
                  {/* Comment by */}
                  <div className="ms-2">
                    <div className="bg-light p-3 rounded">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-1">
                          <Link to=""> Billy Vasquez </Link>
                        </h6>
                        <small className="ms-2">15min</small>
                      </div>
                      <p className="small mb-0">
                        Wishing calling is warrant settled was lucky.
                      </p>
                    </div>
                    {/* Comment react */}
                    <ul className="nav nav-divider py-2 small">
                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          Like
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="">
                          Reply
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              {/* Comment item END */}
            </ul>
            {/* Load more replies */}
            <Link
              to=""
              role="button"
              className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center mb-3 ms-5"
              data-bs-toggle="button"
              aria-pressed="true"
            >
              <FontAwesomeIcon icon={faEllipsis} className="me-2" />
              Load more replies
            </Link>
            {/* Comment item nested END */}
          </li>
          {/* Comment item END */}
          {/* Comment item START */}
          <li className="comment-item">
            <div className="d-flex">
              {/* Avatar */}
              <div className="avatar avatar-xs">
                <Link to="">
                  <img
                    className="avatar-img rounded-circle"
                    src="https://social.webestica.com/assets/images/avatar/06.jpg"
                    alt=""
                  />
                </Link>
              </div>
              {/* Comment by */}
              <div className="ms-2">
                <div className="bg-light p-3 rounded">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-1">
                      <Link to=""> Frances Guerrero </Link>
                    </h6>
                    <small className="ms-2">4min</small>
                  </div>
                  <p className="small mb-0">
                    Removed demands expense account in outward tedious do.
                    Particular way thoroughly unaffected projection.
                  </p>
                </div>
                {/* Comment react */}
                <ul className="nav nav-divider pt-2 small">
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      Like (1)
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#!">
                      Reply
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="">
                      View 6 replies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          {/* Comment item END */}
        </ul>
        {/* Comment wrap END */}
      </div>
      {/* Card body END */}
      {/* Card footer START */}
      <div className="card-footer border-0 pt-0">
        {/* Load more comments */}
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
      {/* Card footer END */}
    </div>
  );
};

export default Post;
