import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";

const useFindUser = () => {
    const {user,loader}=useAuth();
    const axiosSecure=useAxiosSecure()
    // console.log(user?.email)
//  con

    const {data:useInfo , isPending}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        enabled:!loader,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/ageementuser/${user?.email}`)
            // console.log(res.data)
            return res.data
        }
    })
   return[useInfo,isPending]
};

export default useFindUser;
