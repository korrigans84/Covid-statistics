
import React, {useContext, useEffect, useState, useCallback} from "react";
import Chart from "../Components/Chart";
import {useParams} from "react-router";
import {usePosts} from "../hooks/usePosts";
import {API_URL, useApi} from "../hooks/useApi";
import {useSummary} from "../hooks/useSummary";
import {Divider, Header} from "semantic-ui-react";
import Post from "../Components/Post";
import PostType from "../Components/form/PostType";
import {UserContext} from "../providers/UserProvider";
import TableSummary from "../Components/tables/TableSummary";
import {Bar, Pie} from "react-chartjs-2";
import {Link} from "react-router-dom";
import {useNinjaApi} from "../hooks/useNinjaApi";


export default function HomePage(){
    const {user} = useContext(UserContext)
    const countryCode = "ALL"
    const [currentPage, setCurrentPage] = useState(2)
    const [graphData, setGraphData] = useState(null)
    const { summary, load: loadSummary} = useSummary()
    const [items, setItems ] = useState([])
    /*************************************
     *          API managment
     *************************************/
    const {load: load7days, items: sevenDaysData, loading: loadingNinja } = useNinjaApi()

    useEffect(async () => {
        loadSummary()
        await load7days()
    }, [])
    useEffect(async () => {
            const response = await fetch("https://corona.lmao.ninja/v2/historical/all", {
            headers: {
                'Accept': 'application/json'
            }
        })
        const responseData = await response.json()
        console.log(responseData)
        if (response.ok) {
            const cases = Array.from(Object.values(responseData.cases))
            const deaths = Array.from(Object.values(responseData.deaths))
            const recovered = Array.from(Object.values(responseData.recovered))
            const date = Array.from(Object.keys(responseData.recovered)).sort((a, b) => {
                const dateA = (new Date(a.x)).getTime()
                const dateB = (new Date(b.x)).getTime()
                if(dateA > dateB){
                    return 1
                }else{
                    return -1
                }
            })

            setGraphData(cases.map((item, key) => {return{x: date[key], cases: cases[key], recovered: recovered[key], deaths: deaths[key]}}))
                // .filter(item =>  item.Cases > 0))
            console.log(graphData)
        }
    },[items])

    /*************************************
     *          Posts managment
     *************************************/
    const { load: load_posts, loading: loading_posts, items: posts, addPost } = usePosts("all", null)
    useEffect(() => {
        load_posts()
    }, [])
    function handleSubmit (data){
        addPost(data, user)
    }
    return(<>
            <div className="header-custom" />
            {summary && <div className="container-fluid">
                <div className="row  d-flex justify-content-center">
                    <h1 className="text-primary text-center">WorldWide data</h1>
                </div>
            </div> }
            <ul className="nav nav-tabs d-flex justify-content-center mt-4" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className={currentPage === 1 ? "nav-link active": "nav-link"} onClick={() => setCurrentPage(1)}
                    >Summary</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={currentPage === 2 ? "nav-link active": "nav-link"}onClick={() => setCurrentPage(2)}>Evolution</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={currentPage === 3 ? "nav-link active": "nav-link"} onClick={() => setCurrentPage(3)}>Posts</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className={currentPage === 1 ?"tab-pane fade show active" : "tab-pane fade"} id="summary" role="tabpanel" aria-labelledby="home-tab">
                    {!summary ? <h1>Loading</h1> : <>
                        <TableSummary summary={summary} />
                        <div className="row d-flex justify-content-center mt-5">
                            <h1>Coronavirus distribution in the world</h1>
                            {summary && <Pie data={{
                                labels: [
                                    'Deaths',
                                    'Recovered',
                                    'Cases'
                                ],
                                datasets: [{
                                    data: [summary.TotalDeaths, summary.TotalRecovered, summary.TotalConfirmed],
                                    backgroundColor: [
                                        'rgba(249, 79, 104, .4)',
                                        'rgba(51, 150, 167, .4)',
                                        'rgba(255,206,86, .4)'
                                    ],
                                    hoverBackgroundColor: [
                                        'rgba(249, 79, 104, .9)',
                                        'rgba(51, 150, 167, .9)',
                                        'rgba(255,206,86, .9)'
                                    ]
                                }]
                            }} /> }
                        </div>
                    </>

                    }
                </div>
                <div className={currentPage === 2 ?"tab-pane fade show active" : "tab-pane fade"} id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h1> 1 year cases</h1>
                    <div className="row">
                        <div className="col-12">
                            {!graphData? <h1 className="text-center">Loading...</h1> : <Chart data={graphData}/> }
                        </div>
                        <div className="col-12">
                            <h1>7 days evolution</h1>
                        </div>

                        <div className="col-12">
                            {!sevenDaysData? <h1 className="text-center">Loading...</h1> :<Bar
                                data={reform7daysData(sevenDaysData)}
                                width={100}
                                height={500}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            /> }
                        </div>
                    </div>

                </div>
                <div className={currentPage === 3 ?"tab-pane fade show active" : "tab-pane fade"} id="home" role="tabpanel" aria-labelledby="home-tab">
                    {posts &&
                    <section className="container">
                        <div className="row">
                            <h2>Posts</h2>
                        </div>
                        <div className="row">
                            {posts.map((post, key) => post && <Post key={key} post={post}></Post>)}
                        </div>
                        {user && user.isAdmin ?
                            <div className="row d-flex justify-content-center">
                                <PostType country={{label: summary.Country, value: countryCode}} onSubmit={handleSubmit}/>
                            </div>:
                            <div className="d-flex justify-content-center">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="text-center">You need to be an administrator to be able to post here</p>

                                    </div>
                                    <div className="col-12 mt-3">
                                        {user ?
                                            <Link to="/profile" className="btn btn-outline-light col-12"> Edit my
                                                profile </Link>
                                            :
                                            <Link to="/login" className="btn btn-outline-light col-12"> Login </Link>
                                        }
                                    </div>

                                </div>
                            </div>
                        }
                    </section>}
                </div>
            </div>
        </>
    )
}
function reform7daysData(sevenDaysData){
    if(!sevenDaysData){
        return
    }
    console.log(sevenDaysData)
    let _active = Array.from(Object.values(sevenDaysData.cases))
    let _recovered = Array.from(Object.values(sevenDaysData.recovered))
    let _deaths = Array.from(Object.values(sevenDaysData.deaths))
    let date = Array.from(Object.keys(sevenDaysData.cases))

    const active = _active.map((value, key) => {
        if(key>0){
            return value - _active[key-1]
        }
    })
    const recovered = _recovered.map((value, key) => {
        if(key>0){
            return value - _recovered[key-1]
        }
    })
    const deaths = _deaths.map((value, key) => {
        if(key>0){
            return value - _deaths[key-1]
        }
    })
    const dataset ={
        labels: date,
        datasets: [
            {
                label: 'Deaths',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: deaths
            },
            {
                label: 'Cases',
                backgroundColor: 'rgba(255,206,86,0.2)',
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,206,86,0.4)',
                hoverBorderColor: 'rgba(255,206,86,1)',
                data: active
            },
            {
                label: 'Recovered',
                backgroundColor: 'rgba(0,99,132,0.2)',
                borderColor: 'rgba(0,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0,99,132,0.4)',
                hoverBorderColor: 'rgba(0,99,132,1)',
                data: recovered
            }
        ]}

    return dataset
}
