import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../actions/actions";
import FormData from "form-data";
import { toast, ToastContainer } from "react-toastify";
import Cookie from "js-cookie";
require("dotenv").config();

const EditUser = () => {
  const history = useHistory();
  const token = Cookie.get("token");
  document.title = "Edit Profile";

  const [values, setValues] = useState({
    name: "",
    dob: "",
    address: "",
    about: "",
    profilepic: "",
  });

  const [userData, setUserData] = useState(new FormData());
  const { name, dob, address, about } = values;

  const handleChange = (name) => (e) => {
    const value = name === "profilepic" ? e.target.files[0] : e.target.value;
    userData.set(name, value);
    setValues({ ...values, [name]: value });
    setUserData(userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/update`, {
      headers: {
        "x-auth-token": `${token}`,
      },
      method: "put",
      body: userData,
    }).then((res) => {
      if (res.status === 200) {
        Cookie.remove("token");
        history.push("/");
      }
    });
  };

  const handleSubmitClick = () => {
    toast("Updated Successfully");
    toast("Please Login again");
  };

  return (
    <Fragment>
      {isAuth() && (
        <div className="container mt-5 text-center">
          <h1 className="text-primary">Edit Profile</h1>
          <form
            className="form mt-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleChange("name")}
              style={{
                border: "none",
                width: "70%",
                borderBottom: "2px solid gray",
                background: "none",
                outline: "none",
              }}
            />
            <br />
            <br />
            <label>Date of Birth</label>
            <br />
            <input
              className="mt-1"
              type="date"
              name="dob"
              value={dob}
              onChange={handleChange("dob")}
            />
            <br />
            <br />
            <textarea
              placeholder="Write about yourself..."
              name="about"
              value={about}
              onChange={handleChange("about")}
              style={{ width: "70%", height: "5rem", outline: "none" }}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={handleChange("address")}
              style={{
                border: "none",
                width: "70%",
                borderBottom: "2px solid gray",
                background: "none",
                outline: "none",
              }}
            />
            <br />
            <br />
            <label className="mr-2">Image: </label>
            <input
              className=""
              type="file"
              accept="image/*"
              name="profilepic"
              onChange={handleChange("profilepic")}
            />
            <br />
            <br />
            <button
              className="btn btn-outline-primary"
              style={{ width: "70%" }}
              onClick={() => {
                handleSubmitClick();
              }}
            >
              Update
            </button>
          </form>
        </div>
      )}
      {!isAuth() && history.push("/")}
      <ToastContainer />
    </Fragment>
  );
};

export default EditUser;
