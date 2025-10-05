// src/components/BookList.jsx
import React, { Component } from 'react';
import BookCard from './BookCard';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true,
      error: null,
      searchQuery: '',
      selectedBook: null,
      favorites: [],
      toastMessage: '',      // ✅ Mensaje para el toast
      showToast: false       // ✅ Controla la visibilidad del toast
    };
  }

  componentDidMount() {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    this.setState({ favorites: savedFavorites });

    fetch('https://openlibrary.org/search.json?q=book&limit=20')
      .then(res => res.json())
      .then(data => {
        const booksData = data.docs.slice(0, 20).map((book, index) => ({
          id: index,
          title: book.title,
          author: book.author_name ? book.author_name[0] : 'Autor desconocido',
          year: book.first_publish_year || 'N/A',
          subject: book.subject ? book.subject.slice(0, 3).join(', ') : 'Sin temática'
        }));
        this.setState({ books: booksData, loading: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: 'Error al cargar libros', loading: false });
      });
  }

  saveFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  showToastMessage = (message) => {
    this.setState({ toastMessage: message, showToast: true });
    setTimeout(() => this.setState({ showToast: false }), 2500); // desaparece en 2.5s
  };

  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearch = () => {
    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') return;

    this.setState({ loading: true, error: null });

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=20`)
      .then(res => res.json())
      .then(data => {
        const booksData = data.docs.slice(0, 20).map((book, index) => ({
          id: `search-${index}`,
          title: book.title,
          author: book.author_name ? book.author_name[0] : 'Autor desconocido',
          year: book.first_publish_year || 'N/A',
          subject: book.subject ? book.subject.slice(0, 3).join(', ') : 'Sin temática'
        }));
        this.setState({ books: booksData, loading: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: 'Error al cargar libros', loading: false });
      });
  };

  openModal = (book) => this.setState({ selectedBook: book });
  closeModal = () => this.setState({ selectedBook: null });

  // ❤️ Agregar o eliminar favoritos con confirmación
  toggleFavorite = (book) => {
    this.setState(prev => {
      const isFavorite = prev.favorites.some(fav => fav.id === book.id);
      let updatedFavorites;

      if (isFavorite) {
        const confirmDelete = window.confirm(`¿Seguro que deseas eliminar "${book.title}" de favoritos?`);
        if (!confirmDelete) return prev; // Cancelar la eliminación
        updatedFavorites = prev.favorites.filter(fav => fav.id !== book.id);
        this.showToastMessage(`❌ "${book.title}" eliminado de favoritos`);
      } else {
        updatedFavorites = [...prev.favorites, book];
        this.showToastMessage(`❤️ "${book.title}" agregado a favoritos`);
      }

      this.saveFavorites(updatedFavorites);
      return { favorites: updatedFavorites };
    });
  };

  render() {
    const { books, loading, error, searchQuery, selectedBook, favorites, toastMessage, showToast } = this.state;

    return (
      <div className="booklist-container">
        <h1>📚 Biblioteca Online</h1>

        {/* 🔎 Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Escribe el título de un libro..."
            value={searchQuery}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSearch}>Buscar</button>
        </div>

        {loading && <p>Cargando libros...</p>}
        {error && <p>{error}</p>}

        {/* 📖 Lista de libros */}
        <div className="book-list">
          {books.map(book => (
            <div
              key={book.id}
              className="book-card"
              onClick={() => this.openModal(book)}
            >
              <BookCard
                title={book.title}
                author={book.author}
                year={book.year}
              />
            </div>
          ))}
        </div>

        {/* ❤️ Sección de favoritos */}
        {favorites.length > 0 && (
          <div className="favorites-section">
            <h2>❤️ Mis Favoritos</h2>
            <div className="book-list">
              {favorites.map(fav => (
                <div key={fav.id} className="book-card">
                  <BookCard
                    title={fav.title}
                    author={fav.author}
                    year={fav.year}
                  />
                  <button
                    className="remove-fav"
                    onClick={() => this.toggleFavorite(fav)}
                  >
                    ❌ Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔎 Modal */}
        {selectedBook && (
          <div className="modal-overlay" onClick={this.closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={this.closeModal}>✖</button>
              <h2>{selectedBook.title}</h2>
              <p><strong>Autor:</strong> {selectedBook.author}</p>
              <p><strong>Año:</strong> {selectedBook.year}</p>
              <p><strong>Temática:</strong> {selectedBook.subject}</p>
              <button onClick={() => this.toggleFavorite(selectedBook)}>
                {favorites.some(fav => fav.id === selectedBook.id)
                  ? '✅ Ya en Favoritos'
                  : '❤️ Agregar a Favoritos'}
              </button>
            </div>
          </div>
        )}

        {/* 🍞 Toast Notification */}
        {showToast && (
          <div className="toast-notification">
            {toastMessage}
          </div>
        )}
      </div>
    );
  }
}

export default BookList;
