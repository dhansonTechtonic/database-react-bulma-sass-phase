import React from 'react';
import 'bulma';
import './css/App.css';
import {SearchBar} from './components/SearchBar';
import AddMoviesModal from './components/AddMoviesModal';


function App() {
  return (
    <div className="App">
      <SearchBar />
      <AddMoviesModal />
    </div>
  );
}

export default App;
