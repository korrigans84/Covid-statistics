import {useEffect} from 'react'
import {Link} from "react-router-dom";

export default function Post({post, fromCountry = false}){
    console.log(fromCountry)
    return(
        <div className="col-12 my-3">
            <div className="card text-dark p-4">
                <div className="card-content">
                    <h2 className="text-center">{post.title}</h2>
                    {!fromCountry &&
                    <>{
                        post.country === "ALL" ?
                            <p>Worldwide</p>
                            : <Link to={`/country/${post.country}`} className="d-flex justify-content-center"><img
                                src={`http://www.geognos.com/api/en/countries/flag/${post.country}.png`}/></Link>
                    }</>
                    }
                        <p>{post.post_content}</p>
                    {!fromCountry && <Link to={`/country/${post.country}`} className="btn btn-primary">Go to the country</Link>}
                </div>
                <div className="card-footer text-dark">
                    Written by <b>{post.username}</b>
                    <span className="float-right"> {(new Date(post.createdAt)).toDateString()}</span>
                </div>
            </div>
        </div>
    )
}
