import {UserContext} from "../providers/UserProvider";
import React, {useContext, useEffect, useState} from "react";
import {signOut} from "../firebase";
import {Container, Header} from "semantic-ui-react";
import PostType from "../Components/form/PostType";
import {usePosts} from "../hooks/usePosts";
import uuid from 'react-uuid'
import Post from "../Components/Post";
export default function ProfilePage() {

    const {user} = useContext(UserContext);
    const {addPost, fetchPostsByUser, posts} = usePosts()
    const [error, setError] = useState(null)
    const handlePostSubmit = (data) => {
            data= {
                uid: uuid(),
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
        fetchPostsByUser(user.uid)
        console.log(posts)
    }, [])
    return (
        <div>
        <Header />
        <Container >
            <div className="row">
                <h2>Create a post :</h2>
            </div>
            <div className="row d-flex justify-content-center">
                { user.isAdmin && <PostType onSubmit={handlePostSubmit} error={error} />}
            </div>
        </Container>

        <Container>
            <div className="row">
                <h2>Your recents posts</h2>
            </div>
            <div className="row">
                {posts.map(post => <Post post={post} />)}
            </div>
        </Container>
        <div>
        </div>
        </div>
    );
}
