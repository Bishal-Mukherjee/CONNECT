import axios from "axios";
import Cookie from "js-cookie";
import React, { useState } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router";
import { isAuth } from "../../actions/actions";
require("dotenv").config();

const AllUsers = () => {
  const history = useHistory();
  const token = Cookie.get("token");
  const [users, setUsers] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${token}`,
    },
  };

  const getUsers = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/users`,
      config
    );
    setUsers(res.data);
  };

  window.addEventListener("load", (event) => {
    getUsers();
  });

  return (
    <Fragment>
      {isAuth() && (
        <div>
          <p>All Users</p>
          <div className="card">
            {users.map((user, i) => (
              <p key={i}>{user.name}</p>
            ))}
          </div>
        </div>
      )}
      {!isAuth() && history.push("/")}
    </Fragment>
  );
};

export default AllUsers;
