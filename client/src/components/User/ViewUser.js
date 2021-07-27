import Cookie from "js-cookie";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../actions/actions";
import userImage from "../../assests/userImage.png";
require("dotenv").config();

const ViewUser = () => {
  const [user, setUser] = useState({});

  //from character number 27 till the last character of the url
  const userID = window.location.href.substring(27, 51);
  const token = Cookie.get("token");
  const history = useHistory();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const getUser = async () => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/users/user/${userID}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Fragment>
      {/* to check if the post belongs to the same user who is looged in */}
      {isAuth() && user._id !== loggedInUser._id && (
        <div
          className="card mt-5 text-center"
          style={{
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
            marginLeft: "5%",
            marginRight: "5%",
            marginBottom: "2%",
            paddingBottom: "15rem",
          }}
        >
          {user.profilepic && (
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/api/users/profilepic/${userID}`}
              style={{
                width: "10rem",
                height: "11rem",
                alignSelf: "center",
              }}
              className="mt-4 rounded"
              alt="user profilepic"
            />
          )}

          {!user.profilepic && (
            <img
              src={userImage}
              style={{
                width: "10rem",
                height: "11rem",
                alignSelf: "center",
              }}
              className="mt-2 rounded"
              alt="user profilepic"
            />
          )}

          <h1 className="text-info">{user.name}</h1>
          <p style={{ color: "gray" }} className="ml-2">
            {" "}
            {user.about}
          </p>
          <br />

          <p className="ml-2">
            <i className="fas fa-birthday-cake fa-lg"></i> {user.dob}
          </p>
          <p>
            <i className="fas fa-home">
              :<br />
              <span style={{ fontWeight: "normal" }}>{user.address}</span>
            </i>
          </p>
          <br />
          <br />
          <button
            className="btn btn-outline-primary"
            style={{ marginLeft: "25%", marginRight: "25%" }}
            onClick={() => {
              history.push(`/${userID}/posts`);
            }}
          >
            View Posts
          </button>
        </div>
      )}
      {isAuth() && user._id === loggedInUser._id && history.push("/dashboard")}
      {!isAuth() && history.push("/")}
    </Fragment>
  );
};

export default ViewUser;
