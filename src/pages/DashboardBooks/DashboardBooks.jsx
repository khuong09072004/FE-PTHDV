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
    fetch('https://localhost:7262/api/Book/GetAllBooks')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const addBook = (newBook, uploadFile) => {
    const formData = new FormData();
    
    // Thêm các thông tin của sách vào FormData
    Object.keys(newBook).forEach((key) => {
      formData.append(key, newBook[key]);
    });
  
    // Thêm file upload vào FormData
    if (uploadFile) {
      formData.append('file', uploadFile);
    }
  
    fetch('https://localhost:7262/api/Book/InsertBook', {
      method: 'POST',
      body: formData, // Gửi FormData thay vì JSON
    })
      .then((res) => {
        console.log('Response status:', res.status); // Kiểm tra mã trạng thái
        if (!res.ok) {
          return res.json().then((errorData) => {
            // Log lỗi chi tiết từ API
            console.error('Error details:', errorData);
            throw new Error(errorData.message || 'Error adding book');
          });
        }
        return res.json();
      })
      .then((addedBook) => {
        console.log('Added book:', addedBook);
        setBooks((prevBooks) => [...prevBooks, addedBook]); // Cập nhật danh sách sách
        toast.success('Thêm sách thành công!'); // Thông báo thành công
      })
      .catch((error) => {
        console.error('Error adding book:', error);
        toast.error(`Đã xảy ra lỗi khi thêm sách: ${error.message}`); // Thông báo lỗi với chi tiết
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
    const formData = new FormData();
    formData.append('upc', updatedBook.upc);
    formData.append('title', updatedBook.title);
    formData.append('author', updatedBook.author);
    formData.append('genre', updatedBook.genre);
    formData.append('price', updatedBook.price);
    formData.append('starRating', updatedBook.starRating);
    formData.append('status', updatedBook.status);
    formData.append('description', updatedBook.description);
  
    // Nếu có ảnh mới được chọn, thêm vào FormData
    if (updatedBook.file) {
      formData.append('file', updatedBook.file); // Đính kèm file ảnh vào FormData
    }
  
    fetch(`https://localhost:7262/api/Book/UpdateBook/${updatedBook.id}`, {
      method: 'PUT',
      body: formData, // Gửi FormData chứa tất cả thông tin, bao gồm file ảnh
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((message) => {
            throw new Error(message || 'Error updating book');
          });
        }
        const contentType = res.headers.get('Content-Type');
        return contentType && contentType.includes('application/json') ? res.json() : res.text();
      })
      .then((editedBook) => {
        if (typeof editedBook === 'string') {
          // Nếu API trả về một thông báo dạng text
          console.log('Message from API:', editedBook);
          toast.success(editedBook || 'Cập nhật sách thành công!');
        } else {
          // Nếu API trả về đối tượng sách đã cập nhật
          setBooks((prevBooks) =>
            prevBooks.map((book) => (book.id === editedBook.id ? editedBook : book))
          );
          toast.success('Cập nhật sách thành công!');
        }
        setEditingBook(null); // Đóng form chỉnh sửa
      })
      .catch((error) => {
        console.error('Error editing book:', error);
        toast.error(error.message || 'Đã xảy ra lỗi khi cập nhật sách.');
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
