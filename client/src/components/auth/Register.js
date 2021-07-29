import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FormData from "form-data";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "js-cookie";
import axios from "axios";
// import appBackground from "../../assests/appBackground.png";
import connectLogo from "../../assests/connectLogo.png";
require("dotenv").config();

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    profilepic: "",
  });

  const [userData, setUserData] = useState(new FormData());
  const { name, email, password, password2 } = values;
  const history = useHistory();

  const handleChange = (name) => (e) => {
    const value = name === "profilepic" ? e.target.files[0] : e.target.value;
    userData.set(name, value);
    setValues({ ...values, [name]: value });
    setUserData(userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast("Password do not match");
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = userData;
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/users`,
          body,
          config
        );
        if (res.status === 200) {
          await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/users/mail/${email}/${name}`
          );
          toast.success("Welcome! Please Login");
        }
      } catch (err) {
        toast.error("Email already registered");
        console.log(err);
      }
    }
  };

  function viewPassword() {
    var targetPassword = document.getElementById("myPassword");
    if (targetPassword.type === "password") {
      targetPassword.type = "text";
    } else {
      targetPassword.type = "password";
    }
  }

  function viewConfirmPassword() {
    var targetConfirmPassword = document.getElementById("myConfirmPassword");
    if (targetConfirmPassword.type === "password") {
      targetConfirmPassword.type = "text";
    } else {
      targetConfirmPassword.type = "password";
    }
  }

  return (
    <Fragment>
      {!Cookie.get("token") && (
        <div
          style={{
            paddingBottom: "10rem",
            backgroundColor: "#d9d9d9",
          }}
        >
          <div className="container">
            <div
              className="ml-2 mr-2"
              style={{
                alignContent: "center",
                paddingTop: "3rem",
              }}
            >
              <div
                className="card"
                style={{
                  borderColor: "gray",
                  borderRadius: "2rem",
                  boxShadow: "0 15px 16px 0 rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="container text-center"
                  style={{ marginTop: "2rem" }}
                >
                  <div>
                    <img
                      alt="connect logo"
                      className="navbar-brand"
                      src={connectLogo}
                      style={{
                        width: "3.5rem",
                        cursor: "pointer",
                        marginLeft: "1rem",
                      }}
                      onClick={() => {
                        history.push("/");
                      }}
                    />
                    <h1 style={{ marginBottom: "1rem", color: "#00ace6" }}>
                      Connect!
                    </h1>
                    <h4>
                      <i className="fas fa-user fa-lg"></i>Create Your Account,
                      to Connect!
                    </h4>
                  </div>
                  <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <input
                      placeholder="Name"
                      style={{
                        border: "none",
                        width: "75%",
                        marginTop: "1.5rem",
                        outline: "none",
                        borderBottom: "2px solid gray",
                      }}
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange("name")}
                      required
                    />
                    <br />
                    <input
                      placeholder="Email"
                      style={{
                        width: "75%",
                        marginTop: "1.5rem",
                        outline: "none",
                        border: "none",
                        borderBottom: "2px solid gray",
                      }}
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleChange("email")}
                      required
                    />
                    <br />
                    <input
                      id="myPassword"
                      placeholder="Password"
                      style={{
                        width: "73%",
                        marginTop: "1rem",
                        outline: "none",
                        border: "none",
                        borderBottom: "2px solid gray",
                      }}
                      required
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange("password")}
                    />
                    <a
                      onClick={() => {
                        viewPassword();
                      }}
                      style={{
                        cursor: "pointer",
                        border: "none",
                        background: "none",
                        outline: "none",
                      }}
                    >
                      <i
                        className="fas fa-eye-slash"
                        style={{ color: "gray" }}
                      ></i>
                    </a>
                    <br />
                    <input
                      id="myConfirmPassword"
                      placeholder="Confirm Password"
                      style={{
                        width: "73%",
                        marginTop: "1rem",
                        outline: "none",
                        border: "none",
                        borderBottom: "2px solid gray",
                      }}
                      type="password"
                      name="password2"
                      value={password2}
                      onChange={handleChange("password2")}
                      required
                    />
                    <a
                      onClick={() => {
                        viewConfirmPassword();
                      }}
                      style={{
                        cursor: "pointer",
                        border: "none",
                        background: "none",
                        outline: "none",
                      }}
                      type="none"
                    >
                      <i
                        className="fas fa-eye-slash"
                        style={{
                          color: "gray",
                        }}
                      ></i>
                    </a>
                    <br />
                    <br />
                    <label className="ml-2">image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="profilepic"
                      onChange={handleChange("profilepic")}
                      style={{ width: "15rem" }}
                    />
                    <br />
                    <button
                      className="btn"
                      type="submit"
                      style={{
                        margin: "2rem",
                        height: "2.5rem",
                        marginBottom: "0.3rem",
                        width: "80%",
                        borderRadius: "2rem",
                        backgroundColor: "#00ace6",
                        color: "white",
                      }}
                    >
                      Register
                    </button>
                    <p className="mt-2">
                      Already registered?{" "}
                      <span>
                        {" "}
                        <Link to="/" style={{ textDecoration: "none" }}>
                          Sign In
                        </Link>
                      </span>
                    </p>
                  </form>
                </div>

                {Cookie.get("token") && history.push("/dashboard")}
              </div>
            </div>
          </div>
        </div>
      )}
      {Cookie.get("token") && history.push("/dashboard")}

      <ToastContainer className="Toastify__toast-container--top-center" />
    </Fragment>
  );
};

export default Register;
