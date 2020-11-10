import { Router } from '@reach/router'
import './App.css';
import ProfilePage from "./Components/Profile/ProfilePage";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import PasswordReset from "./Components/Auth/PasswordReset";

export default function Profile() {
    const user = null;
    return (
        user ?
            <ProfilePage />
            :
            <Router>
                <SignUp path="signUp" />
                <SignIn path="/" />
                <PasswordReset path = "passwordReset" />
            </Router>

    );
}
