import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
require("dotenv").config();

const ResetPassword = () => {
  const indexOfReset = window.location.href.indexOf("/reset-password/");
  const userID = window.location.href.substring(
    indexOfReset + 16,
    indexOfReset + 40
  );

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, userID) => {
    e.preventDefault();

    if (password === confirmPassword) {
      await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/users/reset-password/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ password }),
        }
      )
        .then((res) => res.json)
        .then(() => {
          toast("Password Updated");
          toast("Please Login");
        });
    }
  };

  return (
    <div>
      <form
        className="form card row"
        style={{
          marginTop: "9rem",
          marginLeft: "5rem",
          marginRight: "5rem",
          border: "none",
        }}
        onSubmit={(e) => {
          handleSubmit(e, userID);
        }}
      >
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
          style={{
            border: "none",
            width: "100%",
            borderBottom: "2px solid gray",
            background: "none",
            outline: "none",
          }}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => handleChange(e)}
          style={{
            border: "none",
            width: "100%",
            borderBottom: "2px solid gray",
            background: "none",
            outline: "none",
          }}
          required
        />
        <br />
        <br />
        <button className="btn btn-outline-info" type="submit">
          Confirm Changes
        </button>
      </form>
      <ToastContainer className="Toastify__toast-container--top-center" />
    </div>
  );
};

export default ResetPassword;
