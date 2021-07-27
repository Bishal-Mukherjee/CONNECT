import React from "react";
import { Fragment } from "react";
import { isAuth } from "../../actions/actions";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Cookie from "js-cookie";
import { useEffect } from "react";
import userImage from "../../assests/userImage.png";
require("dotenv").config();
/*this shows the posts of the user, that the user whom the logged in
wants*/

const CurrentUserPosts = () => {
  const history = useHistory();
  const userID = window.location.href.substring(22, 46);
  const [posts, setPosts] = useState([]);
  const token = Cookie.get("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const { _id } = user;

  const getPosts = async () => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/${userID}/getposts`,
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
        setPosts(data);
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

  return (
    <Fragment>
      {isAuth() && (
        <div className="row mr-3 ml-3 mb-3 mt-5">
          {posts.length === 0 && (
            <div className="mt-5 ml-5">
              <h3 style={{ color: "gray" }}>No posts yet</h3>
            </div>
          )}
          {posts.map((post, i) => (
            <div
              key={i}
              className="card text-center col-12 mt-3"
              style={{
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
              }}
            >
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
              <p className="mt-2">{post.date}</p>
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
              <div className="card-body">
                <p className="card-text">{post.text}</p>

                {post.likes.find((like) => like.user.toString() === _id) && (
                  <div className="row">
                    <div className="col-12">
                      <a
                        href="#0"
                        className="ml-2"
                        onClick={() => {
                          unlikePost(post._id);
                        }}
                        style={{ textDecoration: "none" }}
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
                      </a>
                      <a
                        href={`/feed/${post._id}/likes`}
                        style={{ color: "black", textDecoration: "none" }}
                        className="mr-2"
                      >
                        {" "}
                        {post.likes.length}
                      </a>{" "}
                      <a
                        href={`/feed/${post._id}/comments`}
                        className="ml-2"
                        style={{ textDecoration: "none", cursor: "pointer" }}
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
                      <a
                        href="#0"
                        className="ml-2"
                        onClick={() => {
                          likePost(post._id);
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <i
                          className="far fa-heart fa-lg"
                          style={{ color: "black", cursor: "pointer" }}
                        >
                          {" "}
                        </i>
                      </a>
                      <a
                        className="mr-2"
                        href={`/feed/${post._id}/likes`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        {" "}
                        {post.likes.length}
                      </a>{" "}
                      <a
                        href={`/feed/${post._id}/comments`}
                        className="ml-2"
                        style={{ textDecoration: "none", cursor: "pointer" }}
                      >
                        <i
                          className="far fa-comment fa-lg"
                          style={{ color: "black" }}
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
    </Fragment>
  );
};

export default CurrentUserPosts;