import React, { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../actions/actions";
import userImage from "../../assests/userImage.png";
require("dotenv").config();

const Feed = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  document.title = "Feed";

  const [posts, setPosts] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const { _id } = loggedInUser;

  const getPost = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/all_posts`, {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": `${token}`,
      },
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  };

  useEffect(() => {
    getPost();
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
    ).then(() => getPost());
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
    ).then(() => getPost());
  };

  return (
    <Fragment>
      {isAuth() && (
        <div style={{ backgroundColor: "#cccccc", paddingBottom: "20%" }}>
          <div
            className="row"
            style={{
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            {posts.map((post, i) => (
              <div
                className="card text-center col-12 mt-4"
                key={i}
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
                        height: "5.5rem",
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
                        height: "5.5rem",
                        border: "solid",
                        borderRadius: "75%",
                        borderColor: "white",
                      }}
                    />
                  </div>
                )}

                <div className="card-title">
                  <p>
                    <span className="ml-4">
                      <a
                        href={`/user/${post.user}/${post.name}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {post.name}
                      </a>
                    </span>
                  </p>
                  <p className="ml-2">
                    {post.date
                      .toString()
                      .substring(0, 10)
                      .concat(" / ")
                      .concat(post.date.toString().substring(12, 19))}
                  </p>
                </div>

                {window.innerWidth < 700 && post.photo && (
                  <div>
                    <hr />
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/api/posts/view_photo/${post._id}`}
                      className="card-img rounded"
                      alt="..."
                      style={{ width: "90%", alignSelf: "center" }}
                    />
                    <hr />
                  </div>
                )}

                {window.innerWidth > 700 && post.photo && (
                  <div>
                    <hr />
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/api/posts/view_photo/${post._id}`}
                      className="card-img rounded"
                      alt="..."
                      style={{ width: "25%", alignSelf: "center" }}
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
                            outline: "none",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                          }}
                        >
                          <i
                            className="fas fa-heart fa-lg"
                            style={{
                              color: "red",
                            }}
                          >
                            {" "}
                          </i>
                        </button>

                        <a
                          href={`/feed/${post._id}/likes`}
                          className="ml-1 mr-2"
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          {post.likes.length}
                        </a>

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
                          <span style={{ color: "black" }} className="ml-1">
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
                            outline: "none",
                            cursor: "pointer",
                            border: "none",
                            background: "none",
                          }}
                        >
                          <i
                            className="far fa-heart fa-lg"
                            style={{ color: "black" }}
                          >
                            {" "}
                          </i>
                        </button>
                        <a
                          style={{ color: "black", textDecoration: "none" }}
                          href={`/feed/${post._id}/likes`}
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
                            style={{ color: "black" }}
                          >
                            {" "}
                          </i>
                          <span className="ml-1" style={{ color: "black" }}>
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
        </div>
      )}
      {!isAuth() && history.push("/")}
    </Fragment>
  );
};

export default Feed;
