import React, { Component, createContext } from "react";
import {auth, generateUserDocument} from "../firebase";

export const UserContext = createContext({
    user: null,
    logout: () => {}
});
export default class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.logout = () => {

        }
        this.state= {
            user: null,
            logout: this.logout
        };
    }

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
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
