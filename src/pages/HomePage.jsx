import React, {useEffect, useState} from 'react'
import {Confirm, Container, Header} from "semantic-ui-react";
import Chartjs from "../Components/Chartjs";
import {useSummary} from "../hooks/useSummary";
import {Cell, Pie, PieChart} from "recharts";
import {useNinjaApi} from "../hooks/useNinjaApi";


export default function HomePage(){
    const [options, setOptions] = useState()
    const {load, summary, loading, day} = useSummary()
    const {load: loadNinja, items: lastDaysData, loading: loadingNinja } = useNinjaApi()
    const COLORS = ['#e74c3c', '#34495e', '#16a085'];
    useEffect(() => {
        load()
        loadNinja()
    },[])
    useEffect(() => {
        console.log(lastDaysData)
    }, [lastDaysData])
    useEffect(() => {
            if(summary){
                setOptions([
                    {name: "deaths", value: summary.NewDeaths},
                    {name: "confirmed", value: summary.NewConfirmed},
                    {name: "recovered", value: summary.NewRecovered},
                ])
            }
            console.log(summary)
        }, [summary])
    return(
        <>
            <Header />
            <div className="dontainer d-flex justify-content-center">
                {loading ? <h1>Loading</h1> : <h1>Summary for today ( { day && day.toDateString()}) </h1> }
                {options &&
                <PieChart width={400} height={400}>
                    <Pie dataKey="value" startAngle={360} endAngle={0} data={options} cx={200} cy={200}  outerRadius={80} fill="#ffffff" label={({index})=> {return options[index].name}} >
                        {
                            options.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} label={entry.name}/>)
                        }
                    </Pie>
                </PieChart>}
            </div>
            <div className="container">
                <Chartjs
                    labels={["Jan", "Feb", "March"]}
                    datasets={[
                        {
                            label: "Sales",
                            data: [86, 67, 91],
                        }
                    ]} />
            </div>
        </>
    )
}

function createDataset(data){
    if(!data){
        return
    }
    console.log(Array.from(data.cases))
    const dataset =
        [
        {
            label: "Cases",
            data: [86, 67, 91],
            backgroundColor: [
                'rgba(255, 99, 132, .2)',
                'rgba(54, 162, 235, .2)',
                'rgba(255, 206, 86, .2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
        },
        {
            label: "Sales",
            data: [86, 67, 91],
            backgroundColor: [
                'rgba(255, 99, 132, .2)',
                'rgba(54, 162, 235, .2)',
                'rgba(255, 206, 86, .2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
        }
    ]
    return dataset
}
