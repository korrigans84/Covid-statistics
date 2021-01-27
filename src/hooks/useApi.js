import {useCallback, useState} from "react";
import {generateDataByCountry, getDataByCountry} from "../firebase";

export const API_URL= "https://api.covid19api.com/"

export function  useApi(path, country='', saveFirebase=false){

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [fromFirebase, setFromFirebase] = useState(null)
    if(country !== '' && path === "country"){
        path="country/"+country
    }
    const load = useCallback(async () =>{
        setLoading((true))
        console.log(path)
        //we first try to fetch the data from our Firestore
        if(saveFirebase){
           const data = await getDataByCountry(country.toUpperCase())
            if(data){
                console.log(data)
                setFromFirebase(true)
                setItems(data)
            }
            else{
                setFromFirebase(false)
            }
        }
        if(!fromFirebase) {
            const response = await fetch(API_URL + path, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            const responseData = await response.json()
            if (response.ok) {
                setItems(items => [...items, ...responseData])
            }
            if(saveFirebase){
                console.log(items)
                await generateDataByCountry(country.toUpperCase(), items)
                console.log("data added to firestore")
            }
        }
        setLoading(false)
    }, [path])
    return{
        items,
        load,
        loading,
        fromFirebase
    }

}
