import React from 'react';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure';
import useAuth from '../useAuth';
import { useQuery } from '@tanstack/react-query';

const useAllpaymenthistory = () => {
    
        const axiosSecure = useAxiosSecure()
        const {  loader } = useAuth()
        // const email = user.email;
        const { data: allpaymentHistory, isPending } = useQuery({
            queryKey: ['allpaymentHistoey'],
            enabled: !loader,
            queryFn: async () => {
                const res = await axiosSecure.get('/allpaymentHistory')
                return res.data
            }
        })
        return [allpaymentHistory, isPending]


};

export default useAllpaymenthistory;