import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import './AddBookForm.scss'

const AddBookForm = ({ addBook }) => {
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    upc: '',
    title: '',
    genre: '',
    price: '',
    imgSrc: '',
    starRating: '',
    instock: '',
    numberAvailable: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(newBook);
    handleClose(); // Đóng dialog sau khi thêm sách
  };

  const handleClose = () => {
    setOpen(false);
    setNewBook({
      upc: '',
      title: '',
      genre: '',
      price: '',
      imgSrc: '',
      starRating: '',
      instock: '',
      numberAvailable: '',
      description: '',
    });
  };

  return (
    <div>
      <div className="button_addbook">
        <Button variant="outlined" onClick={() => setOpen(true)} className='them_sach'>
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
          <TextField
            margin="dense"
            name="imgSrc"
            label="URL hình ảnh"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={newBook.imgSrc}
          />
          
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
