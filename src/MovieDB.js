
import axios from 'axios';

export default class MovieDB {
    static postMovie(formData) {
        if (formData) {
            return axios.post('http://127.0.0.1:3001/database', formData).then(
                res => res.data
            ).catch(
                err => err
            );
        }
    }

    static editMovie(formData, id) {
        if (formData) {
            return axios.put(`http://127.0.0.1:3001/database/${id}`, formData).then(
                res => res.data
            ).catch(
                err => err
            );
        }
    }

    static deleteMovie(id) {
        return axios.delete(`http://127.0.0.1:3001/database/${id}`).then(
            res => res.data
        ).catch(
            err => err
        );
    }

    static getMovies(){
        return axios.get(`http://127.0.0.1:3001/database`).then(
            res => res.data
        ).catch(
            err => err
        );
    }

    static getMovieById(id) {
        return axios.get(`http://127.0.0.1:3001/database/${id}`).then(
            res => res.data
        ).catch(
            err => err
        );
    }
}