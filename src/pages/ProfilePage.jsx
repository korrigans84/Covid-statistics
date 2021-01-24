import {UserContext} from "../providers/UserProvider";
import React, {useContext, useEffect, useState} from "react";
import {signOut} from "../firebase";
import {Container, Header} from "semantic-ui-react";
import PostType from "../Components/form/PostType";
import {usePosts} from "../hooks/usePosts";
import uuid from 'react-uuid'
export default function ProfilePage() {

    const {user} = useContext(UserContext);
    const {addPost} = usePosts()
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
    return (
        <div>
        <Header />
        <Container >
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body p-3">
                            { user.isAdmin && <PostType onSubmit={handlePostSubmit} error={error} />}
                        </div>
                    </div>
                </div>
            </div>

        </Container>
        <div>
            <button className = "btn btn-danger" onClick = {() => {signOut()}}>Sign out</button>
        </div>
        </div>
    );
}
