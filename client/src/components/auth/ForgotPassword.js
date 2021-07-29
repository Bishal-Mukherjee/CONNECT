import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
require("dotenv").config();

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
  });

  const { email } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/users/validate_email`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({ email }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setValues(data);
      })
      .catch(() => toast("Invalid Email"));
    sendResetMail(values.email);
  };

  const sendResetMail = async (email) => {
    if (values) {
      await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/users/request/reset-password`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify({ email }),
        }
      ).then(() => toast.success("Reset link sent"));
    }
  };

  return (
    <div
      style={{ marginTop: "13rem", marginLeft: "5rem", marginRight: "5rem" }}
    >
      <form
        className="form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type="text"
          name="email"
          value={email}
          placeholder="Enter registered email"
          style={{
            border: "none",
            borderBottom: "2px solid gray",
            background: "none",
            width: "100%",
            height: "2.5rem",
            outline: "none",
          }}
        />
        <br />
        <br />
        <button
          className="btn btn-outline-secondary mb-1 pb-2"
          type="submit"
          style={{ width: "100%" }}
        >
          {" "}
          Submit
        </button>
      </form>
      <ToastContainer className="Toastify__toast-container--top-center" />
    </div>
  );
};

export default ForgotPassword;
