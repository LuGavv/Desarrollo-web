import React, { Component } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
      <h1></h1>
      <BookList />
    </div>
    );
  }
}

export default App;

