
import {useContext, useEffect, useState} from "react";
import {useFetchForCountry} from "../hooks/useFetchForCountry";
import Chart from "../Components/Chart";
import NavBar from "../Components/NavBar";
import {useParams} from "react-router";
import {usePosts} from "../hooks/usePosts";
import {useApi} from "../hooks/useApi";
import {useSummary} from "../hooks/useSummary";
import {Header} from "semantic-ui-react";
import Post from "../Components/Post";
import PostModal from "../Components/modal/postModal";
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
    useEffect(() => {
        loadSummary()
        load()
        console.log(new Date('-7 days'))
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
            console.log(graphData)
        }
    },[items])


    /*************************************
     *          Posts managment
     *************************************/
    const { load: load_posts, loading: loading_posts, items: posts, addPost } = usePosts(countryCode, null)
    useEffect(() => {
        load_posts()
    }, [])
    useEffect(() => {
        console.log(posts)
    },[posts])

    return(<>
            <Header />
            {summary && <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center">
                <img src={`http://www.geognos.com/api/en/countries/flag/${countryCode}.png`} className="countrybox" />
            </div>
            <div className="row  d-flex justify-content-center">
                <h1 className="text-primary text-center">{summary.Country}</h1>
            </div>
    </div> }
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
