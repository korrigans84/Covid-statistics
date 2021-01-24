import NavBar from "../Components/NavBar";
import CountriesTable from "../Components/CountriesTable";
import React from "react";
import {Header} from "semantic-ui-react";


export default function CountriesPage()
{

    return( <>
    <Header />
    <h1 className="text-primary text-center my-3">Covid - statistics
    </h1>

    <div className="container-fluid">
        <div className="row">
            <CountriesTable />
        </div>
    </div>
    </>
    )
}
