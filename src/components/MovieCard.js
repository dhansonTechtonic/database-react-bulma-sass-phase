import React, { Component } from 'react'
import EditMoviesModal from './EditMoviesModal';
import DB from '../MovieDB';

export default class MovieCard extends Component {
    constructor() {
        super();
        this.state = {
            modal: 'modal'
        }
    }

    openEditModal = async () => {
        const modal = document.querySelector('.edit-modal');
        modal.classList.add('is-active');
        const form = document.querySelector('.edit-form');
        const movie = await DB.getMovieById(this.props.id);
        for (let i = 0; i < form.length -1; i++) {
            console.log(form[i])
            form[i].value = movie[form[i].name.replace('edit-', '')];
        }
        var radios = [form[6], form[7]];
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].value === movie.haveit) {
                radios[i].checked = true;
            }
        }
        document.querySelector('#edit-movie-cover').setAttribute('src', movie.cover);
    }

    deleteMovie =()=> {
        DB.deleteMovie(this.props.id);
    }


    handleClick = async () => {
        this.setState({
            modal: 'modal is-active'
        })
    }

    closeModal = async () => {
        this.setState({
            modal: 'modal'
        })
    }

    render() {
        return (
            <>
                <div className={this.props.item} style={{ width: '250px', margin: '1em', flexShrink: '0' }} >
                    <div className="card">
                        <div className="card-image" onClick={this.handleClick}>
                            <figure className="image is-3by4">
                                <img src={this.props.src} alt={this.props.alt} />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <h3>{this.props.alt}</h3>
                                </div>
                            </div>
                        </div>
                        <footer className="card-footer">
                            <button className="card-footer-item button is-primary is-inverted is-family-sans-serif" onClick={this.openEditModal}>Edit</button>
                            <button className="card-footer-item button is-danger is-inverted is-family-sans-serif" onClick={this.deleteMovie}>Delete</button>
                        </footer>
                    </div>
                </div>
                <div className={this.state.modal}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">View Movie</p>
                            <button className="delete" aria-label="close" onClick={this.closeModal}></button>
                        </header>
                        <section className="modal-card-body" style={{display: 'flex'}}>
                            <img src={this.props.src} alt={this.props.alt} style={{flexShrink: '0', marginRight: '1em'}}/>
                            <section>
                                <p className="modal-card-title">{this.props.alt}</p>
                                <p className="subtitle">{this.props.director}</p> 
                                <ul className="is-family-secondary">
                                    <li>
                                        Release Date: {this.props.date}
                                    </li>
                                    <li>
                                        Rating: {this.props.rating}/10
                                    </li>
                                    <li>
                                        Do I have it?: {this.props.haveit}
                                    </li>
                                </ul>
                            </section>    
                            <section>
                                <p className="is-family-sans-serif" style={{marginLeft: '1em', borderLeft: 'solid 1px black', paddingLeft: '1em'}}>
                                    {this.props.plot}
                                </p>
                            </section>                       
                        </section>
                    </div>
                </div>
                <EditMoviesModal id={this.props.id}/>
            </>
        )
    }
}
