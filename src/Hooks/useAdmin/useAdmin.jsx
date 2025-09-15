import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";

const useAdmin = () => {
    const {user,loader}=useAuth();
    const axiosSecure=useAxiosSecure()
    // console.log(user?.email)
//  con

    const {data:role , isPending}=useQuery({
        queryKey:[user?.email,'role'],
        enabled:!loader,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/user/admin/${user?.email}`)
            // console.log(res.data)
            return res.data.role
        }
    })
   return[role,isPending]
};

export default useAdmin;