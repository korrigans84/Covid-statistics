import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles';
import App from './App';
import UserProvider from "./providers/UserProvider";

ReactDOM.render(
  <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

