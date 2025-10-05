// src/components/BookCard.jsx
import React, { Component } from 'react';

class BookCard extends Component {
  render() {
    const { title, author, year } = this.props;
    return (
      <div className="book-card">
        <h3>{title}</h3>
        <p><strong>Autor:</strong> {author}</p>
        <p><strong>Año:</strong> {year}</p>
      </div>
    );
  }
}

export default BookCard;
