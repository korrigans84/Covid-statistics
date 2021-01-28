
import {useContext, useEffect, useState} from "react";
import Chart from "../Components/Chart";
import {useParams} from "react-router";
import {usePosts} from "../hooks/usePosts";
import {useApi} from "../hooks/useApi";
import {useSummary} from "../hooks/useSummary";
import {Header} from "semantic-ui-react";
import Post from "../Components/Post";
import PostType from "../Components/form/PostType";
import {UserContext} from "../providers/UserProvider";


export default function CountryPage(){
    const {user} = useContext(UserContext)
    const { countryCode } = useParams()
    const [graphData, setGraphData] = useState(null)
    const { summary, load: loadSummary} = useSummary(countryCode)
    /*************************************
     *          API managment
     *************************************/
    const { items, load, loading} = useApi(`total/dayone/country/${countryCode}/status/confirmed`, countryCode)
    const {items: sevenDaysData, load: load7days} = useApi(`total/country/${countryCode}/status/confirmed`, countryCode, true)
    useEffect(async () => {
        loadSummary()
        load()
        await load7days()
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
            })
               // .filter(item =>  item.Cases > 0))
            )
        }
    },[items])



    /*************************************
     *          Posts managment
     *************************************/
    const { load: load_posts, loading: loading_posts, items: posts, addPost } = usePosts(countryCode, null)
    useEffect(() => {
        load_posts()
    }, [])
    return(<>
            <Header />
            {summary && <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center">
                <img src={`http://www.geognos.com/api/en/countries/flag/${countryCode.toUpperCase()}.png`} className="countrybox" />
            </div>
            <div className="row  d-flex justify-content-center">
                <h1 className="text-primary text-center">{summary.Country}</h1>
            </div>
    </div> }
        <div className="container">
            <TableSummary summary={summary} />
        </div>
        <div className="container mt-3">

            <h1>Total Cases</h1>
            {loading? <h1>Loading</h1> : <Chart data={graphData}/> }
        </div>
            {posts &&
            <section className="container">
            <div className="row">
                <h2>Posts about {summary.Country}</h2>
            </div>
            <div className="row">
                {posts.map((post, key) => post && <Post key={key} post={post}></Post>)}
            </div>
            </section>}

                {user && user.isAdmin &&
                <div className="container d-flex justify-content-center">
                    <PostType country={{name: summary.Country, code: countryCode}} onSubmit={(data) => addPost(data, user)}/>
                </div>}

    </>
    )
}

function TableSummary (summary) {
    useEffect(() => {
        console.log(summary)
    }, [summary] )
    return(
        <table className="table table-dark ">
            <tbody>
            <tr className="bg-blue text-center text-light">
                <th scope="row">Total cases</th>
                <th scope="row">{summary.summary.TotalConfirmed}</th>
            </tr>
            <tr className="alert-info text-center">
                <th scope="row">New cases</th>
                <th scope="row">{summary.summary.NewConfirmed}</th>
            </tr>
            <tr className="bg-blue text-center text-light">
                <th scope="row">Actives cases</th>
                <th scope="row">{summary.summary.NewConfirmed + summary.summary.TotalConfirmed}</th>
            </tr>


            <tr className="bg-primary text-center text-light">
                <th scope="row">Total Recovered</th>
                <th scope="row">{summary.summary.TotalRecovered}</th>
            </tr>
            <tr className=" text-center text-primary bg-light">
                <th scope="row">New Recovered</th>
                <th scope="row">{summary.summary.NewRecovered}</th>
            </tr>
            <tr className="bg-primary text-center text-light">
                <th scope="row">Recovery rate</th>
                <th scope="row">{Math.round(summary.summary.TotalRecovered / summary.summary.TotalConfirmed*10000)/100} %</th>
            </tr>


            <tr className="bg-red text-center text-light border-top">
                <th scope="row">Total deaths</th>
                <th scope="row">{summary.summary.TotalDeaths} </th>
            </tr>
            <tr className="text-danger text-center bg-light">
                <th scope="row">New deaths</th>
                <th scope="row">{summary.summary.NewDeaths} </th>
            </tr>
            <tr className="bg-red text-center text-light">
                <th scope="row">Mortality rate</th>
                <th scope="row">{Math.round(summary.summary.TotalDeaths / summary.summary.TotalConfirmed*10000)/100} %}</th>
            </tr>

            </tbody>
        </table>
    )
}
