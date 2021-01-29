

export default function Message({message}){
    return(
        <div className="container">
        <div className="alert alert-info alert-dismissible">
            <i className="close icon"></i>
            <div>
                Your user registration was successful.
            </div>
            <p>You may now log-in with the username you have chosen</p>
        </div>
        </div>
    )
}
