import {useEffect, useRef} from 'react'

import Chart from "chart.js"

export default function Chartjs(labels, datasets, type="line", options=null){
    const chartRef = useRef(null)
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "bar",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March"],
                datasets,

                options: options
            }
        })
    }, [])

    return (
        <div className="">
            <canvas
                ref={chartRef}
            />
        </div>
    )
}
