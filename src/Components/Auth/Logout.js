import {useContext, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {UserContext} from "../../providers/UserProvider";

export default function Logout (){
    const history = useHistory()
    const {user, logout} = useContext(UserContext)
    useEffect(async () => {
        !user ? history.push("/") : await logout()
        history.push ("/")
    }, [])
    return (
        <>
        </>
    )
}
