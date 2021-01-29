import {useContext} from 'react'
import {UserContext} from "./providers/UserProvider";
import {Route, Switch, Redirect, useHistory,} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./Components/NavBar";
import Logout from "./Components/Auth/Logout";
import dotenv from 'dotenv'
import {createPortal} from "react-dom";
import Footer from "./Components/Footer";


export default function App () {


    const {user} = useContext(UserContext)
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
                    { !user ? <Redirect to="/login" />: <ProfilePage />}
                </Route>
                <Route path="/login">
                    {<LoginPage />}
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
                <Footer />
            </>
    )
}

function Covid () {
    const navigate = useHistory()
    const {user} = useContext(UserContext)
    const handleClick = () => {
        !user ? navigate.push("/login") : navigate.push("/profile")
        console.log("clock")
    }
    return (createPortal(
    <a data-toggle="tooltip" data-placement="top" title="Go to your profile" className="covid-spinner" onClick={handleClick}>
    <img src="https://firebasestorage.googleapis.com/v0/b/covid-statistics-3fcc4.appspot.com/o/covid.png?alt=media" className="covid-img"/>
    </a>, document.body)
    )
}
function Toastr () {
    const message = {
        type: "success",
        message: "Hi"
    }
   // const message = JSON.parse(sessionStorage.getItem("toastr"))
    if(!message){
        return <></>
    }
    //return <Toastr toastType={message.type} >{message.message}</Toastr>
    return <></>
}
