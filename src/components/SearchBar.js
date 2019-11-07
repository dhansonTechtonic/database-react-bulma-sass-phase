import React, { Component } from 'react'
import DB from '../MovieDB';
import MovieCarousel from './MovieCarousel';
import socketIOClient from 'socket.io-client';

var socket;

class SearchBar extends Component {
    constructor () {
        super();
        this.state={
            movies: [],
            endpoint: 'http://localhost:8000/'
        }
        socket = socketIOClient(this.state.endpoint);
    }

    getMovies = movies => {
        console.log(movies);
        let tempArr = [this.state.movies];
        tempArr = movies;
        this.setState({
            movies: tempArr
        })
    }


    changeMovies = () => socket.emit("initial_movies");

    componentDidMount () {
        var state_current = this;
        socket.emit("initial_movies");
        socket.on("get_movies", state_current.getMovies);
        socket.on("change_movie", state_current.changeMovies);
    }

    componentWillUnmount() {
        socket.off("get_movies");
        socket.off("change_movie");
    }

     openModal = () => {
         const modal = document.getElementsByClassName('modal')[0];
        modal.classList.add('is-active');
    }

     handleSearch = async () => {
        const search = document.querySelector('#search-input');
         var moviesToDisplay = [];
         var movies = await DB.getMovies();
         if (search.value !== '') {
             for (var i = 0; i < movies.length; i++) {
                 if (movies[i].title.toLowerCase().includes(search.value.toLowerCase())) {
                     moviesToDisplay.push(movies[i]);
                 }
                 let tempArr = [...this.state.movies];
                 tempArr = moviesToDisplay;
                 this.setState({
                     movies: tempArr
                 })
             }
         } else {
             let tempArr = [...this.state.movies];
             tempArr = movies;
             this.setState({
                 movies: tempArr
             })
         }
    }
    render() {

        return (
            <>
            <nav className="navbar is-fixed-top is-dark is-spaced" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <h1 className="title is-1 is-family-primary">DMDB</h1>
                </div>
                <div className="navbar-start">
                    <div className="navbar-item">
                        <div className="field">
                            <p className="control">
                                <input className="input is-primary is-family-sans-serif" type="text" placeholder="Enter a movie title" id="search-input" onChange={this.handleSearch}/>
                            </p>
                        </div>
                    </div>
                    <div className="navbar-item">
                        <button className="button is-primary is-family-sans-serif" onClick={this.handleSearch}>Search</button>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <button className="button is-primary is-family-sans-serif" onClick={this.openModal}>Add a movie</button>
                    </div>
                </div>
            </nav>
            <MovieCarousel movies={this.state.movies}/>
            </>
        )
    }
}

export {SearchBar, socket}
