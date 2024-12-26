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

  const getImageUrl = (imgSrc) => {
    if (!imgSrc) return ''; // Nếu imgSrc là null hoặc undefined, trả về chuỗi rỗng
    // Kiểm tra nếu đường dẫn ảnh là URL đầy đủ
    if (imgSrc.startsWith('http') || imgSrc.startsWith('https')) {
      return imgSrc; // Đã có URL đầy đủ
    }
    // Nếu không, thêm URL cơ sở vào
    return `https://localhost:7262${imgSrc}`;
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
              <td>
                {/* Hiển thị ảnh sách */}
                <img src={getImageUrl(book.imgSrc)} alt={book.title} />
              </td>
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
