// Calling the API

import axios from "axios";

// React runs on port 3000
// Every call using AXIOS will run on port 3001 - Used for the API.
const Api = axios.create({baseURL: "http://localhost:27017"});



// *** MONGODB ATLAS - HEROKU (ONLINE) ***
// Connecting to MongoDB online

// const Api = axios.create({baseURL: process.env.REACT_APP_BASE_API})


export default Api;