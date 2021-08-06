import React, { Fragment, useState } from "react";
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
  const [values, setValues] = useState({
    name: "",
  });
  const { name } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      if (name !== null) {
        toast.error("Incorrect user name");
      }
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
              type="button"
              data-toggle="modal"
              data-target="#deleteModal"
              style={{ width: "60%", alignSelf: "center" }}
            >
              <i className="fas fa-trash fa-lg"></i>
              DELETE USER
            </button>
            <div
              className="modal fade"
              id="deleteModal"
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
                  <div className="modal-body card">
                    <button
                      type="button"
                      className="close ml-auto"
                      data-dismiss="modal"
                      aria-label="Close"
                      style={{ outline: "none" }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h2 className="text-danger">Warning!</h2>
                    <p
                      style={{
                        alignSelf: "center",
                        fontWeight: "600",
                        fontSize: "15px",
                      }}
                      className="mt-3"
                    >
                      Write your full name to proceed..
                    </p>
                    <form
                      className="form mt-3"
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter your full name"
                        style={{
                          width: "100%",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          height: "3rem",
                          borderRadius: "0.5rem",
                          outline: "none",
                        }}
                        required
                      />
                      <br />
                      <br />
                      <button
                        className="btn btn-danger"
                        style={{ width: "100%", height: "3rem" }}
                        type="submit"
                      >
                        Confirm Delete Account
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
