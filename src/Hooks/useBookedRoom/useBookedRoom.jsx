import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure';
import useAxiosPublic from '../AxiosPublic/useAxiosPublic';


const useBookedRoom = () => {
    const axiosPubilc=useAxiosPublic()
    // const{loader,setloader}=useState(true)
    const { data:bookedRoom,isLoading } = useQuery({
        queryKey: ['bookedRoom'],
        queryFn: async () => {
            const res = await axiosPubilc.get('/bookedRoom')
            // setloader(false)
            return res.data
        }
    })
   console.log(bookedRoom)
    return [bookedRoom,isLoading];
};
export default useBookedRoom;