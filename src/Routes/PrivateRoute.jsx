import useAuth from "../Hooks/useAuth";
import loading from '/public/loading.gif'
const PrivateRoute = ({ children }) => {

    const { user, loader } = useAuth()


    if (loader) {
        return <img src={loading} alt="" className="mx-auto mt-28"/>
    }
    if (user) {
        return children
    }
    
};

export default PrivateRoute;