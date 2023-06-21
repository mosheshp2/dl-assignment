import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import NavBar from './components/navbar';
import { fetchBooks } from './services/book-service';
import { Book } from './models/book';
import Pagination from './components/pagination';
import BookListItem from './components/book-list-item';
import {
  addToWishlist,
  getWishlistFromStorage,
  removeFromWishlist,
} from './services/wishlist-service';
import spinner from './assets/spinner.svg';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('e books');
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [fetchedBooks, setFetchedBooks] = useState<Book[]>([]);
  const [wishListItems, setWishListItems] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [booksPerPage] = useState<number>(20);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleSearch = debounce(
      async function (query: string, page: number) {
        try {
          setLoading(true);
          const { books, total } = await fetchBooks(query, page);

          setFetchedBooks(books);
          setTotalBooks(total);
        } catch (error: any) {
          console.error('Error fetching books:', error);
        }
        setLoading(false);
      },
      500,
      { leading: false, trailing: true },
    );
    handleSearch(searchTerm, currentPage);

    return () => handleSearch.cancel();
  }, [searchTerm, currentPage]);

  useEffect(() => {
    if (wishlistOnly) {
      setWishListItems(getWishlistFromStorage());
    }
  }, [wishlistOnly]);

  const handleAddToWishlist = (book: Book) => {
    const updatedBooks = fetchedBooks.map((_book) =>
      _book.id === book.id ? book : _book,
    );
    book.wishlist ? addToWishlist(book) : removeFromWishlist(book);

    setFetchedBooks(updatedBooks);
  };

  return (
    <div>
      <NavBar
        handleSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(0);
        }}
        wishlistOnly={wishlistOnly}
        handleWishlistToggle={() => setWishlistOnly((prevState) => !prevState)}
      />
      <div className="book-list">
        <>
          {(wishlistOnly ? wishListItems : fetchedBooks).map((book) => (
            <BookListItem
              key={book.id}
              book={book}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
          {loading ? (
            <div className="spinner">
              <img src={spinner} alt="Loading..." />
            </div>
          ) : null}
        </>
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
