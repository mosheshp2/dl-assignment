import React from 'react';

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
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Prev
      </button>
      <button
        key="0"
        onClick={() => handleClick(0)}
        className={0 === currentPage ? 'active' : ''}
      >
        Beginging
      </button>

      <button key="0" onClick={() => handleClick(currentPage + 1)}>
        Next
      </button>

      <label>
        page {currentPage + 1} from {Math.ceil(totalBooks / booksPerPage)} pages
      </label>
    </div>
  );
};

export default Pagination;
