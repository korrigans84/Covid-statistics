
import {useCallback, useEffect, useState} from "react";
import {useFetchForCountry} from "../hooks/useFetchForCountry";
import Chart from "../Components/Chart";

export default function CountryPage({countryCode}){
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [dataSummary, setDataSummary] = useState(null)
    const load = useCallback(async () => {
        setLoading(true)
        const response = await fetch(`https://api.covid19api.com/total/dayone/country/${countryCode}/status/confirmed`, {
            headers: {
                'Accept': 'application/json'
            }
        })
        const responseData = await response.json()
        if (response.ok) {
            responseData.map(dataElement => setItems(items => [...items,  {x: dataElement.Date, y1: dataElement.Cases}]))
        }

        const countrySummary = await fetch(`https://api.covid19api.com/summary`, {
            headers: {
                'Accept': 'application/json'
            }
        })
        const countryData = await countrySummary.json()

        if (countrySummary.ok) {
            const countries = countryData.Countries
            const summary = (countries.filter( function(item){return (item.CountryCode===countryCode.toUpperCase());} ))[0];
            setDataSummary(dataSummary => summary)

            console.log(summary)
        }

        setLoading(false)
    });

    useEffect(() => { load() }, [])

    return(
        <div className="container mt-3">

            <Chart data={items}/>
        </div>
    )
}
