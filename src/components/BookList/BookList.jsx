
import React, { useState } from 'react';
import './BookList.scss';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const BookList = ({ books, deleteBook, startEditing }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(Math.ceil(books.length / itemsPerPage));
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(books.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="book-list">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên Sách</th>
            <th>Tác Giả</th>
            <th>Thể Loại</th>
            <th>Giá</th>
            <th>Tình Trạng</th>
            <th>Lượt xem</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td className="book-title" onClick={() => handleCardClick(book.id)}>{book.title}</td>
              <td><img src={book.imgSrc} alt="" /></td>
              <td>{book.genre}</td>
              <td>${book.price}</td>
              <td>{book.status}</td>
              <td>{book.viewCount}</td>
              <td>
                <div className="button-group">
                  <button onClick={() => startEditing(book)}>Edit</button>
                  <button onClick={() => deleteBook(book.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <FaArrowLeft /> {/* Icon mũi tên trái */}
        </button>
        <span>Trang {currentPage} / {Math.ceil(books.length / itemsPerPage)}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(books.length / itemsPerPage)}
        >
          <FaArrowRight /> {/* Icon mũi tên phải */}
        </button>
      </div>
    </div>
  );
};

export default BookList;
