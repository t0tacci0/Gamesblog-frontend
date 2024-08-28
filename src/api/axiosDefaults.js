import axios from "axios";

axios.defaults.baseURL = "https://gamesblog-f53e2013614c.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;