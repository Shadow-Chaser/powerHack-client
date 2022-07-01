import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../App";

const PrivateRoute = () => {
    const [user, setUser] = useContext(UserContext);
    let location = useLocation();

    console.log("Check user in Private: ", user);
    if (!user?.email) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
};

export default PrivateRoute;

