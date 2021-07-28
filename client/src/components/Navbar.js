import React, { Fragment } from "react";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { isAuth } from "../actions/actions";
import { useHistory } from "react-router-dom";
import connectLogo from "../assests/connectLogo.png";
require("dotenv").config();

const Navbar = () => {
  const history = useHistory();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  // const { name } = loggedInUser;
  // const userName = name.split(" ")[0];

  const logoutClick = () => {
    if (Cookie.get("token")) {
      Cookie.remove("token");
      localStorage.removeItem("user");
      history.push("/");
    } else {
      toast.error("User not logged in");
    }
  };

  return (
    <Fragment>
      <div className="container mb-2 pb-5">
        <nav
          className="navbar fixed-top"
          style={{ backgroundColor: "#0066cc" }}
        >
          {!isAuth() && (
            <div>
              <img
                alt="connect logo"
                className="navbar-brand"
                src={connectLogo}
                style={{ width: "2.5rem", cursor: "pointer" }}
                onClick={() => {
                  history.push("/");
                }}
              />
            </div>
          )}

          {isAuth() && (
            <img
              alt="connect logo"
              className="navbar-brand"
              src={connectLogo}
              style={{ width: "2.5rem", cursor: "pointer" }}
              onClick={() => {
                history.push("/feed");
                window.location.reload();
              }}
            />
          )}

          {isAuth() && (
            <Fragment>
              <button
                className="btn ml-auto mt-1"
                onClick={() => {
                  logoutClick();
                  window.location.reload();
                }}
                style={{ color: "white", textDecoration: "none" }}
              >
                {" "}
                Log Out{" "}
              </button>
            </Fragment>
          )}

          {isAuth() &&
            window.location.pathname === "/dashboard" &&
            window.location.pathname !== "/dashboard/:userName/edit-user" && (
              <a href={`/dashboard/${loggedInUser.name}/edit-user`}>
                <i
                  className="fas fa-user-edit fa-lg mt-1 ml-2 mr-2"
                  style={{ color: "white" }}
                >
                  Edit
                </i>
              </a>
            )}

          {isAuth() &&
            window.location.pathname !== "/dashboard" &&
            window.location.pathname !== "/register" && (
              <Fragment>
                <button
                  className="btn mt-1 mr-1 ml-1"
                  onClick={() => {
                    history.push("/dashboard");
                    window.location.reload();
                  }}
                  style={{ color: "white", outline: "none" }}
                >
                  {" "}
                  {loggedInUser.name.split(" ")[0]}{" "}
                </button>
              </Fragment>
            )}

          {isAuth() && window.location.pathname === "/feed" && (
            <div className="ml-2 mt-1 mr-2">
              <a href="/feed/search">
                <i
                  className="fas fa-search fa-lg"
                  style={{ color: "white" }}
                ></i>
              </a>
            </div>
          )}
        </nav>
      </div>
    </Fragment>
  );
};

export default Navbar;
