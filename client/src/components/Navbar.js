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
      toast("User not logged in");
    }
  };

  return (
    <Fragment>
      <div className="container mb-2 pb-5">
        <nav className="navbar fixed-top" style={{ backgroundColor: "white" }}>
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
                className="btn btn-outline-info ml-auto mt-1"
                onClick={() => {
                  logoutClick();
                  window.location.reload();
                }}
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
                  style={{ color: "gray" }}
                >
                  Edit
                </i>
              </a>
            )}

          {window.location.pathname === "/Register" && (
            <Fragment>
              <button
                className="btn btn-outline-info ml-auto m-1"
                onClick={() => {
                  history.push("/");
                }}
              >
                {" "}
                Log In{" "}
              </button>
            </Fragment>
          )}

          {isAuth() &&
            window.location.pathname !== "/dashboard" &&
            window.location.pathname !== "/register" && (
              <Fragment>
                <button
                  className="btn btn-outline-info mt-1 mr-1 ml-1"
                  onClick={() => {
                    !Cookie.get("token")
                      ? toast("LogIn to visit")
                      : history.push("/");

                    window.location.reload();
                  }}
                >
                  {" "}
                  {loggedInUser.name.split(" ")[0]}{" "}
                </button>
              </Fragment>
            )}

          {isAuth() && window.location.pathname === "/feed" && (
            <div className="ml-2 mt-1">
              <a href="/feed/search">
                <i
                  className="fas fa-search fa-lg"
                  style={{ color: "gray" }}
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
