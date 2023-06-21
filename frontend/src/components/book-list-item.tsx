import React from 'react';
import { Book } from '../models/book';
import '../css/book-list-item.css';
import heart from '../assets/heart.svg';
import outlinedHeart from '../assets/outlined-heart.svg';
import avatar from '../assets/avatar.svg';

interface BookListItemProps {
  book: Book;
  onAddToWishlist: (book: Book) => void;
}

const BookListItem: React.FC<BookListItemProps> = ({
  book,
  onAddToWishlist,
}) => {
  const handleAddToWishlist = () => {
    book.wishlist = !book.wishlist;
    onAddToWishlist(book);
  };

  return (
    <div className="book-list-item">
      <div className="book-image-container">
        <img
          src={book.image || avatar}
          alt={book.title}
          className="book-image"
        />
      </div>
      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-authors">{book.authors?.join(', ')}</p>
        <button
          onClick={handleAddToWishlist}
          className="add-to-wishlist-button"
        >
          <img
            alt="add to wishlist"
            src={book.wishlist ? heart : outlinedHeart}
          />
        </button>
      </div>
    </div>
  );
};

export default BookListItem;
