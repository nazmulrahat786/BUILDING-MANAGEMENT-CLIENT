import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin/useAdmin';
import loading from '/public/loading.gif'

const AdminRoute = ({ children }) => {
    const { user, loader } = useAuth()
    const [role] = useAdmin()
    if (loader) {
        return <img src={loading} alt="" className="mx-auto mt-28" />
    }
    if (user && role==='admin') {
        return children
    }
};

export default AdminRoute;