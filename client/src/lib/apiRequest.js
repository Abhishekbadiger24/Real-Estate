import axios from "axios";


const apiRequest = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true
})
console.log(apiRequest.defaults.baseURL)
export default apiRequest