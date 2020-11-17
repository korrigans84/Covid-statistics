
import SignUp from "../Components/Auth/SignUp";
import UserProvider from "../providers/UserProvider";
import {usePaginatedFetch} from "../hooks/useFetch";
import React, {useEffect, useState} from "react";
import CardCountry from "../Components/CardCountry";
import NavBar from "../Components/NavBar";
import CountriesTable from "../Components/CountriesTable";
import '../assets/css/App.css'

export default function App() {
  return (<>
      <NavBar />
      <header className="header">

      </header>
      <h1 className="text-primary">Covid - statistics
      </h1>

          <div className="container-fluid">
              <div className="row">
                  <CountriesTable />
              </div>
          </div>
      </>
  );
}
