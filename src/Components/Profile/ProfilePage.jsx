import React, {useContext} from 'react'
import {auth} from "../../firebase";
import {UserContext} from "../../providers/UserProvider";
import SignIn from "../Auth/SignIn";

export default function ProfilePage(){
    const user = useContext(UserContext);
    if(user === null){
        return (<SignIn />)
    }
    return(
    <div>
        <h1>This is the profile page</h1>
        <button className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>
    </div>
);
}
