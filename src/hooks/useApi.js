import {useCallback, useState} from "react";

export const API_URL= "https://api.covid19api.com/"

export function  useApi(path, country=''){

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [count, setCount] = useState(0)
    if(country !== '' && path === "country"){
        path="country/"+country
    }
    const load = useCallback(async () =>{
        setLoading((true))
        const response = await fetch( API_URL+path, {
            headers: {
                'Accept': 'application/json'
            }
        })
        const responseData = await response.json()
        if(response.ok){
            setItems(items => [...items, ...responseData])
        }
        setLoading(false)
    }, [path])
    return{
        items,
        load,
        loading,
        count,
    }

}
