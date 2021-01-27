import {useCallback, useState} from "react";
import {deleteF, generateDataByCountry, getDataByCountry} from "../firebase";
import date from "date.js";

export const API_URL= "https://api.covid19api.com/"

function dateformat (date){
    let month, day
    if(date.getMonth().length === 1){
        month="0"+(date.getMonth()+1).toString()
    }else{
        month=(date.getMonth()+1).toString()
    }
    if(date.getDate().length === 1){
        day="0"+date.getDate().toString()
    }else{
        day=date.getDate().toString()
    }
    return date.getFullYear()+"-"+month+"-"+day+"T00:00:00Z"
}
export function  useApi(path, country='', saveFirebase=false){

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [fromFirebase, setFromFirebase] = useState(null)
    let dataloaded=false;
    if(country !== '' && path === "country"){
        path="country/"+country
    }

    const load = useCallback(async () =>{
        if(saveFirebase){
            const lastWeek = new Date(date( "1 week ago"))
            const now = new Date(date( "now"))
            path+=`?from=${dateformat(lastWeek)}&to=${dateformat(now)}`
        }

        setLoading((true))
        console.log(path)
        //we first try to fetch the data from our Firestore
        if(saveFirebase){
           const data = await getDataByCountry(country.toUpperCase())
            if(data){
                console.log(data)
                if(dateformat(new Date(data[6].Date)) === dateformat(new Date()) || dateformat(new Date(data[6].Date)) === dateformat(new Date(date("1 day ago")))){
                    setItems(data)
                    setFromFirebase(true)
                }else{
                    console.log("data need update")
                }
            }
        }
        if(!fromFirebase ) {
            const response = await fetch(API_URL + path, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            const responseData = await response.json()
            if (response.ok) {
                setItems(items => items ? [ ...items, ...responseData] : [...responseData])
            }
            if(saveFirebase && ! fromFirebase){
                console.log(responseData)
                await generateDataByCountry(country.toUpperCase(), responseData)
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
