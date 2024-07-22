import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
// import Login from './components/Login';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
import './App.css';

import CreateCommunity from './components/CreateCommunity';
import CommunityList from './components/CommunityList';
import CommunityDetails from './components/CommunityDetails';

import CreatePost from './components/CreatePost';
import ViewPosts from './components/ViewPosts';
import UpdatePost from './components/UpdatePost';
import CreateEvent from './components/CreateEvent';
import ViewEvents from './components/ViewEvents';
import UpdateEvent from './components/UpdateEvent';
import CreateComment from './components/CreateComment';
import ViewComments from './components/ViewComments';
import UpdateComment from './components/UpdateComment';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/communities" element={<CommunityList />} />
          <Route path="/communities/create" element={<CreateCommunity />} />
          <Route path="/communities/:id" element={<CommunityDetails />} />
          <Route path="/communities/:id/create-post" element={<CreatePost />} />
          <Route path="/communities/:id/posts" element={<ViewPosts />} />
          <Route path="/posts/:id/update" element={<UpdatePost />} />
          <Route path="/communities/:id/create-event" element={<CreateEvent />} />
          <Route path="/communities/:id/events" element={<ViewEvents />} />
          <Route path="/events/:id/update" element={<UpdateEvent />} />
          <Route path="/communities/:communityId/create-comment" element={<CreateComment />} />
          <Route path="/comments" element={<ViewComments />} />
          <Route path="/comments/:id/update" element={<UpdateComment />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
