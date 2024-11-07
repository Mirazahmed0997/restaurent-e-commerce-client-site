import React from 'react';
import SharedTitle from '../../Home/SharedTitle';
import { useForm } from 'react-hook-form';
import UseAxios from '../../../Hooks/useAxios/UseAxios';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic/useAxiosPublic';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItem = () => {
    const { register, handleSubmit } = useForm();
   
    const {name,category,recipe,price,_id,image}= useLoaderData();

    const axiosSecure = UseAxios();
    const axiosPublic = useAxiosPublic();


    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        if (res.data.success) {
            const uplodedMenuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }

            const menuItem = await axiosSecure.patch(`menu/${_id}`, uplodedMenuItem);
            console.log(menuItem)
            if (menuItem.data.modifiedCount > 0) {

                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been Updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }


    };

    return (
        <div>
            <SharedTitle title='Edit product' subTitle='Make it sure'></SharedTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Reciepe Name*</span>
                        </div>
                        <input {...register("name", { required: true })}
                            defaultValue={name}
                            type="text"
                            placeholder="Reciepe Name"
                            className="input input-bordered w-full " />
                    </label>


                    <div className='flex gap-6'>
                        <div>
                            <label className="form-control w-full my-6">
                                <div className="label">
                                    <span className="label-text">Category*</span>
                                </div>
                                <select defaultValue={category} {...register("category", { required: true })}
                                    className="select select-bordered w-full ">
                                    <option disabled selected>Select a Category</option>
                                    <option value="salad">Salad</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="soup">Soup</option>
                                    <option value="desert">Desert</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </label>

                        </div>
                        <div>
                            <label className="form-control w-full my-6">
                                <div className="label">
                                    <span className="label-text">Price*</span>
                                </div>
                                <input {...register("price", { required: true })}
                                    type="text"
                                    placeholder="Price"
                                    defaultValue={price}
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Receipe Details*</span>
                        </div>
                        <textarea defaultValue={recipe}  {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Details"></textarea>
                    </label>

                    <div className='my-6'>
                        <input  {...register("image", { required: false })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className='btn'> Update Item <FaUtensils></FaUtensils> </button>

                </form>
            </div>
        </div>
    );
};

export default UpdateItem;