import {useEffect} from 'react'

export default function Post(post){
    useEffect(() => {
        console.log(post)
    },[])
    return(
        <div className="col-12">
            <h2>{post.post.title}</h2>
            <p>{post.post.post_content}</p>
        </div>
    )
}
