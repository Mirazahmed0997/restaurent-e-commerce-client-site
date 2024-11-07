import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../ContextProvider/AuthProvider';
import { FaShoppingCart } from "react-icons/fa";
import USeCart from '../../../Hooks/UseCart/USeCart';


const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const [cart]=USeCart();
    const handleLogOut = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>

        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Our Menu</Link></li>
        <li><Link to='/order/All'>Order Here</Link></li>
       
        {
            user ?
                <>
                    <li><Link>{user?.displayName}</Link></li>
                    <li><Link onClick={handleLogOut}>Logout</Link></li></>
                :
                <><li><Link to='/login'>Login</Link></li></>


        }
         <li><Link to='/dashboard/cart'>
                <FaShoppingCart></FaShoppingCart>
                <div className="badge badge-secondary">+{cart.length}</div>
            

        </Link></li>

    </>

    return (
        <div className="navbar fixed z-10 bg-opacity-50 bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
                        {navOptions}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            {/* <div className="navbar-end">
                <img src={user.photoURL} alt="" />
            </div> */}
        </div>
    );
};

export default Navbar;