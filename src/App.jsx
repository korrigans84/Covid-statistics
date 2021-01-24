import {useContext, useEffect} from 'react'
import {UserContext} from "./providers/UserProvider";
import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {Header} from "semantic-ui-react";
import NavBar from "./Components/NavBar";
import Logout from "./Components/Auth/Logout";


export default function App () {
    const {user, logout } = useContext(UserContext)
    const withoutHeader = ['/login', '/register', '/logout']
    const history = useHistory()
    useEffect(() => {
        console.log(history.location.pathname)
    }, [history])
    return (

            <>
                <NavBar />
            <Switch>
                <Route path="/country/:countryCode">
                    <CountryPage/>
                </Route>
                <Route path="/countries" >
                    <CountriesPage />
                </Route>
                <Route path="/profile">
                    { !user ? <Redirect to="/signin" />: <ProfilePage />}
                </Route>
                <Route path="/login">
                    {user ? <Redirect to="/profile" /> : <LoginPage />}
                </Route>
                <Route path="/logout">
                    {!user ? <Redirect to="/" /> : <Logout /> }
                </Route>
                <Route path="/register">
                    {user ? <Redirect to="/profile" /> : <RegisterPage />}
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
            </>
    )
}
