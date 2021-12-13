import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://tinderbackend-parvg555.herokuapp.com/'
});

export default instance;

