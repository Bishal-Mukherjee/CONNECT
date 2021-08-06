import Cookie from "js-cookie";
import React, { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { isAuth } from "../../actions/actions";
import userImage from "../../assests/userImage.png";
require("dotenv").config();

const Comments = () => {
  const history = useHistory();
  const token = Cookie.get("token");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [comments, setComments] = useState([]);
  const [getPost, setGetPOst] = useState({});

  const [values, setValues] = useState({
    text: "",
  });

  const { text } = values;

  // let reqPostID = window.location.href.substring(27, 51);

  let feedPostion = window.location.href.indexOf("feed");
  let reqPostID = window.location.href.substring(
    feedPostion + 5,
    feedPostion + 5 + 24
  );

  const getComment = async (postID) => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/view_comments/${postID}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });

    //to match the user id of the user and logged in user, to enable delete option
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/${postID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": `${token}`,
      },
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setGetPOst(data);
      });
  };

  useEffect(() => {
    getComment(reqPostID);
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/comment/${reqPostID}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "post",
        body: JSON.stringify({ text }),
      }
    ).then(() => getComment(reqPostID));
  };

  const deleteComment = async (commentID) => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/posts/remove_comment/${reqPostID}/${commentID}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        method: "delete",
      }
    ).then(() => {
      getComment(reqPostID);
      toast.success("Comment Deleted");
    });
  };

  return (
    <Fragment>
      {isAuth && (
        <div className="text-center">
          <form
            className="form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            style={{ margin: "4rem" }}
          >
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              name="text"
              value={text}
              placeholder="Write a Comment..."
              style={{
                border: "none",
                borderBottom: "2px solid gray",
                background: "none",
                width: "70%",
                height: "2.5rem",
                outline: "none",
              }}
            />
            <button
              className="btn btn-outline-secondary ml-2 mb-1 pb-2"
              type="submit"
              onClick={() => {
                toast("Comment Added");
              }}
            >
              <i className="fas fa-paper-plane fa-lg "></i>
            </button>
          </form>

          <div className="row" style={{ marginLeft: "5%", marginRight: "5%" }}>
            {comments.length === 0 && (
              <div>
                <h3 className="ml-3" style={{ color: "gray" }}>
                  be the first to comment
                </h3>
              </div>
            )}
            {comments.map((comment, i) => (
              <div
                className="card col-12 mt-2 flex-row"
                style={{
                  borderColor: "gray",
                  borderRadius: "40px",
                  height: "8rem",
                }}
                key={i}
              >
                <div className="mt-4">
                  {comment.profilepic && (
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/api/users/profilepic/${comment.user}`}
                      className="card-img-left"
                      style={{ width: "4rem", borderRadius: "50%" }}
                      alt="user profilepic"
                    />
                  )}
                  {!comment.profilepic && (
                    <img
                      src={userImage}
                      className="card-img-left"
                      style={{ width: "4rem", borderRadius: "50%" }}
                      alt="user profilepic"
                    />
                  )}
                </div>
                <div className="card-body">
                  <a
                    href={`/user/${comment.user}/${comment.name}`}
                    className="text-dark"
                    style={{ textDecoration: "none" }}
                  >
                    {comment.name}
                  </a>
                  <p>{comment.text}</p>

                  {(loggedInUser._id === comment.user ||
                    loggedInUser._id === getPost.user) && (
                    <div>
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#deleteComment"
                        style={{
                          marginLeft: "95%",
                          background: "none",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <i
                          className="fas fa-trash fa-lg"
                          style={{
                            color: "red",
                            cursor: "pointer",
                          }}
                        ></i>
                      </button>

                      <div
                        className="modal fade"
                        id="deleteComment"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog"
                          role="document"
                          style={{
                            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.6)",
                          }}
                        >
                          <div className="modal-content">
                            <div className="modal-body">
                              <button
                                type="button"
                                className="close ml-auto"
                                data-dismiss="modal"
                                aria-label="Close"
                                style={{ outline: "none" }}
                              >
                                {" "}
                                <span aria-hidden="true">&times;</span>
                              </button>
                              <p
                                style={{
                                  alignSelf: "center",
                                  fontWeight: "400",
                                  fontSize: "15px",
                                }}
                                className="mt-3"
                              >
                                Are you sure to delete comment?
                              </p>
                              <button
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => {
                                  deleteComment(comment._id);
                                }}
                              >
                                Yes
                              </button>
                              <button
                                className="btn btn-secondary ml-2"
                                data-dismiss="modal"
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isAuth() && history.push("/")}
      <ToastContainer className="Toastify__toast-container--top-center" />
    </Fragment>
  );
};

export default Comments;
