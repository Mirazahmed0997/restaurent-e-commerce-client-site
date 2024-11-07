import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin/UseAdmin";
import UseAuth from "../Hooks/Auth/UseAuth";

const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoading]=UseAdmin();
    const {user,loading}=UseAuth();
    const location=useLocation()

    if(loading || isAdminLoading)
    {
        return <progress className="progress w-56"></progress>
    }

    if(user && isAdmin)
    {
        return children;
    }
    return <Navigate to='/login'state={{from:location}}replace></Navigate>
};

export default AdminRoute;