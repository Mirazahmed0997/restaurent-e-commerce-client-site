import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxios from '../../../Hooks/useAxios/UseAxios';
import { FaUser, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axioSecure = UseAxios();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axioSecure.get('users');
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        axioSecure.patch(`users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is admin now! `,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
    }


    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {

                    axioSecure.delete(`users/${user._id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                                refetch();
                            }
                        }
                        )
                }
            });
    }

    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
            <h2 className="mb-4 text-2xl font-semibold leading-tight">Total Users : {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-24" />
                    </colgroup>
                    <thead className="dark:bg-gray-300">
                        <tr className="text-left">
                            <th className="p-3"></th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            {/* <th className="p-3 text-right">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) =>

                                <tr key={user._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                    <td className="p-3">
                                        <p>{index + 1}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{user.name}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{user.email}</p>
                                    </td>
                                    <td className="p-3">
                                      {user.role==='admin'? 'Admin':  <button onClick={() => handleMakeAdmin(user)} className='btn bg-orange-500'>
                                            <FaUsers className='text-2xl'></FaUsers>
                                        </button>}
                                    </td>


                                    <td className="p-3 text-right">
                                        <button onClick={() => handleDeleteUser(user)} type="button" className="flex items-center ms-6 pl-0 space-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                <rect width="32" height="200" x="168" y="216"></rect>
                                                <rect width="32" height="200" x="240" y="216"></rect>
                                                <rect width="32" height="200" x="312" y="216"></rect>
                                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;