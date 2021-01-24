import React, { useContext } from 'react'
import {Button, Container, Divider, Form, Icon} from "semantic-ui-react";
import {signInWithGoogle} from "../firebase";
import {Link} from "react-router-dom";
import {UserContext} from "../providers/UserProvider";

export default function LoginPage(){
    const { user, loginWithGoogle } = useContext(UserContext)
    const handleLoginWithGoogle = async () => {
        loginWithGoogle()
    }
    return(
        <Container text textAlign='center' className="mt-5">

            <Divider horizontal>Or</Divider>

            <Button color='google plus' onClick={handleLoginWithGoogle}>
                <Icon name='google plus'/>Sign in with Google
            </Button>
            <Divider horizontal>Or</Divider>
            <p className="text-center my-3">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:text-blue-600">
                    Sign up here
                </Link>
                <br/>
                <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
                    Forgot Password?
                </Link>
            </p>
        </Container>
    )
}
