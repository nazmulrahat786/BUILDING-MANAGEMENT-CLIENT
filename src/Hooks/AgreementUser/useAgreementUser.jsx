import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure'

const useAgreementUser = () => {
    const axiosSecure=useAxiosSecure()
    // const{loader,setloader}=useState(true)
    const { data:agreement,isLoading,refetch } = useQuery({
        queryKey: ['apartment'],
        queryFn: async () => {
            const res = await axiosSecure.get('/agreementsRequest')
            // setloader(false)
            return res.data
        }
    })
   
    return [agreement,isLoading,refetch];
};
export default useAgreementUser;