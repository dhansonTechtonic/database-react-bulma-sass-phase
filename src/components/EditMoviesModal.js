import React, { Component } from 'react'
import generic from '../assets/generic.jpg'
import {socket} from './SearchBar';

export default class EditMoviesModal extends Component {

    constructor() {
        super();
        this.state = {
            error: '',
        }
    }

    _handleImageUpload = () => {
        const preview = document.querySelector('#edit-movie-cover');
        const file = document.querySelector('.edit-file').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            preview.src = reader.result;
        }, false);

        if (file) {
            return reader.readAsDataURL(file);
        }
    }

    closeModal = () => {
        const form = document.querySelector('.edit-form');
        form.reset();
        document.getElementById('edit-movie-cover').setAttribute('src', generic);
        const modal = document.querySelector('.edit-modal');
        modal.setAttribute('class', 'modal edit-modal');
    }

    collectFormData = async () => {
        const form = document.querySelector('.edit-form');
        let formData = {};
        for (let i = 0; i < form.length; i++) {
            if (form[i].value === '') {
                var invalidInput = document.querySelector(`input[name="edit-${form[i].name}"]`);
                var invalidTextArea = document.querySelector(`textarea[name="edit-${form[i].name}"]`);
                var invalidSelect = document.querySelector(`select[name="edit-${form[i].name}"]`);
            }
            formData[form[i].name.replace('edit-', '')] = form[i].value
        }
        formData['cover'] = document.querySelector('#edit-movie-cover').getAttribute('src');
        if (invalidInput || invalidSelect || invalidTextArea) {
            this.setState({
                error: 'Please fill out all fields before submitting'
            })
        } else {
            socket.emit("editMovie", formData, this.props.id);
            this.closeModal();
        }
    }

    render() {
        return (
            <div id="modal-root">
                <div className="modal edit-modal">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Edit a movie</p>
                            <button className="delete" aria-label="close" onClick={this.closeModal}></button>
                        </header>
                        <section className="modal-card-body">
                            <form className="edit-form">
                                <div className="field">
                                    <div className="control">
                                        <label className="label is-family-primary">Title</label>
                                        <input className="input is-family-sans-serif" type="text" placeholder="Title" name="edit-title" required></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <label className="label is-family-primary">Director</label>
                                        <input className="input is-family-sans-serif" type="text" placeholder="Director" name="edit-director" required></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <label className="label is-family-primary">Plot</label>
                                        <textarea className="textarea is-family-sans-serif" type="text" placeholder="Plot" name="edit-plot" required></textarea>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <label className="label is-family-primary">Rating</label>
                                        <div className="select">
                                            <select name="edit-rating" required>
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <label className="label is-family-primary">Date</label>
                                        <input className="input is-family-sans-serif" type="date" name="edit-date" required></input>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <label className="label">Do you have this movie already?</label>
                                        <label className="radio is-family-sans-serif">
                                            <input type="radio" name="edit-haveit" value="yes" required />
                                            Yes
  </label>
                                        <label className="radio is-family-sans-serif">
                                            <input type="radio" name="edit-haveit" value="no" required />
                                            No
  </label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <label className="label">Cover</label>
                                        <div className="file">
                                            <label className="file-label">
                                                <input className="file-input edit-file" type="file" accept="image/*" name="edit-cover" onChange={this._handleImageUpload} required />
                                                <span className="file-cta">
                                                    <span className="file-icon">
                                                        <i className="fas fa-upload"></i>
                                                    </span>
                                                    <span className="file-label is-family-sans-serif">
                                                        Choose a file…
      </span>
                                                </span>
                                            </label>
                                            <img id="edit-movie-cover" alt="movie cover" src={generic} width="150"
                                                height="200" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success is-family-sans-serif" onClick={this.collectFormData}>Save Movie</button>
                            <button className="button is-family-sans-serif" onClick={this.closeModal}>Cancel</button>
                            <span className="subtitle" style={{ color: 'red' }}>{this.state.error}</span>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}
