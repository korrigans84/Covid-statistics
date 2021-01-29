import React from "react";


export default function TableSummary ({summary}) {
    return(
        <div className="container">
            <table className="table table-striped mt-5">
                <tbody>
                <tr className=" text-center text-light">
                    <th scope="row">Total cases</th>
                    <th scope="row">{summary.TotalConfirmed}</th>
                </tr>
                <tr className=" text-center text-light">
                    <th scope="row">New cases</th>
                    <th scope="row">{summary.NewConfirmed}</th>
                </tr>
                <tr className="text-center text-light">
                    <th scope="row">Actives cases</th>
                    <th scope="row">{summary.NewConfirmed + summary.TotalConfirmed}</th>
                </tr>


                <tr className=" text-center text-primary">
                    <th scope="row">Total Recovered</th>
                    <th scope="row">{summary.TotalRecovered}</th>
                </tr>
                <tr className=" text-center text-primary ">
                    <th scope="row">New Recovered</th>
                    <th scope="row">{summary.NewRecovered}</th>
                </tr>
                <tr className=" text-center text-primary">
                    <th scope="row">Recovery rate</th>
                    <th scope="row">{Math.round(summary.TotalRecovered / summary.TotalConfirmed*10000)/100} %</th>
                </tr>


                <tr className=" text-center text-danger border-top">
                    <th scope="row">Total deaths</th>
                    <th scope="row">{summary.TotalDeaths} </th>
                </tr>
                <tr className="text-danger text-center">
                    <th scope="row">New deaths</th>
                    <th scope="row">{summary.NewDeaths} </th>
                </tr>
                <tr className=" text-center text-danger">
                    <th scope="row">Mortality rate</th>
                    <th scope="row">{Math.round(summary.TotalDeaths / summary.TotalConfirmed*10000)/100} %</th>
                </tr>

                </tbody>
            </table>
        </div>
    )
}
