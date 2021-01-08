import NavBar from "../Components/NavBar";
import CountriesTable from "../Components/CountriesTable";
import React from "react";


export default function CountriesPage()
{

    return( <>
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
    )
}
