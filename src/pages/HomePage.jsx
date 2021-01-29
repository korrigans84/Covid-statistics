import React, {useEffect, useState} from 'react'
import {Header} from "semantic-ui-react";
import {useSummary} from "../hooks/useSummary";
import {Pie, Bar} from 'react-chartjs-2'
import {useNinjaApi} from "../hooks/useNinjaApi";
import TableSummary from "../Components/tables/TableSummary";

function createDataset(data){
    if(!data){
        return
    }
    console.log(data)
    const days = Array.from(Object.keys(data.cases))
    const _data2 = Array.from(Object.values(data.deaths)).map((value, key) => {return{x: days[key], y: value}})
    console.log(_data2)
    const dataset ={
        labels: days,
        datasets: [
            {
                label: 'Deaths',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: Array.from(Object.values(data.deaths))
            },
            {
                label: 'Cases',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: Array.from(Object.values(data.cases))
            },
            {
                label: 'Recovered',
                backgroundColor: 'rgba(0,99,132,0.2)',
                borderColor: 'rgba(0,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0,99,132,0.4)',
                hoverBorderColor: 'rgba(0,99,132,1)',
                data: Array.from(Object.values(data.recovered))
            }
        ]}

    return dataset
}
const data = {
    labels: [
        'Deaths',
        'Recover',
        'Cases'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const dataBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};
export default function HomePage(){
    const [options, setOptions] = useState()
    const {load, summary, loading, day} = useSummary()
    const {load: loadNinja, items: lastDaysData, loading: loadingNinja } = useNinjaApi()
    const [sevenDaysData, setSevenDaysData] = useState(null)
    const COLORS = ['#e74c3c', '#34495e', '#16a085'];
    useEffect(() => {
        load()
        loadNinja()
    },[])
    useEffect(() => {
        setSevenDaysData(createDataset(lastDaysData))
    }, [lastDaysData])
    useEffect(() => {
            if(summary){
                setOptions([
                    {name: "deaths", value: summary.NewDeaths},
                    {name: "confirmed", value: summary.NewConfirmed},
                    {name: "recovered", value: summary.NewRecovered},
                ])
            }
        }, [summary])
    return(
        <>
            <div className="header-custom" />
            <TableSummary summary={summary} />
            <div className="dontainer d-flex justify-content-center">
                {loading ? <h1>Loading</h1> : <h1>Summary for today ( { day && day.toDateString()}) </h1> }

            </div>
            <div className="container">
                {sevenDaysData && <Pie data={{
                    labels: [
                        'Deaths',
                        'Recover',
                        'Cases'
                    ],
                    datasets: [{
                        data: [300, 50, 100],
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56'
                        ],
                        hoverBackgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56'
                        ]
                    }]
                }} /> }
            </div>
            <div className="container">
                {sevenDaysData &&  <Bar
                    data={sevenDaysData}
                    width={100}
                    height={500}
                    options={{
                        maintainAspectRatio: false
                    }}
                /> }
            </div>
        </>
    )
}

