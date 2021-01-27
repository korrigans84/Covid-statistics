import React, { Component, createContext } from "react";
import {auth, generateUserDocument, signInWithGoogle, signOut} from "../firebase";
import {useHistory} from "react-router-dom";

export const UserContext = createContext({
    user: null,
    loginWithGoogle: () => {},
    logout: () => {}
});
export default class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.logout = async () => {
            await signOut()
        }
        this.loginWithGoogle = () => {
            const user = signInWithGoogle()
        }
        this.state= {
            user: null,
            loginWithGoogle: this.loginWithGoogle,
            logout: this.logout

        };
    }

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            if(!userAuth){
                //for anonym or signout
                this.setState({user: null})
            }
            else{
                //for signin or register
                if(!userAuth.isAdmin){
                    userAuth = {
                        ...userAuth,
                        isAdmin: false
                    }
                }
                if(userAuth.email === 'julien.thomas84@gmail.com'){
                    userAuth.isAdmin=true
                }
                const user = await generateUserDocument(userAuth);
                this.setState({ user });
            }
        });
    };
    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
