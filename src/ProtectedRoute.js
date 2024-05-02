import {Navigate} from "react-router-dom";

const ProtectedRoute = ({user, redirectPath = '/', children}) => {
    if (user == null) {
        return <Navigate to={redirectPath} replace/>;
    }

    return children;
};

export default ProtectedRoute;