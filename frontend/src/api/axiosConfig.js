import axios from "axios";

// Function to get CSRF token from cookies
const getCookie = (name) => {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='))
        ?.split('=')[1];
    return cookieValue;
};

// Axios default settings
axios.defaults.baseURL = "http://127.0.0.1:8000/api"; 
axios.defaults.withCredentials = true; 

// Attach CSRF token to all requests
axios.interceptors.request.use(config => {
    const csrfToken = getCookie("csrftoken");  // Get CSRF from cookie
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// // Axios response interceptor
// axios.interceptors.response.use(
//     response => {
//         // Modify response before it's passed to the consuming component
//         console.log("Response data:", response.data);  // Log the response
//         return response;  // Return the response as is if no modification is needed
//     },
//     error => {
//         // Handle errors globally
//         if (error.response) {
//             // The server responded with an error status code
//             console.error("Error status:", error.response.status);
//             console.error("Error data:", error.response.data);
            
//             // Example: If 401 Unauthorized, you might want to log the user out
//             if (error.response.status === 401) {
//                 // Redirect to login page or log out
//                 window.location.href = "/login";
//             }
//         } else if (error.request) {
//             // The request was made, but no response was received
//             console.error("No response received:", error.request);
//         } else {
//             // Something else happened while setting up the request
//             console.error("Request setup error:", error.message);
//         }
//         return Promise.reject(error);  // Propagate the error further for individual handling if needed
//     }
// );


export default axios;
