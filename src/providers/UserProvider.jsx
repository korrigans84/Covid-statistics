import React, { Component, createContext } from "react";
import {auth, generateUserDocument} from "../firebase";

export const UserContext = createContext({ user: null });
export default class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            if(!userAuth){
                //for annonym or signout
                this.setState({user: null})
            }
            else{
                //for signin
                const user = await generateUserDocument(userAuth);
                this.setState({ user });
            }
        });
    };
    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
