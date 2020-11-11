import { Router } from '@reach/router'
import ProfilePage from "../Components/Profile/ProfilePage";
import SignUp from "../Components/Auth/SignUp";
import SignIn from "../Components/Auth/SignIn";
import PasswordReset from "../Components/Auth/PasswordReset";
import UserProvider, {UserContext} from "../providers/UserProvider";
import React, {useContext} from "react";

export default function Profile() {
    const user = useContext(UserContext);
    const { displayName, email} = user;
    return (
        <Router>
        <UserProvider>
        user ?
            <ProfilePage />
            :
                <SignUp path="signUp" />
                <SignIn path="signIn" />
                <PasswordReset path = "passwordReset" />
        </UserProvider>
        </Router>
    );
}
