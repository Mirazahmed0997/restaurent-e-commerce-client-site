import React from 'react';
import UseAuth from '../../../Hooks/Auth/UseAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import UseAxios from '../../../Hooks/useAxios/UseAxios';
import USeCart from '../../../Hooks/UseCart/USeCart';

const AllItemsCard = ({ item }) => {
    const {name,recipe,image,price,_id}=item
    const {user}=UseAuth();
    const navigate= useNavigate()
    const location= useLocation();
    const axioSecure=UseAxios()
    const [,refetch]=USeCart();

    const handleAddToCart=(item)=>
        {
            if(user && user.email)
                {
                    const cartItem={
                        cartId: _id,
                        email: user.email,
                        image,
                        price,
                        name
                    }

                    axioSecure.post('carts', cartItem)
                    .then(res=>
                        {
                            console.log(res.data)
                            if(res.data.insertedId)
                                {
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: `${name} has been added`,
                                        showConfirmButton: false,
                                        timer: 1500
                                      });
                                      refetch();
                                }
                        }
                    )
                }
                else{
                    Swal.fire({
                        title: "Your not loggedIn",
                        text: "Please Login First!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Login"
                      }).then((result) => {
                        if (result.isConfirmed) {
                         navigate('/login', {state:{from: location}})
                        }
                      });
                }
        }

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl my-2">
                <figure>
                    <img
                    className='h-64 w-full'
                        src={image}
                        alt="foods" />
                </figure>
                <p className='absolute right-0 bg-slate-900 text-white mr-4 mt-4 px-2 '>${price}</p>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe.slice(0,40)}...</p>
                    <div className="card-actions justify-end">
                        <button onClick={()=>handleAddToCart(item)} className="btn btn-outline">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllItemsCard;