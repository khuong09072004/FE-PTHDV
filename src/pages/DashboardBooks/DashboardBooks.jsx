import React, { useState, useEffect } from 'react';
import BookList from '../../components/BookList/BookList';
import AddBookForm from '../../components/AddBookForm/AddBookForm';
import EditBookForm from '../../components/EditBookForm/EditBookForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DashboardBook.scss';

const DashboardBook = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showAddBookForm, setShowAddBookForm] = useState(true); 

  useEffect(() => {
    fetch('https://localhost:7262/api/Book/GetBooks')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const addBook = (newBook) => {
    fetch('https://localhost:7262/api/Book/InsertBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error adding book');
        return res.json();
      })
      .then((addedBook) => {
        setBooks([...books, addedBook]);
        toast.success("Thêm sách thành công!"); // Thông báo thành công
      })
      .catch((error) => {
        console.log("Error adding book:", error);
        toast.error("Đã xảy ra lỗi khi thêm sách."); // Thông báo lỗi
      });
  };

  const deleteBook = (id) => {
    fetch(`https://localhost:7262/api/Book/DeleteBook/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
        toast.success("Xóa sách thành công!"); // Thông báo thành công
      })
      .catch((error) => {
        console.log("Error deleting book:", error);
        toast.error("Đã xảy ra lỗi khi xóa sách."); // Thông báo lỗi
      });
  };

  const editBook = (updatedBook) => {
    fetch(`https://localhost:7262/api/Book/UpdateBook/${updatedBook.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    })
    .then((res) => {
      if (!res.ok) throw new Error('Error updating book');
      return res.json();
    })
    .then((editedBook) => {
      setBooks((prevBooks) => 
        prevBooks.map((book) => (book.id === editedBook.id ? editedBook : book))
      );
      setEditingBook(null);
      toast.success("Cập nhật sách thành công!"); 
    })
    .catch((error) => {
      console.error("Error editing book:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật sách."); 
    });
  };

  const startEditing = (book) => {
    setEditingBook(book);
  };

  const closeEditForm = () => {
    setEditingBook(null); 
  };

  return (
    <div className="dashboard">
      <h1>Quản lý sách</h1>
      <AddBookForm addBook={addBook} />
      {editingBook && (
        <EditBookForm 
          editingBook={editingBook} 
          editBook={editBook} 
          closeEditForm={closeEditForm} 
        />
      )}
      <BookList 
        books={books} 
        deleteBook={deleteBook} 
        startEditing={startEditing} 
      />
      <ToastContainer />
    </div>
  );
};

export default DashboardBook;
