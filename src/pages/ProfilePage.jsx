import {UserContext} from "../providers/UserProvider";
import React, {useContext, useEffect} from "react";
import {signOut} from "../firebase";

export default function ProfilePage() {
    const user = useContext(UserContext);

    useEffect(() => {

    }, [user])
    return (
        <div>
            <h1>This is the profile page</h1>
            <button className = "btn btn-danger" onClick = {() => {signOut()}}>Sign out</button>
        </div>
    );
}
