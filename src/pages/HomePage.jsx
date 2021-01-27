import React, {useEffect, useState} from 'react'
import {Header} from "semantic-ui-react";
import {useSummary} from "../hooks/useSummary";
import {Cell, PieChart} from "recharts";
import {Pie, Bar} from 'react-chartjs-2'
import {useNinjaApi} from "../hooks/useNinjaApi";


function createDataset(data){
    if(!data){
        return
    }
    console.log(Array.from(Object.values(data.cases)))
    const dataset =
        [
            {
                label: "line",
                data: [{
                    x: 10,
                    y: 20
                }, {
                    x: 15,
                    y: 10
                }],
                backgroundColor:
                    'rgba(255, 99, 132, .2)'
                ,
                borderColor:
                    'rgba(255, 99, 132, 1)'
                ,
            },
        ]
    return dataset
}
const data = {
    labels: [
        'Red',
        'Blue',
        'Yellow'
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
        console.log(lastDaysData)
        setSevenDaysData(createDataset(lastDaysData))
        console.log(sevenDaysData)
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
            <Header />
            <div className="dontainer d-flex justify-content-center">
                {loading ? <h1>Loading</h1> : <h1>Summary for today ( { day && day.toDateString()}) </h1> }

            </div>
            <div className="container">
                {sevenDaysData && <Pie data={data} /> }
            </div>
            <div className="container">
                {sevenDaysData &&  <Bar
                    data={dataBar}
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


/*{options &&
<PieChart width={300} height={300}>
    <Pie dataKey="value" startAngle={360} endAngle={0} data={options} cx={200} cy={200}  outerRadius={80} fill="#ffffff" label={({index})=> {return options[index].name}} >
        {
            options.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} label={entry.name}/>)
        }
    </Pie>
</PieChart>}*/
