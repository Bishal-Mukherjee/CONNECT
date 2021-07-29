import Cookie from "js-cookie";
import React, { useState } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { isAuth } from "../../actions/actions";
import userImage from "../../assests/userImage.png";
require("dotenv").config();

const SearchUser = () => {
  const history = useHistory();
  const token = Cookie.get("token");

  const [values, setValues] = useState({
    name: "",
  });
  const [users, setUsers] = useState([]);

  const { name } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/searchUsers`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`,
      },
      method: "post",
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  return (
    <Fragment>
      {isAuth() && (
        <div>
          <div className="mt-5 row" style={{ marginLeft: "4rem" }}>
            <div>
              <form
                style={{ alignSelf: "center" }}
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <input
                  type="text"
                  placeholder="  Search"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="name"
                  value={name}
                  style={{
                    border: "solid",
                    borderColor: "gray",
                    borderRadius: "20rem",
                    borderBottom: "2px solid gray",
                    width: "15rem",
                    height: "2.5rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                  }}
                >
                  <i
                    className="fas fa-search fa-lg ml-2"
                    style={{ color: "gray" }}
                  ></i>
                </button>
              </form>
            </div>
          </div>
          <div
            className="mt-4"
            style={{ marginRight: "2rem", marginLeft: "2rem" }}
          >
            <div>
              <h4
                style={{
                  color: "gray",
                  marginLeft: "2rem",
                  fontSize: "1.2rem",
                }}
              >
                {users.length} resuts for
                <span className="text-info"> {name}</span>
              </h4>
            </div>

            {users.length !== 0 &&
              users.map((user, i) => (
                <div
                  className="card col-12 mt-2 flex-row"
                  style={{
                    borderColor: "gray",
                    borderRadius: "40px",
                    height: "8rem",
                  }}
                  key={i}
                >
                  {user.profilepic && (
                    <div className="mt-3">
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}/api/users/profilepic/${user._id}`}
                        className="card-img-left"
                        style={{
                          width: "5rem",
                          height: "5.5rem",
                          borderRadius: "50%",
                        }}
                        alt="user profilepic"
                      />
                    </div>
                  )}

                  {!user.profilepic && (
                    <div className="mt-3">
                      <img
                        src={userImage}
                        className="card-img-left"
                        style={{
                          width: "5rem",
                          height: "5.5rem",
                          borderRadius: "50%",
                        }}
                        alt="user profilepic"
                      />
                    </div>
                  )}

                  <div className="card-body mt-4">
                    <a
                      href={`/user/${user._id}/${user.name}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {user.name}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {!isAuth() && history.push("/")}
    </Fragment>
  );
};

export default SearchUser;
