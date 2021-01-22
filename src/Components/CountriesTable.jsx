

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, {useEffect, useState} from "react";
import { AgGridColumn, AgGridReact} from "ag-grid-react";
import {Flag} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

export default function CountriesTable(){
    const navigate = useHistory();
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([]);
    useEffect(async function (){
        const countries = await fetch('https://api.covid19api.com/summary');
        const countriesData = await countries.json();
        setRowData(countriesData.Countries);
        console.log(countriesData.Countries)
    },[])
    function countryRow(country){
        return { ...country,
            flag: <Flag name={country.countryCode}/>
            }
        }
    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    function handleClickRow(e){
        navigate(`/country/${e.data.CountryCode}`)
        }
    return (
        <div className="ag-theme-alpine"  style={ { height: 1000, width: "100%" } }>
            <AgGridReact
                animateRows
                onGridReady={onGridReady}
                rowData={rowData}
                onRowClicked={handleClickRow}
                defaultColDef={{
                    sortable: true,
                    filter: true,
                    headerComponentParams: {
                        menuIcon: 'fa-bars'
                    }
                }}>
                <AgGridColumn field="Country"/>
                <AgGridColumn field="NewConfirmed"/>
                <AgGridColumn field="NewDeaths"/>
                <AgGridColumn field="NewRecovered"/>
                <AgGridColumn field="TotalConfirmed"/>
                <AgGridColumn field="TotalDeaths"/>
                <AgGridColumn field="TotalRecovered"/>
            </AgGridReact>
        </div>
    );
}
