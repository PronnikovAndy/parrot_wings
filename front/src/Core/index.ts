import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'http://localhost:5000',
});

Axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("access_token");
        console.log("token", token);
        config.headers = {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            //check this if causes problems
            "Content-Type": "application/json",
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);