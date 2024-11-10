// src/components/BookList/BookList.js
import React from 'react';
import './BookList.scss';

const BookList = ({ books, deleteBook, startEditing }) => {
  return (
    <div className="book-list">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên Sách</th>
            <th>Ảnh</th>
            <th>Tác Giả</th>
            <th>Giá</th>
            <th>Lượt Đánh Giá</th>
            <th>Thể Loại</th>
            <th>Số Lượng Có Sẵn</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
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
    </div>
  );
};

export default BookList;
