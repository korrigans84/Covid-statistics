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

      </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


/*<Router>
         <App path="/" />
         <CountriesPage path="countries" />
         <CountryPage path="country/:countryCode" />
         <ProfilePage path="profile" />
         <SignIn path="signin" />
         <SignUp path="signup" />
     </Router>*/
