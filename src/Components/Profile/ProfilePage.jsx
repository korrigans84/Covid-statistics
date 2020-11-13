import React, {useContext} from 'react'
import {signOut} from "../../firebase";
import {UserContext} from "../../providers/UserProvider";
import SignIn from "../Auth/SignIn";
import NavBar from "../NavBar";

export default function ProfilePage(){
    const user = useContext(UserContext);
    if(user === null){
        return (<SignIn />)
    }
    return(
        <>
            <NavBar />
                <div>
                    <h1>This is the profile page</h1>
                    <button className = "btn btn-danger" onClick = {() => {signOut()}}>Sign out</button>
                </div>
            </>
);
}
