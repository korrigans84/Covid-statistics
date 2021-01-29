import NavBar from "../Components/NavBar";
import CountriesTable from "../Components/CountriesTable";
import React from "react";
import {Header} from "semantic-ui-react";


export default function CountriesPage()
{

    return( <>
    <div className="header-custom" />
    <div className="container my-4">
        <h1 className="text-primary text-center my-3">Covid - statistics per countries</h1>
        <p className="text-center">
            Click on each country to find out more. <br />
            By clicking on the top of a column, you can filter the results, or sort by columns.
        </p>
    </div>
    <div className="container-fluid">
        <div className="row">
            <CountriesTable />
        </div>
    </div>
    </>
    )
}
