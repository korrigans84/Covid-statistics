import React, { Component, createContext } from "react";
import {auth, generateUserDocument, setAdmin, signInWithGoogle, signOut} from "../firebase";

export const UserContext = createContext({
    user: null,
    loginWithGoogle: () => {},
    logout: () => {},
    becomeAdmin: async () => {}
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
        this.becomeAdmin = async () => {
            if(this.state.user){
                this.state.user = {...this.state.user, isAdmin: true}
                await setAdmin(this.state.user)
            }

        }
        this.state= {
            user: null,
            loginWithGoogle: this.loginWithGoogle,
            logout: this.logout,
            becomeAdmin: this.becomeAdmin

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
