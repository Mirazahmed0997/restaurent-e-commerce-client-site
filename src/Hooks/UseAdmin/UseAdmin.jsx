import { useQuery } from "@tanstack/react-query";
import UseAuth from "../Auth/UseAuth";
import UseAxios from "../useAxios/UseAxios";

const UseAdmin = () => {
    const {user}=UseAuth();
    const axiosSecure= UseAxios()
   const {data: isAdmin, isPending: isAdminLoading}=useQuery({
    queryKey:[user?.email,'isAdmin'],
    queryFn: async()=>
        {
            const res= await axiosSecure.get(`users/admin/${user.email}`);
            return res.data?.admin
        }
   })

   return[isAdmin, isAdminLoading]
};

export default UseAdmin;