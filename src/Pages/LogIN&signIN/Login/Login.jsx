// import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../../../assets/assets/others/Illustration.svg'
import Swal from 'sweetalert2'
// import SocialLogin from '../Shared/SociaLogin/SocialLogin';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../ContextProvider/AuthProvider';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../SocialLogin/SocialLogin';


const Login = () => {

    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState([])
    const [success, setSuccess] = useState(false)
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        loadCaptchaEnginge(4);
    }, [])

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value
        const password = form.password.value

        signIn(email, password)
            .then(result => {
                const user = result.user
                Swal.fire({
                    title: 'Successfully Logged in',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                setSuccess(true)
                form.reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                setError(error.message)
            })

    }

    const handleValidateCaptcha = (e) => {
        const captchaValue = e.target.value;
        console.log(captchaValue)
        if (validateCaptcha(captchaValue)) {
            setDisabled(false)
        }
        else
        {
            setDisabled(true)
        }
    }
    return (

        <>
            <Helmet>
                <title>B-Deshi | | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-red-200 ">
                <div className="hero-content flex-col lg:flex-row md:flex mt-24">
                    <div className="text-center md:w-1/2 lg:text-left mx-16">
                        <img src={loginImg}  alt="" />
                    </div>
                    <div className="card flex-shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            {/*react captcha */}

                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>

                                <input onBlur={handleValidateCaptcha} type="text" placeholder="Click Outer the box after Type the text above" name='captcha' className="input input-bordered" required />
                            </div>
                            {/* <div className="form-control">
                                <label className="cursor-pointer label">
                                    <input type="checkbox" checked="checked" className="checkbox checkbox-secondary" />
                                    <span className="text-start">Accepts the all terms and conditions</span>
                                </label>
                            </div> */}
                            <div className="form-control ">
                                <input disabled={disabled} className="btn btn-primary" type='submit' value='Login'></input>
                            </div>
                        </form>

                        <div className='text-center'>
                            {
                                success ?
                                    <small className='text-primary ms-2 text-red-600'></small> : <small className=' ms-3 text-red-600'>{error}</small>
                            }
                        </div>
                        <p className='text-center'><small>Don't have an Account? <Link className='text-red-500' to='/signUp'>create an account </Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;