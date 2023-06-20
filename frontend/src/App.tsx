import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import './App.css';
import NavBar from './components/navbar';
import { fetchBooks } from './services/book-service';
import { Book } from './models/book';
import Pagination from './components/pagination';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('books');
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [fetchedBooks, setFetchedBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [booksPerPage] = useState<number>(20);
  const [totalBooks, setTotalBooks] = useState<number>(0);

  useEffect(() => {
    const handleSearch = debounce(
      async function (query: string, page: number) {
        try {
          console.debug('requesting: ', query, page);
          const { books, total } = await fetchBooks(query, page);
          setFetchedBooks(books);
          setTotalBooks(total);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      },
      500,
      { leading: false, trailing: true },
    );
    handleSearch(searchTerm, currentPage);

    return () => handleSearch.cancel();
  }, [searchTerm, currentPage]);

  const handleWishlistToggle = () => {
    setWishlistOnly((prevState) => !prevState);
  };

  return (
    <div>
      <NavBar
        handleSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(0);
        }}
        wishlistOnly={wishlistOnly}
        handleWishlistToggle={handleWishlistToggle}
      />
      <div className="bookList">
        {fetchedBooks.map((book) => (
          <div key={book.id}>
            <span>{book.title}</span>
            {book.wishlist && <span> (Wishlist)</span>}
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalBooks={totalBooks}
        booksPerPage={booksPerPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};

export default App;
