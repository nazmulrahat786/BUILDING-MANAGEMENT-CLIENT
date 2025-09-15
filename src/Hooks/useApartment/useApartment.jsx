import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../AxiosPublic/useAxiosPublic';
// import { useState } from 'react';
import loading from '/public/loading.gif'
import useAuth from '../useAuth';
const useApartment = () => {
    // const{loader}=useAuth()
    const axiosPubilc = useAxiosPublic()
    // const{loader,setloader}=useState(true)
    const { data:apartment, refetch,isPending } = useQuery({
        queryKey: ['apartment'],
        // enabled:!loader,
        queryFn: async () => {
            const res = await axiosPubilc.get('/apartment')
            // setloader(false)
            return res.data
        }
    })
    // if (isPending) {
    //    return <img src={loading} alt="" className="mx-auto mt-28" />
    // }
    return [apartment, refetch,isPending];
};
export default useApartment;