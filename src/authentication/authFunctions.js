import axios from 'axios'
const BASE_URL = "https://fierce-refuge-99891.herokuapp.com"


// registration user
const registerUser = async (user) => {
    const res = await axios.post(`${BASE_URL}/registration`, user)
    return res.data;

}

// Login user
const loginUser = async (user) => {
    const res = await axios.post(`${BASE_URL}/login`, user)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}


const authFunctions = {
    registerUser,
    loginUser,
}

export default authFunctions
