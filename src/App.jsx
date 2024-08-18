import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
// import Login from './components/Login';
import LoginPage from "./components/LoginPage";
import UserPage from "./components/UserPage";
import "./App.css";

import CreateCommunity from "./components/CreateCommunity";
import CommunityList from "./components/CommunityList";
import CommunityDetails from "./components/CommunityDetails";

import CreatePost from "./components/CreatePost";
import ViewPosts from "./components/ViewPosts";
import UpdatePost from "./components/UpdatePost";
import CreateEvent from "./components/CreateEvent";
import ViewEvents from "./components/ViewEvents";
import UpdateEvent from "./components/UpdateEvent";
import CreateComment from "./components/CreateComment";
import ViewComments from "./components/ViewComments";
import UpdateComment from "./components/UpdateComment";
import EventDetails from "./components/EventDetails";
import HomePage from "./components/HomePage";
import CommunityEdit from "./components/CommunityEdit";
import ProfilePage from "./components/ProfilePage";
import { ConnectPage } from "./components/ConnectPage";
import { NotificationPage } from "./components/NotificationPage";
import { InboxPage } from "./components/InboxPage";
import { MessagePage } from "./components/MessagePage";
import {AboutPage} from "./components/AboutPage"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/communities" element={<CommunityList />} />
          <Route path="/communities/create" element={<CreateCommunity />} />
          <Route path="/communities/:id/edit" element={<CommunityEdit />} />
          <Route path="/communities/:id" element={<CommunityDetails />} />
          <Route path="/communities/:id/create-post" element={<CreatePost />} />
          <Route path="/communities/:id/posts" element={<ViewPosts />} />
          <Route path="/posts/:id/update" element={<UpdatePost />} />
          <Route
            path="/communities/:id/create-event"
            element={<CreateEvent />}
          />
          <Route path="/communities/:id/events" element={<ViewEvents />} />
          <Route path="/events/:id/update" element={<UpdateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route
            path="/communities/:communityId/create-comment"
            element={<CreateComment />}
          />
          <Route path="/comments" element={<ViewComments />} />
          <Route path="/comments/:id/update" element={<UpdateComment />} />
          <Route path="/user/:id/profile" element={<ProfilePage />} />

          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/notifications" element={<NotificationPage />} />

          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/messages/:userId" element={<MessagePage />} />

          <Route path="/about" element={<AboutPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
