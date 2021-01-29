import {useEffect} from 'react'
import {Link} from "react-router-dom";

export default function Post(post){
    return(
        <div className="col-12 my-3">
            <div className="card text-dark p-4">
                <div className="card-content">
                    <h2 >{post.post.title}</h2>
                    {post.post.country === "ALL" ?
                        <p>Worldwide</p>
                        : <Link to={`/country/${post.post.country}`}><img src={`http://www.geognos.com/api/en/countries/flag/${post.post.country}.png`}/></Link> }
                    <p>{post.post.post_content}</p>

                </div>
                <div className="card-footer text-dark">
                    Written by <b>{post.post.username}</b>
                    <span className="float-right"> {(new Date(post.post.createdAt)).toDateString()}</span>
                </div>
            </div>
        </div>
    )
}
