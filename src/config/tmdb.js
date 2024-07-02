import axios from 'axios';

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
    },
});

tmdb.interceptors.request.use(
    (config) => {
        if (!config.params) {
            config.params = {};
        }
        config.params.language = 'vi-VN';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const fetcher = (url) => tmdb.get(url).then((res) => res.data);

export default tmdb;
