import { Link } from "react-router-dom";
import React from "react";

function App() {
    const {user} = useAuthentication();
    return user ? <AuthenticatedStack/> : <DefaultStack/>
    // return (
    //     <div>
    //         <Link to="/about">About</Link>
    //         <Link to="/auth">Login/Register</Link>
    //         <h2>Github Pages</h2>
    //         <h3>Deploying React to Github</h3>
    //     </div>
    // );
}
export default App;