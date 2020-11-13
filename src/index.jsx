import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles';
import App from './pages/App';
import { Router, Link } from '@reach/router';
import reportWebVitals from './reportWebVitals';
import ProfilePage from "./Components/Profile/ProfilePage";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import NavBar from "./Components/NavBar";
import CountryPage from "./pages/CountryPage";
import CountriesPage from "./pages/CountriesPage";
import UserProvider from "./providers/UserProvider";

ReactDOM.render(
  <React.StrictMode>
      <UserProvider>
      <Router>

          <App path="/" />
          <CountriesPage path="countries" />
          <CountryPage path="country/:countryCode" />
          <ProfilePage path="profile" />
          <SignIn path="signin" />
          <SignUp path="signup" />
      </Router>
      </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
