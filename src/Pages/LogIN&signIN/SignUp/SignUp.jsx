import signupIMG from '../../../assets/assets/others/Illustration.svg'
// import SocialLogin from '../Shared/SociaLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../ContextProvider/AuthProvider';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic/useAxiosPublic';
import SocialLogin from '../SocialLogin/SocialLogin';






const SignUp = () => {

    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserInfo } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/'

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                updateUserInfo(data.name, data.photoURL)
                    .then(() => {
                        const savedUser = { name: data.name, email: data.email }
                        axiosPublic.post('users', savedUser)
                            .then(res => {
                                if (res.data.insertedId) {

                                }
                            }
                            )
                        reset();
                        Swal.fire({
                            title: 'Successfully Signed in',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    })
                    .catch(error => console.log(error))
                     navigate(from, { replace: true });
            })
    }



    return (
        <>
            <Helmet>
                <title>B-Deshi | | Register</title>
            </Helmet>
            <div className="hero min-h-screen bg-red-500 ">
                <div className="hero-content flex-col lg:flex-row md:flex mt-24">
                    <div className="text-center md:w-1/2 lg:text-left mx-16 shadow-2xl">

                        <img className='' src={signupIMG} alt="" />

                    </div>

                    {/* this form is formatted with react-hook-form */}

                    <div className="card flex-shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className='card-body' >

                            {/* NAME FIELD */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" {...register("name", { required: true })} name='name' className="input input-bordered" />
                                {errors.name && <span className='text-red-500'>This field is required</span>}

                            </div>

                            {/* EMAIL FIELD */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email"{...register("email", { required: true })} name='email' className="input input-bordered" />
                                {errors.email && <span className='text-red-500'>This field is required</span>}
                            </div>


                            {/* PASSWORD FIELD */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password"{...register("password", {

                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/

                                })} name='password' className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className='text-red-500'>This field is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-500'>Atleast 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-500'> password must be below 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-500'>Password must have one uppercase, one lowercase and special character</span>}

                            </div>


                            {/* PHOTO FIELD */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input type="text" placeholder="photoURL" {...register("photoURL", { required: true })} className="input input-bordered" />
                                {errors.photoURL && <span className='text-red-500'>This field is required</span>}

                            </div>


                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type='submit' value='Sign Up'></input>
                            </div>
                        </form>
                        <p className='text-center mb-2'><small>Already have an Account? <Link className='text-red-500' to='/login'>Login</Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;