

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, {useEffect, useState} from "react";
import { AgGridColumn, AgGridReact} from "ag-grid-react";

export default function CountriesTable(){
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([]);
    useEffect(async function (){
        const countries = await fetch('https://api.covid19api.com/summary');
        const countriesData = await countries.json();
        setRowData(countriesData.Countries);
        console.log(rowData)
    },[])

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    function handleClickRow(e){
        console.log('A row was clicked',e.data.CountryCode);
        }
    return (
        <div className="ag-theme-alpine"  style={ { height: 500, width: "100%" } }>
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
                <AgGridColumn field="TotalConfirmed"/>
            </AgGridReact>
        </div>
    );
}
