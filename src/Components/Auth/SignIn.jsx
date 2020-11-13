import React, {useContext, useEffect, useState} from 'react'
import {Link, useNavigate} from "@reach/router";
import {auth, signInWithGoogle} from "../../firebase";
import {UserContext} from "../../providers/UserProvider";
import {Form, Icon, Divider, Button, Container} from "semantic-ui-react";
import NavBar from "../NavBar";



export default function SignIn(){
    const navigate = useNavigate();
    const user = useContext(UserContext);
    //hooks useState
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(function () {
        if(user !== undefined){
            navigate('/profile')
        }
    },[user, navigate])
    //prevent submit
    const signInWithEmailAndPasswordHandler =
        (e,email, password) => {
            e.preventDefault();
            auth.signInWithEmailAndPassword(email, password).catch(error => {
                setError("Error signing in with password and email!");
                console.error("Error signing in with password and email", error);
            });
            console.log(user)
        };

    const onChangeHandler = (e) => {
        const {name, value} = e.currentTarget;

        //capture inputs into our hooks
        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    return (
        <>
        <NavBar />
        <Container text textAlign='center' className="mt-5">
            <Form>
                <Form.Field>
                    <label className="text-left ml-2" htmlFor="userEmail">Email :</label>
                    <input placeholder='Your Email' value={email} type="email" id="userEmail"
                           onChange={(e) => onChangeHandler(e)}/>
                </Form.Field>
                <Form.Field>
                    <label className="text-left ml-2" htmlFor="userPassword">Password</label>
                    <input type="password"
                           name="userPassword"
                           value={password}
                           placeholder="Your Password"
                           id="userPassword"
                           onChange={(e) => onChangeHandler(e)}/>
                </Form.Field>
                <Button type='submit' className="text-right" onClick={(e) => {
                    signInWithEmailAndPasswordHandler(e, email, password)
                }}>Login</Button>
            </Form>
            <Divider horizontal>Or</Divider>

            <Button color='google plus' onClick={ async (e) => {
                signInWithGoogle();
            }}>
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
        </>
    );
}
