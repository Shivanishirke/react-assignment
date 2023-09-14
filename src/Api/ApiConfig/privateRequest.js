import axios from "axios";
import { notify } from "../../App";
export const privateRequest = axios.create({
//   baseURL: "/api",
});


// const axios = require('axios');

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 20s. If the request takes longer than
// that then the request will be aborted.

const getToken = () => {
    if(localStorage.getItem('token') !== null){
        const token = localStorage.getItem('token')
        return token
    }
}
// Step-2: Create request, response & error handlers
const requestHandler = request => {
    // Token will be dynamic so we can use any app-specific way to always   
    // fetch the new token before making the call
    request.headers.authorization = `${getToken()}`
    return request;
};

const responseHandler = response => {
    notify()
    return response;
};

const errorHandler = error => {
   
    if (error.response.status === 401) {
        window.location = '/';
        localStorage.removeItem("user")
    }
    return Promise.reject(error);
};
// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
privateRequest.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

privateRequest.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );