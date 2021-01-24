import React, {useEffect, useState} from 'react'
import {Confirm, Container, Header} from "semantic-ui-react";
import CountriesTable from "../Components/CountriesTable";
import {useSummary} from "../hooks/useSummary";
import {Cell, Pie, PieChart} from "recharts";


export default function HomePage(){
    const [options, setOptions] = useState()
    const {load, summary, loading} = useSummary()
    const COLORS = ['#e74c3c', '#34495e', '#16a085'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
                                       cx, cy, midAngle, innerRadius, outerRadius, percent, index,
                                   }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    useEffect(() => {
        load()
    },[])

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
                {loading ? <h1>Loading</h1> : <h1>New cases</h1> }
                {options &&
                <PieChart width={400} height={400}>
                    <Pie dataKey="value" startAngle={360} endAngle={0} data={options} cx={200} cy={200}  outerRadius={80} fill="#ffffff" label={({index})=> {return options[index].name}} >
                        {
                            options.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} label={entry.name}/>)
                        }
                    </Pie>
                </PieChart>}
            </div>
        </>
    )
}
