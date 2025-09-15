import useAxiosSecure from '../AxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';

const usePaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loader } = useAuth()
    const email = user.email;
    const { data: paymentHistory, isPending } = useQuery({
        queryKey: ['paymentHistoey'],
        enabled: !loader,
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentHistory?email=${email}`)
            return res.data
        }
    })
    return [paymentHistory, isPending]
};

export default usePaymentHistory;