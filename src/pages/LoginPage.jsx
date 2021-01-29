import React, { useContext, useEffect } from 'react'
import {Button, Container, Divider, Form, Icon} from "semantic-ui-react";
import {signInWithGoogle} from "../firebase";
import {Link, useHistory} from "react-router-dom";
import {UserContext} from "../providers/UserProvider";

export default function LoginPage(){
    const { user, loginWithGoogle } = useContext(UserContext)
    const history = useHistory()
    const handleLoginWithGoogle = async () => {
        await loginWithGoogle()
    }
    useEffect(() => {
        if(user){
            history.goBack()
            history.push('/')
        }
    }, [user])
    return(
        <Container text textAlign='center' className="mt-5">
            <div className="d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center"> Login now !</h1>
                    </div>
                    <div className="col-12 my-4">
                        <p className="text-center">For now, you can just sign in with Google.</p>
                    </div>
                    <div className="col-12 my-4">
                        <Button color='google plus' onClick={handleLoginWithGoogle}>
                            <Icon name='google plus'/>Sign in with Google
                        </Button>
                    </div>
                </div>

            </div>

        </Container>
    )
}
