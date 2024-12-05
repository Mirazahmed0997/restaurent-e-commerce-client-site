import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaVoicemail } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import USeCart from "../Hooks/UseCart/USeCart";
import UseAdmin from "../Hooks/UseAdmin/UseAdmin";

const Dashboard = () => {
    const [cart] = USeCart();

    const [isAdmin] = UseAdmin();
    return (
        <div className="flex">
            {/* --------Side bar------ */}
            <div className="w-64 min-h-full bg-orange-400">
                <ul className="menu">

                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to='/'> <FaHome></FaHome> Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/menu'> <FaSearch></FaSearch> Menu</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/adminHome'> <FaHome></FaHome> Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/cart'> <FaShoppingCart></FaShoppingCart> My Cart ({cart.length})</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/addItems'> <FaAd></FaAd>Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageItems'> <FaList></FaList> Manage Items</NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/manageBookings'> <FaBook></FaBook> Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allUsers'> <FaUser></FaUser> All Users</NavLink>
                            </li>

                        </> :
                            <>

                                <li>
                                    <NavLink to='/'> <FaHome></FaHome> Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/userHome'> <FaHome></FaHome>User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/cart'> <FaShoppingCart></FaShoppingCart> My Cart ({cart.length})</

                                    NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/paymentHistory'> <FaShoppingCart></FaShoppingCart>Payment History</

                                    NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reservation'> <FaCalendar></FaCalendar> My Reservation</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/menu'> <FaSearch></FaSearch> Menu</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/bookings'> <FaList></FaList> My Bookings Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/contact'><FaEnvelope></FaEnvelope> Contact</NavLink>
                                </li>
                            </>
                    }


                    <div className="divider">OR</div>



                    {/* -------------shared Nav----------- */}




                </ul>
            </div>
            {/* -------content----- */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;