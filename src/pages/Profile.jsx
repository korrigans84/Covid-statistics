import {Router, useNavigate} from '@reach/router'
import ProfilePage from "../Components/Profile/ProfilePage";
import UserProvider, {UserContext} from "../providers/UserProvider";
import React, {useContext, useEffect} from "react";
import SignIn from "../Components/Auth/SignIn";

export default function Profile() {
    const navigate = useNavigate();
    const user = useContext(UserContext);

    useEffect(() => {
        console.log(user)
        if(!user){
            navigate("/signin");
        }
    }, [user])

    const { displayName, email} = user;
    return (
        <ProfilePage />
    );
}
