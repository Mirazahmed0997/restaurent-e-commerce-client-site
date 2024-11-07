import axios from "axios";
import { config } from "localforage";
import { useNavigate } from "react-router-dom";
import UseAuth from "../Auth/UseAuth";

const axioSecure = axios.create({
  baseURL: 'http://localhost:5000/'
})

const UseAxios = () => {
  
  const navigate=useNavigate();
  const {logout}=UseAuth()


  // req interceptor to add authorization header for every scure call to the API

  axioSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    config.headers.authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });



  // interceptor 401 and 403

  axioSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {

    const status= error.response.status;
    if(status===401 || status===403)
      {
        await logout();
        navigate('/login')
      }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  return axioSecure;
};

export default UseAxios;