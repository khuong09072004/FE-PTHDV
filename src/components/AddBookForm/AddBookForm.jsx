import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import './AddBookForm.scss';

const AddBookForm = ({ addBook }) => {
  const [open, setOpen] = useState(false);
  const [upload, setUpload] = useState(null); 
  const inputRef = useRef();
  const [newBook, setNewBook] = useState({
    upc: '',
    title: '',
    author: '',
    genre: '',
    price: '',
    imgSrc: '',
    starRating: '',
    status: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpload(file); // Lưu file vào state khi chọn ảnh
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo FormData để gửi yêu cầu multipart/form-data
    const formData = new FormData();
    formData.append('upc', newBook.upc);
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('genre', newBook.genre);
    formData.append('price', newBook.price);
    formData.append('starRating', newBook.starRating);
    formData.append('status', newBook.status);
    formData.append('description', newBook.description);

    
    if (upload) {
      formData.append('file', upload); // Đính kèm file ảnh vào FormData
    }

    // Gửi request tới API để thêm sách
    try {
      const response = await fetch('https://localhost:7262/api/Book/InsertBook', {
        method: 'POST',
        body: formData, // Gửi FormData chứa tất cả thông tin, bao gồm file ảnh
      });

      if (response.ok) {
        // Gọi addBook để cập nhật UI
        addBook(await response.json());
        handleClose(); // Đóng dialog sau khi thêm sách thành công
      } else {
        alert('Lỗi khi thêm sách. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      alert('Không thể kết nối với server.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewBook({
      upc: '',
      title: '',
      author: '',
      genre: '',
      price: '',
      imgSrc: '',
      starRating: '',
      status: '',
      description: '',
    });
    setUpload(null); // Đặt lại file upload sau khi đóng form
  };

  return (
    <div>
      <div className="button_addbook">
        <Button variant="outlined" onClick={() => setOpen(true)} className="them_sach">
          Thêm sách
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm sách mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="upc"
            label="UPC"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={newBook.upc}
          />
          <TextField
            margin="dense"
            name="title"
            label="Tiêu đề"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={newBook.title}
          />
          <TextField
            margin="dense"
            name="author"
            label="Tên Tác Giả"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={newBook.author}
          />
          <TextField
            margin="dense"
            name="genre"
            label="Thể loại"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={newBook.genre}
          />
          <TextField
            margin="dense"
            name="price"
            label="Giá"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={newBook.price}
          />
          <div className="new-input-upload">
          <label className="custom-file-upload">
            <span className="icon-upload">📤</span>
            Chọn hình ảnh
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Cập nhật state khi chọn file
              ref={inputRef}
            />
          </label>
          {upload && <div className="file-name">Tệp đã chọn: {upload.name}</div>}
        </div>

          <TextField
            margin="dense"
            name="status"
            label="Tình Trạng"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={newBook.status}
          />
          <TextField
            margin="dense"
            name="starRating"
            label="Đánh Giá"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={newBook.starRating}
          />

          <TextField
            margin="dense"
            name="description"
            label="Mô tả"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            onChange={handleChange}
            value={newBook.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddBookForm.propTypes = {
  addBook: PropTypes.func.isRequired,
};

export default AddBookForm;
