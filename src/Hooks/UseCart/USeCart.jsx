import { useQuery } from "@tanstack/react-query";
import UseAxios from "../useAxios/UseAxios";
import UseAuth from "../Auth/UseAuth";

const USeCart = () => {

    // tanStack query

    const axioSecure=UseAxios();
    const {user}=UseAuth();
    const {refetch, data: cart = [] } = useQuery({
        queryKey:['cart',user?.email],
        queryFn: async ()=>
            {
                const res = await axioSecure.get(`carts?email=${user.email}`)
                return res.data
            }
    });
    return [cart,refetch]


};

export default USeCart;