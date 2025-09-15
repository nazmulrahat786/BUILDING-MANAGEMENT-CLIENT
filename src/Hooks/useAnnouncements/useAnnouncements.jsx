import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import useAxiosPublic from '../AxiosPublic/useAxiosPublic';

const useAnnouncements = () => {
    const { loader } = useAuth();
    const axiosPubilc = useAxiosPublic()
    const { data: announcement, isPending } = useQuery({
        queryKey: ['announcement'],
        enabled: !loader,
        queryFn: async () => {
            const res = await axiosPubilc.get(`/announcements`)
            return res.data
        }
    })
    return [announcement,isPending]
};

export default useAnnouncements;