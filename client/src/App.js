import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EditUser from "./components/User/EditUser";
import CreatePost from "./components/posts/CreatePost";
import Feed from "./components/posts/Feed";
import AllUsers from "./components/User/AllUsers";
import Comments from "./components/posts/Comments";
import ViewUser from "./components/User/ViewUser";
import UserPosts from "./components/posts/UserPosts";
import CurrentUserPosts from "./components/posts/CurrentUserPosts";
import Likes from "./components/posts/Likes";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import SearchUser from "./components/User/SearchUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/feed/:post_id/comments" component={Comments} />
        <Route exact path="/feed/:post_id/likes" component={Likes} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/all-users" component={AllUsers} />
        <Route exact path="/dashboard/:user/posts" component={UserPosts} />
        <Route exact path="/user/:user_id/:userName" component={ViewUser} />
        <Route exact path="/:user_id/posts" component={CurrentUserPosts} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:id" component={ResetPassword} />
        <Route exact path="/feed/search" component={SearchUser} />
        <Route
          exact
          path="/dashboard/:userName/edit-user"
          component={EditUser}
        />
        <Route exact path="/dashboard/create-post" component={CreatePost} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
