import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";

const useMenu = (searchTerm = "") => {
    const axiosPublic = useAxiosPublic();

    const { data: menu = [], isLoading: loading, refetch } = useQuery({
        queryKey: ["menu", searchTerm], // Include searchTerm in queryKey for caching
        queryFn: async () => {
            const res = await axiosPublic.get(`menu?q=${encodeURIComponent(searchTerm)}`);
            return res.data;
        },
        enabled: searchTerm !== null, // Enable only if searchTerm is defined
    });

    return [menu, loading, refetch];
};

export default useMenu;
