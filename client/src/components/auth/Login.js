import React, { useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "js-cookie";
import fetch from "node-fetch";
require("dotenv").config();

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const history = useHistory();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data.user));
          Cookie.set("token", data.token);
          history.push("/feed");
          setValues({ ...values, email: "", password: "", redirect: true });
        });
    } catch (err) {
      toast("Sign In failed", "warning");
      Cookie.remove("token");
      localStorage.removeItem("user");
    }
  };

  function viewPassword() {
    var targetInput = document.getElementById("myPassword");
    if (targetInput.type === "password") {
      targetInput.type = "text";
    } else {
      targetInput.type = "password";
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
              className="pl-5"
              style={{
                alignContent: "center",
                paddingTop: "10rem",
              }}
            >
              <div>
                <div
                  style={{
                    color: "gray",
                    marginBottom: "2rem",
                  }}
                >
                  <h1 className="ml-2">Welcome,</h1>
                  <h1>
                    Lets <span style={{ color: "#00ace6" }}>Connect!</span>
                  </h1>
                </div>

                <div className="pt-3">
                  <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => handleChange(e)}
                      style={{
                        border: "none",
                        width: "80%",
                        borderBottom: "2px solid gray",
                        background: "none",
                        outline: "none",
                      }}
                      required
                    />
                    <br />
                    <br />
                    <input
                      id="myPassword"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => handleChange(e)}
                      style={{
                        border: "none",
                        width: "80%",
                        borderBottom: "2px solid gray",
                        background: "none",
                        outline: "none",
                      }}
                      required
                      onClick={() => {}}
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
                        className="fas fa-eye-slash fa-lg"
                        style={{ color: "gray" }}
                      ></i>
                    </a>
                    <br />
                    <button
                      className="btn"
                      type="submit"
                      style={{
                        borderRadius: "2rem",
                        marginTop: "2rem",
                        color: "white",
                        width: "80%",
                        backgroundColor: "#00ace6",
                      }}
                    >
                      Sign In
                    </button>
                  </form>
                  <p style={{ color: "black", paddingTop: "1rem" }}>
                    Not registered?
                    <span>
                      <Link
                        to="/register"
                        className="ml-2"
                        style={{ textDecoration: "none" }}
                      >
                        Click Me
                      </Link>
                      <br />
                      <Link
                        to="/forgot-password"
                        style={{ textDecoration: "none" }}
                      >
                        Forgot Password?
                      </Link>
                    </span>
                  </p>
                </div>
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

export default Login;
