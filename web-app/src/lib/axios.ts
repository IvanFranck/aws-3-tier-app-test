import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5500',
    timeout: 30000,

    headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain',
    },
})

export default axiosInstance;