import React from 'react';
import SharedTitle from '../../Home/SharedTitle';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxios from '../../../Hooks/useAxios/UseAxios';
import useMenu from '../../../Hooks/UseMenu/UseMenu';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axioSecure = UseAxios();
    const handleDeleteItem = (item) => {
        console.log(item._id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = axioSecure.delete(`menu/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    }
                    )
            }
        });
    }

   
    return (
        <div>
            <SharedTitle title='manage your item' subTitle={`Total Item ${menu.length}`}></SharedTitle>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) =>
                                <tr>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.price}/=</td>
                                    <th>
                                        <Link to={`/dashboard/updateItem/${item._id}`}> <button><FaEdit></FaEdit></button></Link>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs"><FaTrashAlt></FaTrashAlt></button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                    {/* foot */}

                </table>
            </div>
        </div>
    );
};

export default ManageItems;