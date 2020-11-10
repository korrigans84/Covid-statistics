import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles';
import App from './App';
import { Router, Link } from '@reach/router';
import reportWebVitals from './reportWebVitals';
import ProfilePage from "./Components/Profile/ProfilePage";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import NavBar from "./Components/NavBar";

ReactDOM.render(
  <React.StrictMode>
      <NavBar />
      <Router>
          <App path="/" />
          <ProfilePage path="profile" />
          <SignIn path="signin" />
          <SignUp path="signup" />
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
