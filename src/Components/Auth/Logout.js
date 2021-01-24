import {useContext, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {UserContext} from "../../providers/UserProvider";

/**
 * This function logout the user using firebase (from the userContext)
 * And navigate to the homepage
 * @returns {JSX.Element}
 * @constructor
 */
export default function Logout (){
    const history = useHistory()
    const {user, logout} = useContext(UserContext)
    useEffect(async () => {
        async function _logout() {
            console.log('logooo')
            !user ? history.push("/") : await logout()
            history.push ("/")
        }
    }, [])
    return (
        <>
        </>
    )
}
