import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'http://localhost:5000',
});

Axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("access_token");
        config.headers = {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            //check this if causes problems
            "Content-Type": "application/json",
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


Axios.interceptors.response.use(
    response => {
        return response;
    },
    function(error) {
        if (error.response.status === 401) {
            localStorage.removeItem("access_token");
        }
        return Promise.reject(error.response);
    }
);