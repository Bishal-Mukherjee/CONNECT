import React, { Fragment } from "react";
import { useHistory } from "react-router";
import Cookie from "js-cookie";
import userImage from "../../assests/userImage.png";
import fetch from "node-fetch";
import Footer from "../Footer";
import { toast, ToastContainer } from "react-toastify";
require("dotenv").config();

const Dashboard = () => {
  const token = Cookie.get("token");
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  const deleteUser = async () => {
    let name = prompt("Enter your full name to confirm");

    if (user.name === name) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/delete`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "delete",
      });
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/likes/delete`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "delete",
      });
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/comments/delete`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "delete",
      });
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/users/delete_mail/${user.email}/${user.name}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": `${token}`,
          },
          method: "get",
        }
      );

      await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "delete",
      }).then(() => {
        localStorage.removeItem("user");
        Cookie.remove("token");
        history.push("/");
      });
    } else {
      toast("Authorization not granted");
    }
  };

  if (!Cookie.get("token")) {
    history.push("/");
  }

  return (
    <Fragment>
      {Cookie.get("token") && (
        <Fragment>
          <div
            className="mt-4 text-center card"
            style={{
              boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)",
              marginLeft: "5%",
              marginRight: "5%",
              marginBottom: "2%",
            }}
          >
            {"  "}
            {user.profilepic && (
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/api/users/profilepic/${user._id}`}
                alt="user"
                style={{
                  width: "11rem",
                  height: "12rem",
                  alignSelf: "center",
                  borderRadius: "1rem",
                  marginTop: "1rem",
                }}
              />
            )}

            {!user.profilepic && (
              <img
                src={userImage}
                alt="user"
                style={{
                  width: "11rem",
                  height: "12rem",
                  alignSelf: "center",
                  borderRadius: "1rem",
                  marginTop: "1rem",
                }}
              />
            )}

            <h1 className="text-info">{user.name}</h1>
            <p style={{ color: "gray" }} className="ml-2">
              {" "}
              {user.about}
            </p>
            <br />

            <p className="ml-1">
              <i className="fas fa-birthday-cake fa-lg"></i> {user.dob}
            </p>
            <p>
              <i className="fas fa-home">
                :<br />
                <span style={{ fontWeight: "normal" }}>{user.address}</span>
              </i>
            </p>

            <br />
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                history.push("/dashboard/create-post");
              }}
              style={{ width: "50%", alignSelf: "center" }}
            >
              <i className="fas fa-plus fa-lg mr-1"> </i>
              Create Post
            </button>
            <br />

            <div
              className="row"
              style={{ marginLeft: "20%", marginRight: "20%" }}
            >
              <div className="col-12">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => history.push(`/dashboard/${user.name}/posts`)}
                  style={{ width: "80%", alignSelf: "center" }}
                >
                  My Posts
                </button>
              </div>
            </div>

            <br />
            {"  "}
            <button
              className="btn btn-danger mb-3"
              onClick={() => {
                deleteUser();
              }}
              style={{ width: "60%", alignSelf: "center" }}
            >
              <i className="fas fa-trash fa-lg"></i>
              DELETE USER
            </button>
          </div>
        </Fragment>
      )}

      {!Cookie.get("token") && history.push("/")}
      <Footer />
      <ToastContainer className="Toastify__toast-container--top-center" />
    </Fragment>
  );
};

export default Dashboard;
