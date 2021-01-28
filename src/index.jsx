import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles';
import App from './App';
import UserProvider from "./providers/UserProvider";
import {BrowserRouter} from "react-router-dom";
import dotenv from "dotenv";


dotenv.config()
console.log(process.env.API_KEY)

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <UserProvider>
              <App />
          </UserProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

