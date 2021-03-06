import {UserContext} from "../providers/UserProvider";
import React, {useContext, useEffect, useState} from "react";
import {Button, CardContent, Container, Header} from "semantic-ui-react";
import PostType from "../Components/form/PostType";
import {usePosts} from "../hooks/usePosts";
import uuid from 'react-uuid'
import Post from "../Components/Post";

export default function ProfilePage() {

    const {user, becomeAdmin} = useContext(UserContext);
    const {load, items: posts, addPost} = usePosts(null, user.uid)
    const [error, setError] = useState(null)
    const handlePostSubmit = (data) => {
            data= {
                uid: uuid(),
                username: user.displayName,
                user_uid: user.uid,
                country: data.country.value,
                post_content: data.post_content,
                title: data.title,
                createdAt: (new Date()).toString()
            }
            user.isAdmin && addPost(data)
            console.log(data)
    }
    useEffect(() => {
        load()
    }, [])
    useEffect(() => {
        console.log(user)
    }, [user])
    return (
        <div>
        <div className="header-custom" />
        <div className="row d-flex justify-content-center">
            <img src={user.photoURL} className="countrybox rounded-circle" />
        </div>
            <Container>
                <div className="row mb-5">
                    <div className="col-md-12">
                        <h1 className="text-primary text-center">Welcome {user.displayName}</h1>
                    </div>
                    <div className="col-md-12">
                        <h3> Your informations :</h3>
                        <ul className="">
                            <li className="">
                                Your name: {user.displayName}
                                <hr />
                            </li>
                            <li className="">
                                Your email: {user.email}
                                <hr />
                            </li>
                            <li className="">
                                {!user.isAdmin ? <span>You're not editor : <button className="btn btn-outline-light" onClick={() => {becomeAdmin()}}>Become an editor</button></span>: <span>You are an editor !</span>}
                            </li>
                        </ul>
                    </div>
                </div>
            {posts.length !== 0 && user.isAdmin ?
                <>
                <div className="row">
                    <h2>Your recents posts</h2>
                </div>
                <div className="row">
                    {posts.map(post => <Post post={post}  />)}
                </div>
                </>
             : <h2>You never wrote a post</h2>}
            </Container>
            {!user.isAdmin && <button className="btn btn-outline-light w-100" onClick={() => {becomeAdmin()}}>Become an editor</button> }
        <Container >
                { user.isAdmin && <PostType onSubmit={handlePostSubmit} error={error} />  }
        </Container>


        <div>
        </div>
        </div>
    );
}
