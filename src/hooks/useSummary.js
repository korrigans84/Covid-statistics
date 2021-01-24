import {useCallback, useState, useEffect} from "react";
import {API_URL, useApi} from "./useApi";


export function  useSummary(countryCode=''){
    const [loading, setLoading] = useState(false)
    const [summary, setSummary] = useState([])
    const [newCases, setNewCases] = useState(0)

    const load = useCallback(async () =>{
        setLoading((true))
        const response = await fetch( API_URL+"summary", {
            headers: {
                'Accept': 'application/json'
            }
        })
        const responseData = await response.json()
        if(response.ok){
            if(countryCode !== ''){
                setSummary(responseData.Countries.filter(function(item){return (item.CountryCode===countryCode.toUpperCase());})[0])
            }
            else{
                setSummary(responseData.Global)
            }
            setNewCases(responseData.Global.NewConfirmed + responseData.Global.NewDeaths + responseData.Global.NewRecovered )
        }
        setLoading(false)
    }, [])
    return{
        summary,
        load,
        loading,
        newCases
    }


}
