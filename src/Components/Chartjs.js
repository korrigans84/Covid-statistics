import {useEffect, useRef} from 'react'

import Chart from "chart.js"

export default function Chartjs(labels, datasets, type="line", options=null){
    const chartRef = useRef(null)
    useEffect(() => {

        if(datasets !== {}) {
            const myChartRef = chartRef.current.getContext("2d");

            new Chart(myChartRef, {
                type: "line",
                data: {
                    //Bring in data
                    labels: ["Jan", "Feb", "March"],
                    datasets: datasets,

                    options: options
                }
            })
        }
        console.log(datasets)

    }, [datasets])

    return (
        <div className="">
            <canvas
                ref={chartRef}
            />
        </div>
    )
}
