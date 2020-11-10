import { Router } from '@reach/router'
import ProfilePage from "./Components/Profile/ProfilePage";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import PasswordReset from "./Components/Auth/PasswordReset";
import UserProvider from "./providers/UserProvider";
import React from "react";

export default function Profile() {
    const user = null;
    return (
        <UserProvider>
        user ?
            <ProfilePage />
            :
            <Router>
                <SignUp path="signUp" />
                <SignIn path="signIn" />
                <PasswordReset path = "passwordReset" />
            </Router>
        </UserProvider>
    );
}
