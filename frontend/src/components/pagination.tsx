import React from 'react';
import '../css/pagination.css';

interface PaginationProps {
  currentPage: number;
  totalBooks: number;
  booksPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalBooks,
  booksPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const handleClick = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button
        key="22a"
        onClick={() => handleClick(0)}
        className={0 === currentPage ? 'active' : ''}
      >
        Beginging
      </button>
      <button
        key="11a"
        onClick={() => handleClick(currentPage - 1)}
        className={0 === currentPage ? 'active' : ''}
      >
        Prev
      </button>

      <button key="33a" onClick={() => handleClick(currentPage + 1)}>
        Next
      </button>

      <label>
        page {currentPage + 1} from {Math.ceil(totalBooks / booksPerPage)} pages
      </label>
    </div>
  );
};

export default Pagination;
