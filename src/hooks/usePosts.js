import {useCallback, useState, useEffect} from "react";
import {generatePostDocument, getPostsDocumentsByCountry, getPostsDocumentsByUser} from "../firebase";
import uuid from "react-uuid";

/**
 * There is not server-side verification for the post, so the hook is simple.
 * @param country_code
 * @param user_id
 * @returns {{load: (function(): Promise<void>), addPost: addPost, loading: boolean, items: *[]}}
 */
export function  usePosts(country_code = null, user_id=null){

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [count, setCount] = useState(0)
    const load = useCallback(async () =>{
        setLoading(true)
        if(user_id){
            let posts = await getPostsDocumentsByUser(user_id)
            setItems(posts)
        }
        else{
            let posts = await getPostsDocumentsByCountry(country_code.toUpperCase())
            setItems(posts)
        }
        setLoading(false)
    }, [])

    const addPost = (post, user=null) => {
        if(!post.uid){
            post = {
                uid: uuid(),
                user_uid: user.uid,
                country: post.country.value,
                post_content: post.post_content,
                title: post.title,
                createdAt: (new Date()).toString()
            }
        }
        generatePostDocument(post)
        setItems([post, ...items])
    }
    useEffect(() => {
        setCount(items.length)
    }, [items])
    return{
        items,
        load,
        loading,
        addPost
    }

}
