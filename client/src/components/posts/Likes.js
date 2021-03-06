import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../actions/actions";
import userImage from "../../assests/userImage.png";

const Likes = () => {
  const history = useHistory();
  const [likes, setLikes] = useState([]);
  const token = localStorage.getItem("token");
  // const reqPostID = window.location.href.substring(27, 51);
  let feedPostion = window.location.href.indexOf("feed");
  let reqPostID = window.location.href.substring(
    feedPostion + 5,
    feedPostion + 5 + 24
  );

  const getLikes = async (postID) => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/${postID}/likes`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => setLikes(data.likes));
  };

  useEffect(() => {
    getLikes(reqPostID);
  }, []);

  return (
    <Fragment>
      {isAuth() && (
        <div
          className="row mt-5"
          style={{
            marginLeft: "10%",
            marginRight: "10%",
            marginBottom: "2rem",
          }}
        >
          {likes.length === 0 && (
            <div className="row">
              <div
                className="card mt-3 col-12"
                style={{
                  alignSelf: "center",
                  borderRadius: "30rem",
                }}
              >
                <h2 style={{ color: "gray" }}>be the first to like the post</h2>
              </div>
            </div>
          )}

          {likes.map((like, i) => (
            <div
              key={i}
              className="card mt-3 col-12"
              style={{
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
                borderRadius: "30rem",
              }}
            >
              {like.profilepic && (
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/api/users/profilepic/${like.user}`}
                  className="mt-1"
                  style={{
                    width: "5rem",
                    height: "5.5rem",
                    borderRadius: "50%",
                    alignSelf: "center",
                  }}
                  alt="_user"
                />
              )}

              {!like.profilepic && (
                <img
                  src={userImage}
                  className="mt-1"
                  style={{
                    width: "5rem",
                    height: "5.5rem",
                    borderRadius: "50%",
                    alignSelf: "center",
                  }}
                  alt="_user"
                />
              )}

              <p className="text-center">
                <a
                  href={`/user/${like.user}/${like.name}`}
                  className="text-info"
                  style={{ textDecoration: "none" }}
                >
                  {like.name}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
      {!isAuth() && history.push("/")}
    </Fragment>
  );
};

export default Likes;
