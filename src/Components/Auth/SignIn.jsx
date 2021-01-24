import React, {useContext, useEffect, useState} from 'react'
import {auth, signInWithGoogle} from "../../firebase";
import {UserContext} from "../../providers/UserProvider";
import {Form, Icon, Divider, Button, Container} from "semantic-ui-react";
import {useHistory} from "react-router-dom";



export default function SignIn(){
    const navigate = useHistory();
    const user = useContext(UserContext);
    //hooks useState
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(function () {
        if(user !== undefined){
            navigate.push('/profile')
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

        </>
    );
}
