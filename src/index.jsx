import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <App />
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
