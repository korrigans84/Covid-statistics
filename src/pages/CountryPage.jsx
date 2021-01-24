
import {useCallback, useEffect, useState} from "react";
import {useFetchForCountry} from "../hooks/useFetchForCountry";
import Chart from "../Components/Chart";
import NavBar from "../Components/NavBar";
import {useParams} from "react-router";
import {usePosts} from "../hooks/usePosts";
import {useApi} from "../hooks/useApi";
import {useSummary} from "../hooks/useSummary";
import {Header} from "semantic-ui-react";

export default function CountryPage(){
    const { countryCode } = useParams()
    const [graphData, setGraphData] = useState(null)
    const { summary, load: loadSummary} = useSummary(countryCode)
    /*************************************
     *          API managment
     *************************************/
    const { items, load, loading} = useApi(`total/dayone/country/${countryCode}/status/confirmed`)
    useEffect(() => {
        loadSummary()
        load()
    }, [])
    useEffect(() => {
        if(items !== []){
            setGraphData((items.map(item => {return{x: item.Date, y1: item.Cases}}))
                .sort((a, b) => {
                const dateA = (new Date(a.x)).getTime()
                const dateB = (new Date(b.x)).getTime()
                if(dateA > dateB){
                    return 1
                }else{
                    return -1
                }
            }))
            console.log(graphData)
        }
    },[items])


    /*************************************
     *          Posts managment
     *************************************/
    const { posts, fetchPostsByCountry } = usePosts()
    useEffect(() => {
        fetchPostsByCountry("AF")
    }, [])
    useEffect(() => {
        console.log(posts)
    },[posts])
    /*const load2 = useCallback(async () => {
        const response = await fetch(`https://api.covid19api.com/`, {
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

        }
    });*/


    return(<>
            <Header />
            {summary && <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center">
                <img src={`http://www.geognos.com/api/en/countries/flag/${summary.CountryCode}.png`} className="countrybox" />
            </div>
            <div className="row  d-flex justify-content-center">
                <h1 className="text-primary text-center">{summary.Country}</h1>
            </div>
    </div> }
        <div className="container mt-3">

            <h1>Total Cases</h1>
            {loading? <h1>Chargement</h1> : <Chart data={graphData}/> }
        </div>
            {posts && posts.map((post, key) => <Post key={key} post={post}></Post>)}

    </>
    )
}

const Post = (post) => {
    return(
        JSON.stringify(post)
    )
}
