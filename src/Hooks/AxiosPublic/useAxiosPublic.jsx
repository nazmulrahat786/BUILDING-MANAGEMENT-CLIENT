import axios from "axios";

const useAxiosPublic = () => {
    const axiosPubilc=axios.create({
        baseURL: 'https://building-management-system-server-a.vercel.app'
      });
    return (
            axiosPubilc
    );
};

export default useAxiosPublic;
