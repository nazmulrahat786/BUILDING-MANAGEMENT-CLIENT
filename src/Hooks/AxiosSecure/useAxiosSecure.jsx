import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../useAuth';
 
const axiosSecure = axios.create({
    baseURL: 'https://building-management-system-server-a.vercel.app'
})
const useAxiosSecure = () => {
    const { logOutUser } = useAuth()
    const nevigate = useNavigate()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('interceptor:', token)
        config.headers.authorization = `Bearer ${token}`
        // console.log(config.headers.authorization)
        return config;
    }, function (error) {
        // Do something with request error
        // console.log(error)
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {

        return response;
    }, async (error) => {
        const status = await error.response.status
        console.log("status error:", error)
        if (status === 401 || status === 403) {
            await logOutUser()
            // console.log(status)
            nevigate('/login')
        }
        return Promise.reject(error);
    });
    return axiosSecure

};

export default useAxiosSecure;
