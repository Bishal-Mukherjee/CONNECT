import React, { Fragment } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../actions/actions";
import FormData from "form-data";
import Cookie from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
require("dotenv").config();

const CreatePost = () => {
  const history = useHistory();
  const token = Cookie.get("token");
  const [values, setValues] = useState({
    text: "",
    photo: "",
  });

  const [userData, setUserData] = useState(new FormData());
  const { text } = values;

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    userData.set(name, value);
    setValues({ ...values, [name]: value });
    setUserData(userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts`, {
      method: "post",
      headers: {
        "x-auth-token": `${token}`,
      },
      body: userData,
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Post added");
      }
    });
  };
  return (
    <Fragment>
      {isAuth() && (
        <div className="container text-center" style={{ marginTop: "6rem" }}>
          <h3 className="text-primary">Create Post</h3>
          <form className="form mt-3" onSubmit={(e) => handleSubmit(e)}>
            <textarea
              style={{
                width: "80%",
                marginTop: "3rem",
                height: "5rem",
                outline: "none",
              }}
              placeholder="Write something..."
              name="text"
              value={text}
              onChange={handleChange("text")}
            />
            <br />
            <br />
            <label className="mr-2">add image: </label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleChange("photo")}
              id="upload"
            />
            <button
              className="btn btn-outline-primary"
              type="submit"
              style={{ width: "80%", marginTop: "2rem" }}
            >
              Upload Post
            </button>
          </form>
        </div>
      )}
      {!isAuth() && history.push("/")}
      <ToastContainer className="Toastify__toast-container--top-center" />
    </Fragment>
  );
};

export default CreatePost;
