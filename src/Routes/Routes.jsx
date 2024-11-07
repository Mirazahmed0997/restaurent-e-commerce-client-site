import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu";
import OrderPage from "../Pages/OrderPage/OrderPage";
import Login from "../Pages/LogIN&signIN/Login/Login";
import SignUp from "../Pages/LogIN&signIN/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/addItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/home',
            element: <Home></Home>
        },
        {
            path:'menu',
            element: <Menu></Menu>
        },
        {
            path:'order/:category',
            element:<OrderPage></OrderPage>
        },
        {
            path:'login',
            element: <Login></Login>
        },
        {
            path:'signUp',
            element: <SignUp></SignUp>
        },
      ]
    },
    {
      path:'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path:'/dashboard/cart',
          element:<Cart></Cart>
        },

        // ------admin Routes-----

        {
          path:'/dashboard/addItems',
          element:<AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path:'/dashboard/allUsers',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'/dashboard/manageItems',
          element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path:'/dashboard/updateItem/:id',
          // element:<UpdateItem></UpdateItem>,
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader: ({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
        },
      ]
    }
  ]);
  