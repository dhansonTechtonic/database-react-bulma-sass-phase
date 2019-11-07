import React, { Component } from 'react'
import MovieCard from './MovieCard';

export default class MovieCarousel extends Component {

    renderMovies = () => {
        let arr = [];
        const stateMovies = this.props.movies;
        stateMovies.sort(function (a, b) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
        })
        for (let i = 0; i < stateMovies.length; i++) {
            const image = new Image();
            image.src = stateMovies[i].cover.replace("C:\\fakepath\\", "");
            const id = stateMovies[i]._id;
            const classname = `item-${i + 1}`;
            const div = (<MovieCard src={image.src} item={classname} alt={stateMovies[i].title} id={id} key={id} rating={stateMovies[i].rating} director={stateMovies[i].director} date={stateMovies[i].date} haveit={stateMovies[i].haveit} plot={stateMovies[i].plot}/>)
            arr.push(div);
        }
        if (arr.length === 0){
            let message = (<p className="subtitle" key="1">There are no movies. Add one now!</p>);
            arr.push(message);
        }
        return arr;
    }

    render() {
        return (
            <section className="section" style={{marginTop: '3em'}}>
                <div className="container">
				    <div className="slider" style={{display: 'flex', overflowX: 'auto', WebkitOverflowScrolling: 'touch'}}>
                     {this.renderMovies()}
                    </div>
			    </div>
            </section>
        )
    }
}
