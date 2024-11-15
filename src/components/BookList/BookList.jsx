// src/components/BookList/BookList.js
import React, { useState } from 'react';
import './BookList.scss';

const BookList = ({ books, deleteBook, startEditing }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Tính toán chỉ số của sách bắt đầu và kết thúc trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

  // Chuyển trang
  const handleNextPage = () => {
    if (currentPage < Math.ceil(books.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="book-list">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên Sách</th>
            <th>Ảnh</th>
            <th>Thể Loại</th>
            <th>Giá</th>
            <th>Lượt Đánh Giá</th>
            <th>Tình Trạng</th>
            <th>Số Lượng Có Sẵn</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td className="book-title">{book.title}</td>
              <td><img src={book.imgSrc} alt="" /></td>
              <td>{book.genre}</td>
              <td>${book.price}</td>
              <td>{book.starRating}⭐️</td>
              <td>{book.instock}</td>
              <td>{book.numberAvailable}</td>
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
          Trang trước
        </button>
        <span>Trang {currentPage} / {Math.ceil(books.length / itemsPerPage)}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(books.length / itemsPerPage)}>
          Trang tiếp
        </button>
      </div>
    </div>
  );
};

export default BookList;
