import React, {useContext} from 'react'
import {UserContext} from "../providers/UserProvider";
import {Link, useHistory} from "react-router-dom";
import {Button} from "semantic-ui-react";

export default function NavBar()
{
    const {user, logout} = useContext(UserContext);
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
                        <Link className="nav-link" to="/countries">Countries</Link>
                    </li>

                    <li className="nav-item mr-auto">
                        <Link className="nav-link" to="/posts">Forum</Link>
                    </li>

                    <li className="nav-item ui right aligned">
                        { user ? <><button className="btn btn-outline-danger" onClick={() => { logout() }}>Logout</button>
                                <Link className="btn btn-outline-secondary" to="/profile">Profile</Link>
                        </>:
                            <Link className="btn btn-outline-success" to="/login">Login</Link>
                        }
                    </li>
                </ul>

            </div>
        </nav>
    )
}
