import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL 

axios.defaults.baseURL = BASE_URL

export default axios