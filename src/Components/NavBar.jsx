import React, {useContext} from 'react'
import {UserContext} from "../providers/UserProvider";
import {signOut} from "../firebase";
import {Link, useHistory} from "react-router-dom";

export default function NavBar()
{
    const user = useContext(UserContext);
    const navigate = useHistory()
    const handleClick = function (e) {
        navigate.push('/signin')
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-main">
            <Link to="/" >Covid-Statistics</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item mr-auto">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>

                    <li className="nav-item">
                        { user ? <Link className="btn btn-danger" to="/signout">SignOut</Link>:
                            <Link className="btn btn-success" to="/signin">SignIn</Link>
                        }
                    </li>
                </ul>

            </div>
        </nav>
    )
}
