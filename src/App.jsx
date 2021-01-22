import UserProvider from "./providers/UserProvider";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {Header} from "semantic-ui-react";


export default function App () {

    return (
        <UserProvider>
            <Router>
            <Header />
            <Switch>
                <Route path"/">
                    <HomePage />
                </Route>
                <Route path"/countries" >
                    <CountriesPage />
                </Route>
                <Route path="/country/:countryCode">
                    <CountryPage/>
                </Route>
                <Route path="/profile">
                    { !user ? <Redirect to="/signin" />: <ProfilePage />}
                </Route>
                <Route path="/signin">
                    {user ? <Redirect to="/profile" /> : <LoginPage />}
                </Route>
                <Route path="/signin">
                    {user ? <Redirect to="/profile" /> : <RegisterPage />}
                </Route>
            </Switch>
            </Router>
        </UserProvider>
    )
}
