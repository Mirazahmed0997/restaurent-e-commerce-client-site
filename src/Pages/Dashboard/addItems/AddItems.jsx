import React from 'react';
import SharedTitle from '../../Home/SharedTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic/useAxiosPublic';
import UseAxios from '../../../Hooks/useAxios/UseAxios';
import Swal from 'sweetalert2';


const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const { register, handleSubmit,reset } = useForm();
    const axiosPublic= useAxiosPublic();
    const axiosSecure=UseAxios();
    const onSubmit = async(data) => {
        console.log(data)
        const imageFile= {image: data.image[0]}
        const res= await axiosPublic.post(image_hosting_api,imageFile,
            {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        if(res.data.success)
        {
            const uplodedMenuItem={
                name:data.name,
                category:data.category,
                price: parseFloat(data.price),
                recipe: data.recipe                ,
                image: res.data.data.display_url
            }

            const menuItem= await axiosSecure.post('menu',uplodedMenuItem);
            console.log(menuItem)
            if(menuItem.data.insertedId)
            {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been Added`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            
        }
        // console.log(res.data)
        

    };


    return (
        <div>
            <SharedTitle title='ADD an item' subTitle="What's new"></SharedTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Reciepe Name*</span>
                        </div>
                        <input {...register("name",{ required: true})}
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
                                <select {...register("category",{ required: true})}
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
                                <input {...register("price",{ required: true})}
                                    type="text"
                                    placeholder="Price"
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Receipe Details*</span>
                        </div>
                        <textarea  {...register("recipe",{ required: true})} className="textarea textarea-bordered h-24" placeholder="Details"></textarea>
                    </label>

                    <div className='my-6'>
                        <input  {...register("image",{ required: true})} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className='btn'> Add Items <FaUtensils></FaUtensils> </button>

                </form>
            </div>


        </div>
    );
};

export default AddItems;