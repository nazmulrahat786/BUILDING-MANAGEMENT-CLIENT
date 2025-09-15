import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Latout/MainLayout';
import Home from '../Pages/Home/Home';
import Apartment from '../Pages/Apartment/Apartment';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import DashBoardLayOut from '../Latout/DashBoardLayOut';
// import Myprofile from '../Pages/User/MyProfile/Myprofile';
import Announcements from '../Pages/DashBoard/User/Announcements';
import AdminProfile from '../Pages/DashBoard/Admin/AdminProfile/AdminProfile';
import ManageMembers from '../Pages/DashBoard/Admin/ManageMembers/ManageMenbers'
import MakeAnnouncement from '../Pages/DashBoard/Admin/MakeAnnouncement/MakeAnnouncement'
import AgreementRequests from '../Pages/DashBoard/Admin/AgreementRequests/AgreementRequests'
import ManageCoupons from '../Pages/DashBoard/Admin/ManageCoupons/ManageCoupons'
import MemberProfile from '../Pages/DashBoard/Member/MemberProfile';
import MyProfile from '../Pages/DashBoard/User/MyProfile';
import PrivateRoute from './PrivateRoute';
import MemberRoute from './MemberRoute';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import AdminRoute from './AdminRoute';
import MakePayment from '../Pages/DashBoard/Member/MakePayment/MakePayment';
import PaymentForm from '../Pages/DashBoard/Member/MakePayment/Payment';
import PaymentHistory from '../Pages/DashBoard/Member/PaymentHistory/PaymentHistory';
import WelcomePage from '../Pages/DashBoard/WelcomePage';
import AllPaymentHistory from '../Pages/DashBoard/Admin/AllPaymentHistory/AllPaymentHistory';
// import AllPaymentHistory from '../Pages/AllPaymentHistory/AllPaymentHistory';
// import useAdmin from '../Hooks/useAdmin/useAdmin';



const Routes = createBrowserRouter([
    
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'apartment',
                element: <Apartment></Apartment>,
                // loader:()=>fetch('')
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashBoardLayOut></DashBoardLayOut>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path:'/dashboard',
                element:<PrivateRoute><WelcomePage></WelcomePage></PrivateRoute>
            },
            {
                path: '/dashboard/userProfile',
                element:<PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: '/dashboard/announcements',
                element: <PrivateRoute><Announcements></Announcements></PrivateRoute>
            },

            //admin dashboard
            {
                path: '/dashboard/adminprofile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
           
            {
                path:'/dashboard/manageMembers',
                element:<AdminRoute><ManageMembers></ManageMembers></AdminRoute>
            },
            {
                path:'/dashboard/makeAnnouncement',
                element:<AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
            },
            {
                path:'/dashboard/agreementRequests',
                element:<AdminRoute><AgreementRequests></AgreementRequests></AdminRoute>
            },
            {
                path:'/dashboard/manageCoupons',
                element:<AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>
            },
            {
                path: '/dashboard/allpaymenthistory',
                element: <AdminRoute><AllPaymentHistory></AllPaymentHistory></AdminRoute>
            },
            //member profile
            {
                path:'/dashboard/memberProfile',
                element:<MemberRoute><MemberProfile></MemberProfile></MemberRoute>
            },
            {
                path:'/dashboard/makePayment',
                element:<MemberRoute><MakePayment></MakePayment></MemberRoute>
            },
            {
                path:'/dashboard/makePayment/paymentForm/:id',
                element:<MemberRoute><PaymentForm></PaymentForm></MemberRoute>
            },
            {
                path:'/dashboard/paymentHistory',
                element:<PaymentHistory></PaymentHistory>
            }
        ]
    }
    
])


export default Routes;