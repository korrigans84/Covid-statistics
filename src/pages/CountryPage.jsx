
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
    const [currentPage, setCurrentPage] = useState(2)
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
                    {!summary ? <h1>Loading</h1> : <TableSummary summary={summary} />}
                </div>
                <div className={currentPage === 2 ?"tab-pane fade show active" : "tab-pane fade"} id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h1> 1 year cases</h1>
                    {loading? <h1>Loading</h1> : <Chart data={graphData}/> }
                </div>
                <div className={currentPage === 3 ?"tab-pane fade show active" : "tab-pane fade"} id="home" role="tabpanel" aria-labelledby="home-tab">
                    {posts &&
                    <section className="container">
                        <div className="row">
                            <h2>Posts about {summary.Country}</h2>
                        </div>
                        <div className="row">
                            {posts.map((post, key) => post && <Post key={key} post={post}></Post>)}
                        </div>
                        {user && user.isAdmin ?
                            <div className="row d-flex justify-content-center">
                                <PostType country={{name: summary.Country, code: countryCode}} onSubmit={(data) => addPost(data, user)}/>
                            </div>:
                            <div className="d-flex justify-content-center">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="text-center">You need to be an administrator to be able to post here</p>

                                    </div>
                                    <div className="col-12 mt-3">
                                        <a className="btn btn-outline-light col-12"> Login now </a>

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

function TableSummary (summary) {
    useEffect(() => {
        console.log(summary)
    }, [summary] )
    return(
        <div className="container">
            <table className="table table-striped mt-5">
                <tbody>
                <tr className=" text-center text-light">
                    <th scope="row">Total cases</th>
                    <th scope="row">{summary.summary.TotalConfirmed}</th>
                </tr>
                <tr className=" text-center text-light">
                    <th scope="row">New cases</th>
                    <th scope="row">{summary.summary.NewConfirmed}</th>
                </tr>
                <tr className="text-center text-light">
                    <th scope="row">Actives cases</th>
                    <th scope="row">{summary.summary.NewConfirmed + summary.summary.TotalConfirmed}</th>
                </tr>


                <tr className=" text-center text-primary">
                    <th scope="row">Total Recovered</th>
                    <th scope="row">{summary.summary.TotalRecovered}</th>
                </tr>
                <tr className=" text-center text-primary ">
                    <th scope="row">New Recovered</th>
                    <th scope="row">{summary.summary.NewRecovered}</th>
                </tr>
                <tr className=" text-center text-primary">
                    <th scope="row">Recovery rate</th>
                    <th scope="row">{Math.round(summary.summary.TotalRecovered / summary.summary.TotalConfirmed*10000)/100} %</th>
                </tr>


                <tr className=" text-center text-danger border-top">
                    <th scope="row">Total deaths</th>
                    <th scope="row">{summary.summary.TotalDeaths} </th>
                </tr>
                <tr className="text-danger text-center">
                    <th scope="row">New deaths</th>
                    <th scope="row">{summary.summary.NewDeaths} </th>
                </tr>
                <tr className=" text-center text-danger">
                    <th scope="row">Mortality rate</th>
                    <th scope="row">{Math.round(summary.summary.TotalDeaths / summary.summary.TotalConfirmed*10000)/100} %</th>
                </tr>

                </tbody>
            </table>
        </div>
    )
}
