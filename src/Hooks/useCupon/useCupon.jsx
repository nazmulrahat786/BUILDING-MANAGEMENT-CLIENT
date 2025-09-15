import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure';
import useAxiosPublic from '../AxiosPublic/useAxiosPublic';

const useCupon = () => {
    // const axiosSecret = useAxiosSecure()
    const axiosPubilc = useAxiosPublic()
    const { data: cupon, isPending, refetch } = useQuery({
        queryKey: ['cupon'],
        queryFn: async () => {
            const res = await axiosPubilc.get('/cupons')
            return res.data

        }
    })
    return [cupon, isPending, refetch]
};

export default useCupon;