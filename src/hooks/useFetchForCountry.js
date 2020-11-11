import {useCallback, useState} from "react";

export function  useFetchForCountry(url){
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [count, setCount] = useState(0)
    const [next, setNext] = useState(null)
    const load = useCallback(async () =>{
        setLoading((true))
        const response = await fetch(next || url, {
            headers: {
                'Accept': 'application/ld+json'
            }
        })
        const responseData = await response.json()
        if(response.ok){
            setItems(items => [...items, ...responseData])
            // setCount(responseData['hydra:totalItems'])
            ///   if(responseData['hydra:view']['hydra:next']){
            ///       setNext(responseData['hydra:view']['hydra:next'])
            ///   }else{
            ///       setNext(null)
            ///   }
        } else{
            alert('a problem occured')
        }
        setLoading(false)
    }, [url, next])
    return{
        items,
        load,
        loading,
        count,
        hasMore: next != null
    }

}
