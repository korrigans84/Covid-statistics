import {useCallback, useState} from "react";

const API_NINJA_URL= "https://corona.lmao.ninja/v2/historical/all?lastdays=8"

export function  useNinjaApi(){

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState(null)
    const load = useCallback(async () =>{
        setLoading((true))
        const response = await fetch( API_NINJA_URL, {
            headers: {
                'Accept': 'application/json'
            }
        })
        const responseData = await response.json()
        if(response.ok){
            setItems(responseData)
        }
        setLoading(false)
    }, [])
    return{
        items,
        load,
        loading,
    }

}
