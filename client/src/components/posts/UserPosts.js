import Cookie from "js-cookie";
import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { isAuth } from "../../actions/actions";
import userImage from "../../assests/userImage.png";
require("dotenv").config();

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = Cookie.get("token");
  const userName = user.name;
  const history = useHistory();
  const { _id } = user;

  const getPosts = async () => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/${userName}/posts`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserPosts(data);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const likePost = async (postID) => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/like/${postID}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "get",
      }
    ).then(() => getPosts());
  };

  const unlikePost = async (postID) => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/unlike/${postID}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "get",
      }
    ).then(() => getPosts());
  };

  const deletePost = async (postID) => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/delete/${postID}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "delete",
      }
    ).then(() => {
      getPosts();
      toast.success("Post deleted");
    });
  };

  return (
    <Fragment>
      {isAuth() && (
        <div className="row mr-3 ml-3 mb-3">
          {userPosts.length === 0 && (
            <div className="mt-5 ml-5">
              <h3 style={{ color: "gray" }}>No posts yet</h3>
            </div>
          )}
          {userPosts.map((post, i) => (
            <div
              key={i}
              className="card text-center col-12 mt-3"
              style={{
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
              }}
            >
              <button
                type="button"
                data-toggle="modal"
                data-target="#deletePost"
                style={{
                  alignSelf: "flex-end",
                  marginTop: "0.5rem",
                  background: "none",
                  border: "none",
                  outline: "none",
                }}
              >
                <i
                  className="fas fa-trash fa-lg"
                  style={{
                    alignSelf: "flex-end",
                    color: "red",
                    cursor: "pointer",
                  }}
                ></i>
              </button>
              <div
                className="modal fade"
                id="deletePost"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog"
                  role="document"
                  style={{ boxShadow: "0 8px 16px 0 rgba(0,0,0,0.6)" }}
                >
                  <div className="modal-content">
                    <div className="modal-body">
                      <button
                        type="button"
                        className="close ml-auto"
                        data-dismiss="modal"
                        aria-label="Close"
                        style={{ outline: "none" }}
                      >
                        {" "}
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <p
                        style={{
                          alignSelf: "center",
                          fontWeight: "400",
                          fontSize: "15px",
                        }}
                        className="mt-3"
                      >
                        Are you sure to delete post?
                      </p>
                      <button
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={() => {
                          deletePost(post._id);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="btn btn-secondary ml-2"
                        data-dismiss="modal"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {post.profilepic && (
                <div className="card-img-md-left ml-3 mt-3">
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/api/users/profilepic/${post.user}`}
                    style={{
                      width: "5rem",
                      border: "solid",
                      borderRadius: "75%",
                      borderColor: "white",
                    }}
                    alt="user profilepic"
                  />
                </div>
              )}

              {!post.profilepic && (
                <div className="card-img-md-left ml-3 mt-3">
                  <img
                    src={userImage}
                    alt="user"
                    style={{
                      width: "5rem",
                      border: "solid",
                      borderRadius: "75%",
                      borderColor: "white",
                    }}
                  />
                </div>
              )}
              <p className="ml-4 ">{post.name}</p>
              <p>{post.date}</p>

              {post.photo && (
                <div>
                  <hr />
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/api/posts/view_photo/${post._id}`}
                    style={{
                      width: "15rem",
                      border: "solid",
                      borderColor: "white",
                      alignSelf: "center",
                    }}
                    alt="post_image"
                    className="rounded"
                  />
                  <hr />
                </div>
              )}

              <div className="card-body">
                <p className="card-text">{post.text}</p>

                {post.likes.find((like) => like.user.toString() === _id) && (
                  <div className="row">
                    <div className="col-12">
                      <button
                        className="ml-2"
                        onClick={() => {
                          unlikePost(post._id);
                        }}
                        style={{
                          border: "none",
                          background: "none",
                          outline: "none",
                        }}
                      >
                        <i
                          className="fas fa-heart fa-lg"
                          style={{
                            color: "red",
                            cursor: "pointer",
                          }}
                        >
                          {" "}
                        </i>
                      </button>
                      <a
                        href={`/feed/${post._id}/likes`}
                        className="mr-2"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        {" "}
                        {post.likes.length}
                      </a>{" "}
                      <a
                        href={`/feed/${post._id}/comments`}
                        className="ml-2"
                        style={{ textDecoration: "none" }}
                      >
                        <i
                          className="far fa-comment fa-lg"
                          style={{ color: "gray" }}
                        >
                          {" "}
                        </i>
                        <span style={{ color: "black" }}>
                          {" "}
                          {post.comments.length}
                        </span>
                      </a>
                    </div>
                  </div>
                )}

                {!post.likes.find((like) => like.user.toString() === _id) && (
                  <div className="row">
                    <div className="col-12">
                      <button
                        className="ml-2"
                        onClick={() => {
                          likePost(post._id);
                        }}
                        style={{
                          border: "none",
                          background: "none",
                          outline: "none",
                        }}
                      >
                        <i
                          className="far fa-heart fa-lg"
                          style={{
                            color: "black",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          {" "}
                        </i>
                      </button>
                      <a
                        href={`/feed/${post._id}/likes`}
                        className="mr-2"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        {" "}
                        {post.likes.length}
                      </a>{" "}
                      <a
                        href={`/feed/${post._id}/comments`}
                        className="ml-2"
                        style={{ textDecoration: "none" }}
                      >
                        <i
                          className="far fa-comment fa-lg"
                          style={{ color: "gray" }}
                        >
                          {" "}
                        </i>
                        <span style={{ color: "black" }}>
                          {" "}
                          {post.comments.length}
                        </span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {!isAuth() && history.push("/")}
      <ToastContainer className="Toastify__toast-container--top-center" />
    </Fragment>
  );
};

export default UserPosts;
