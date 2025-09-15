import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../AxiosPublic/useAxiosPublic';

const useMangeMember = () => {
    const axiosPubilc = useAxiosPublic()
    // const{loader,setloader}=useState(true)
    const { data:totaluser, refetch,isLoading } = useQuery({
        queryKey: ['totaluser'],
        queryFn: async () => {
            const res = await axiosPubilc.get('/users')
            // setloader(false)
            return res.data
        }
    })
   
    return [totaluser, refetch,isLoading];
};

export default useMangeMember;